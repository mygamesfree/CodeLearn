/**
 * pages/exercises.js — list every exercise with best scores and links.
 */

import { el, must } from '../ui.js';
import { ALL_EXERCISES } from '../data.js';
import { loadProgress } from '../progress.js';

export async function init() {
  const list = must('#exercise-list');
  const progress = loadProgress();
  list.innerHTML = '';

  const byCourse = new Map();
  for (const exercise of ALL_EXERCISES) {
    if (!byCourse.has(exercise.courseId)) byCourse.set(exercise.courseId, []);
    byCourse.get(exercise.courseId).push(exercise);
  }

  for (const [courseId, exercises] of byCourse) {
    const course = exercises[0];
    const section = el('section', { attrs: { 'aria-label': `${course.courseTitle} exercises` } }, [
      el('h2', {}, [
        el('span', { className: `tag ${course.courseTagClass}`, text: course.courseBadge }),
        document.createTextNode(` ${course.courseTitle}`),
      ]),
    ]);

    const rows = el('div', { className: 'lesson-list' });

    for (const exercise of exercises) {
      const score = progress.scores[exercise.id];
      const answered = exercise.questions.length;

      const row = el('a', {
        className: `lesson-row${score && score.best >= 70 ? ' is-complete' : ''}`,
        attrs: { href: `exercise.html?course=${courseId}&id=${exercise.lessonId}` },
      }, [
        el('span', {
          className: 'lesson-status',
          text: score && score.best >= 70 ? '✓' : '→',
          attrs: { 'aria-hidden': 'true' },
        }),
        el('div', { className: 'lesson-row-body' }, [
          el('h3', { text: exercise.title }),
          el('p', { text: `${exercise.lessonTitle} · ${answered} questions` }),
        ]),
        el('div', { className: 'lesson-row-meta' }, [
          score
            ? el('span', { className: `score-pill ${score.best >= 90 ? 'good' : score.best >= 70 ? 'ok' : 'bad'}`, text: `Best ${score.best}%` })
            : el('span', { text: 'Not attempted' }),
        ]),
      ]);
      rows.append(row);
    }

    section.append(rows);
    list.append(section);
  }
}
