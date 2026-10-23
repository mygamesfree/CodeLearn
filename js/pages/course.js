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
    buildProjectCta(course),
  );
}

function buildProjectCta(course) {
  const projectMap = {
    html: 'proj-personal-portfolio',
    css: 'proj-landing-page',
    js: 'proj-interactive-quiz',
  };
  const projectId = projectMap[course.id];
  if (!projectId) return el('span');

  return el('div', { className: 'course-project-cta' }, [
    el('span', { text: 'Apply this path with a guided project.' }),
    el('a', {
      className: 'btn btn-outline',
      text: 'View project →',
      attrs: { href: `project.html?id=${projectId}` },
    }),
  ]);
}

function renderLessonList(course) {
  const list = must('#lesson-list');
  const progress = loadProgress();
  list.innerHTML = '';

  const modules = course.modules?.length
    ? course.modules
    : [{ id: 'all', order: 1, title: 'Lessons', description: '', lessonIds: course.lessons.map((lesson) => lesson.id) }];

  for (const module of modules) {
    const moduleLessons = course.lessons.filter((lesson) => lesson.moduleId === module.id);
    if (!moduleLessons.length) continue;

    const completed = moduleLessons.filter((lesson) => progress.completed[lesson.id]).length;
    const section = el('section', { className: 'course-module' }, [
      el('div', { className: 'course-module-head' }, [
        el('div', {}, [
          el('p', { className: 'course-module-kicker', text: `Module ${module.order}` }),
          el('h2', { text: module.title }),
          module.description ? el('p', { className: 'course-module-description', text: module.description }) : null,
        ]),
        el('span', {
          className: 'course-module-count',
          text: `${completed}/${moduleLessons.length} complete`,
        }),
      ]),
      el('div', { className: 'module-lessons' }, moduleLessons.map((lesson) => lessonRow(course, lesson, progress))),
    ]);

    list.append(section);
  }
}

function lessonRow(course, lesson, progress) {
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
  return row;
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
