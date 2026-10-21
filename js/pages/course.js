/**
 * pages/course.js — one course: hero, progress bar and the lesson list.
 */

import { el, must, getParam, showToast } from '../ui.js';
import { getCourse } from '../data.js';
import { loadProgress, courseProgressPercent, courseCompletedCount, recordVisit } from '../progress.js';

export async function init() {
  const courseId = getParam('id');
  const course = getCourse(courseId);

  if (!course) {
    renderNotFound(courseId);
    return;
  }

  document.title = `${course.title} · CodeLearn`;
  renderHero(course);
  renderLessonList(course);
  renderSummary(course);
}

function renderHero(course) {
  const hero = must('#course-hero');
  hero.className = `course-hero ${course.heroClass}`;
  hero.innerHTML = '';

  hero.append(
    el('p', { className: 'breadcrumb', html: `<a href="courses.html">Courses</a> <span>/</span> ${course.shortTitle}` }),
    el('h1', { text: course.title }),
    el('p', { text: course.longDescription }),
  );
}

function renderSummary(course) {
  const container = must('#course-summary');
  const percent = courseProgressPercent(course.id);
  const done = courseCompletedCount(course.id);

  container.innerHTML = '';
  container.append(
    el('div', { className: 'progress-meta' }, [
      el('span', { text: `Your progress: ${done} of ${course.lessons.length} lessons` }),
      el('span', { text: `${percent}%` }),
    ]),
    el('div', { className: 'progress-bar' }, [
      el('div', { className: 'progress-fill', attrs: { style: `width: ${percent}%` } }),
    ]),
  );
}

function renderLessonList(course) {
  const list = must('#lesson-list');
  const progress = loadProgress();
  list.innerHTML = '';

  for (const lesson of course.lessons) {
    const completed = Boolean(progress.completed[lesson.id]);
    const score = progress.scores[lesson.exercise.id];

    const row = el('a', {
      className: `lesson-row${completed ? ' is-complete' : ''}`,
      attrs: { href: `lesson.html?course=${course.id}&id=${lesson.id}` },
    }, [
      el('span', {
        className: 'lesson-status',
        text: completed ? '✓' : String(lesson.order),
        attrs: { 'aria-hidden': 'true' },
      }),
      el('div', { className: 'lesson-row-body' }, [
        el('h3', { text: lesson.title }),
        el('p', { text: lesson.summary }),
      ]),
      el('div', { className: 'lesson-row-meta' }, [
        el('span', { text: `${lesson.minutes} min` }),
        score ? scorePill(score.best) : null,
      ].filter(Boolean)),
    ]);

    // Remember the last course the user browsed (used by the dashboard).
    row.addEventListener('click', () => recordVisit(lesson.id));
    list.append(row);
  }
}

function scorePill(best) {
  const tone = best >= 90 ? 'good' : best >= 70 ? 'ok' : 'bad';
  return el('span', { className: `score-pill ${tone}`, text: `Best ${best}%` });
}

function renderNotFound(courseId) {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(
    el('div', { className: 'container section' }, [
      el('div', { className: 'empty-state' }, [
        el('h2', { text: 'Course not found' }),
        el('p', {
          text: courseId
            ? `We do not have a course with the id “${courseId}”.`
            : 'No course was specified in the address.',
        }),
        el('a', { className: 'btn btn-primary', text: 'Browse all courses', attrs: { href: 'courses.html' } }),
      ]),
    ])
  );
  showToast('Course not found.', 'error');
}
