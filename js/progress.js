/**
 * progress.js — learning progress tracking.
 *
 * Local storage is the source of truth (works offline, no account needed).
 * When a user is signed in with Supabase, progress is also pushed to the
 * `lesson_progress` table and merged back down on sign-in.
 */

import {
  loadProgress,
  recordVisit,
  completeLesson as localComplete,
  uncompleteLesson as localUncomplete,
  recordExerciseScore,
  getBestScore,
  mergeProgress,
} from './storage.js';
import { COURSES } from './data.js';
import { isSupabaseMode, initAuth, getCurrentUser } from './supabase-client.js';

let supabaseClient = null;

/** Inject the live Supabase client (avoids a circular import). */
export function configureProgress(client) {
  supabaseClient = client;
}

/** Re-export the local progress helpers pages need. */
export { loadProgress, recordVisit, getBestScore };

/** How many lessons the user has completed in total. */
export function completedCount() {
  return Object.keys(loadProgress().completed).length;
}

/** Percentage (0-100) of lessons completed inside one course. */
export function courseProgressPercent(courseId) {
  const course = COURSES.find((item) => item.id === courseId);
  if (!course || course.lessons.length === 0) return 0;
  const progress = loadProgress();
  const done = course.lessons.filter((lesson) => progress.completed[lesson.id]).length;
  return Math.round((done / course.lessons.length) * 100);
}

/** Number of completed lessons inside one course. */
export function courseCompletedCount(courseId) {
  const course = COURSES.find((item) => item.id === courseId);
  if (!course) return 0;
  const progress = loadProgress();
  return course.lessons.filter((lesson) => progress.completed[lesson.id]).length;
}

/** Mark a lesson complete locally and sync to Supabase when possible. */
export async function markLessonComplete(lessonId, courseId) {
  const isNew = localComplete(lessonId);
  recordVisit(lessonId);
  await pushProgress(lessonId, courseId, null);
  return isNew;
}

/** Mark a lesson incomplete again (local + remote). */
export async function markLessonIncomplete(lessonId, courseId) {
  localUncomplete(lessonId);
  await deleteRemoteProgress(lessonId, courseId);
}

/** Save an exercise score locally and sync it. */
export async function saveExerciseScore(exerciseId, courseId, lessonId, score) {
  const updated = recordExerciseScore(exerciseId, score);
  await pushProgress(lessonId, courseId, updated.best);

  // Passing the exercise also completes its lesson.
  if (score >= 70) {
    localComplete(lessonId);
  }
  return updated;
}

/* ---------------- Supabase sync ---------------- */

async function pushProgress(lessonId, courseId, bestScore) {
  if (!isSupabaseMode() || !supabaseClient) return;
  const user = getCurrentUser();
  if (!user) return;

  const progress = loadProgress();
  const completedAt = progress.completed[lessonId] || new Date().toISOString();
  const scoreEntry = progress.scores[lessonIdToExerciseId(lessonId)] || null;

  try {
    await supabaseClient.from('lesson_progress').upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        course_id: courseId,
        completed_at: completedAt,
        exercise_best_score: bestScore != null ? bestScore : (scoreEntry ? scoreEntry.best : null),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    );
  } catch (error) {
    // Offline or table missing — progress still lives safely in localStorage.
    console.warn('[CodeLearn] Could not sync progress:', error.message);
  }
}

async function deleteRemoteProgress(lessonId, courseId) {
  if (!isSupabaseMode() || !supabaseClient) return;
  const user = getCurrentUser();
  if (!user) return;

  try {
    await supabaseClient
      .from('lesson_progress')
      .delete()
      .match({ user_id: user.id, lesson_id: lessonId, course_id: courseId });
  } catch (error) {
    console.warn('[CodeLearn] Could not delete remote progress:', error.message);
  }
}

/**
 * Download remote progress and merge it into the local copy.
 * Called right after a successful sign-in.
 */
export async function pullRemoteProgress() {
  if (!isSupabaseMode() || !supabaseClient) return loadProgress();
  const user = getCurrentUser();
  if (!user) return loadProgress();

  try {
    const { data, error } = await supabaseClient
      .from('lesson_progress')
      .select('lesson_id, completed_at, exercise_best_score')
      .eq('user_id', user.id);

    if (error) throw error;

    const remote = { completed: {}, scores: {} };
    for (const row of data || []) {
      if (row.completed_at) remote.completed[row.lesson_id] = row.completed_at;
      if (row.exercise_best_score != null) {
        remote.scores[lessonToExerciseId(row.lesson_id)] = {
          best: row.exercise_best_score,
          last: row.exercise_best_score,
          attempts: 1,
        };
      }
    }
    return mergeProgress(remote);
  } catch (error) {
    console.warn('[CodeLearn] Could not load remote progress:', error.message);
    return loadProgress();
  }
}

/** Exercise ids follow the pattern ex-<lessonId> for every lesson. */
function lessonToExerciseId(lessonId) {
  return `ex-${lessonId}`;
}

/** Alias kept for readability inside this module. */
const lessonIdToExerciseId = lessonToExerciseId;
