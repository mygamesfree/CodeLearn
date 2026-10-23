/**
 * pages/dashboard.js — the learner's private progress page.
 * Requires an active session (Supabase or demo mode).
 */

import { el, must, showToast } from '../ui.js';
import { COURSES, ALL_LESSONS, PROJECTS } from '../data.js';
import { initAuth, getCurrentUser, authMode, signOut } from '../supabase-client.js';
import {
  loadProgress,
  completedCount,
  courseProgressPercent,
  courseCompletedCount,
  pullRemoteProgress,
  recordVisit,
} from '../progress.js';

export async function init() {
  const user = await initAuth();

  if (!user) {
    renderSignedOut();
    return;
  }

  // Merge any cloud progress before drawing the page.
  await pullRemoteProgress();
  renderUser(user);
  renderStats();
  renderCourseProgress();
  renderProjects();
  renderContinueLearning();

  const signOutButton = must('#sign-out-button');
  signOutButton.addEventListener('click', async () => {
    signOutButton.disabled = true;
    const result = await signOut();
    if (result.error) {
      showToast(result.error, 'error');
      signOutButton.disabled = false;
      return;
    }
    showToast('Signed out — see you soon!');
    window.location.href = 'index.html';
  });
}

function renderUser(user) {
  const name =
    (user.user_metadata && user.user_metadata.display_name) ||
    (user.email ? user.email.split('@')[0] : 'Learner');

  must('#dashboard-name').textContent = name;
  must('#dashboard-email').textContent = user.email || 'demo account';

  const modeNote = document.querySelector('[data-sync-note]');
  if (modeNote) {
    modeNote.textContent =
      authMode() === 'supabase'
        ? 'Your progress is synced to your CodeLearn account.'
        : 'Demo mode: progress is stored only in this browser.';
  }
}

function renderStats() {
  const progress = loadProgress();
  const completed = completedCount();
  const attempted = Object.values(progress.scores);
  const passed = attempted.filter((entry) => entry.best >= 70).length;
  const average = attempted.length
    ? Math.round(attempted.reduce((sum, entry) => sum + entry.best, 0) / attempted.length)
    : 0;

  const grid = must('#dashboard-stats');
  grid.innerHTML = '';
  for (const [value, label] of [
    [`${completed}/${ALL_LESSONS.length}`, 'Lessons done'],
    [String(passed), 'Exercises passed'],
    [`${average}%`, 'Average score'],
    [String(Object.keys(progress.visits || {}).length), 'Lessons visited'],
  ]) {
    grid.append(el('div', { className: 'stat' }, [
      el('div', { className: 'stat-value', text: value }),
      el('div', { className: 'stat-label', text: label }),
    ]));
  }
}

function renderCourseProgress() {
  const container = must('#dashboard-courses');
  container.innerHTML = '';

  for (const course of COURSES) {
    const percent = courseProgressPercent(course.id);
    const done = courseCompletedCount(course.id);

    container.append(el('div', { className: 'card' }, [
      el('h3', {}, [
        el('span', { className: `tag ${course.tagClass}`, text: course.badge }),
        document.createTextNode(` ${course.title}`),
      ]),
      el('div', { className: 'progress-meta' }, [
        el('span', { text: `${done} of ${course.lessons.length} lessons` }),
        el('span', { text: `${percent}%` }),
      ]),
      el('div', { className: 'progress-bar', attrs: { role: 'progressbar', 'aria-valuenow': String(percent), 'aria-valuemin': '0', 'aria-valuemax': '100' } }, [
        el('div', { className: 'progress-fill', attrs: { style: `width: ${percent}%` } }),
      ]),
      el('a', {
        className: 'btn btn-outline',
        text: percent > 0 ? 'Keep going →' : 'Start course →',
        attrs: { href: `course.html?id=${course.id}`, style: 'margin-top:0.75rem' },
      }),
    ]));
  }
}

function renderProjects() {
  const container = must('#dashboard-projects');
  if (!container) return;
  container.innerHTML = '';

  for (const project of PROJECTS) {
    container.append(el('div', { className: 'card project-card' }, [
      el('h3', { text: project.title }),
      el('p', { className: 'muted', text: project.summary }),
      el('div', { className: 'project-meta' }, [
        el('span', { className: 'project-pill neutral', text: project.level }),
        el('span', { className: 'project-pill neutral', text: project.estimatedTime }),
      ]),
      el('a', {
        className: 'btn btn-outline',
        text: 'Open project →',
        attrs: { href: `project.html?id=${project.id}` },
      }),
    ]));
  }
}

function renderContinueLearning() {
  const box = must('#dashboard-continue');
  const progress = loadProgress();
  box.innerHTML = '';

  const nextLesson =
    ALL_LESSONS.find((lesson) => !progress.completed[lesson.id]) || null;

  if (!nextLesson) {
    box.append(el('div', { className: 'empty-state' }, [
      el('h2', { text: 'All lessons completed!' }),
      el('p', { text: 'You have finished every lesson on CodeLearn. Revisit any course to refresh your skills.' }),
      el('a', { className: 'btn btn-primary', text: 'Browse courses', attrs: { href: 'courses.html' } }),
    ]));
    return;
  }

  box.append(el('div', { className: 'lesson-list' }, [
    el('a', {
      className: 'lesson-row',
      attrs: { href: `lesson.html?course=${nextLesson.courseId}&id=${nextLesson.id}` },
    }, [
      el('span', { className: 'lesson-status', text: '→', attrs: { 'aria-hidden': 'true' } }),
      el('div', { className: 'lesson-row-body' }, [
        el('h3', { text: nextLesson.title }),
        el('p', { text: `${nextLesson.courseTitle} · ${nextLesson.summary}` }),
      ]),
      el('div', { className: 'lesson-row-meta' }, [el('span', { text: `${nextLesson.minutes} min` })]),
    ]),
  ]));

  // Remember this as the last lesson the user looked at.
  recordVisit(nextLesson.id);
}

function renderSignedOut() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(
    el('div', { className: 'auth-page' }, [
      el('div', { className: 'auth-card text-center' }, [
        el('h1', { text: 'Your dashboard' }),
        el('p', { className: 'auth-sub', text: 'Log in to track your lessons, scores and streaks.' }),
        el('div', { className: 'demo-actions', attrs: { style: 'justify-content:center' } }, [
          el('a', { className: 'btn btn-primary', text: 'Log in', attrs: { href: 'login.html?next=/dashboard.html' } }),
          el('a', { className: 'btn btn-outline', text: 'Create account', attrs: { href: 'register.html' } }),
        ]),
      ]),
    ])
  );
}
