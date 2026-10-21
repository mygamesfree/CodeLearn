/**
 * pages/courses.js — list every course with its progress.
 */

import { el, must } from '../ui.js';
import { COURSES } from '../data.js';
import { courseProgressPercent, courseCompletedCount } from '../progress.js';

export async function init() {
  const grid = must('#courses-grid');
  grid.innerHTML = '';

  for (const course of COURSES) {
    const percent = courseProgressPercent(course.id);
    const done = courseCompletedCount(course.id);

    const card = el('a', {
      className: 'course-card',
      attrs: { href: `course.html?id=${course.id}` },
    }, [
      el('span', { className: `course-badge ${course.badgeClass}`, text: course.badge }),
      el('span', { className: 'course-tag', text: course.tagline }),
      el('h3', { text: course.title }),
      el('p', { text: course.longDescription }),
      el('div', { className: 'course-meta' }, [
        el('span', { text: `${course.lessons.length} lessons` }),
        el('span', { text: course.level }),
      ]),
      el('div', { className: 'progress-bar' }, [
        el('div', { className: 'progress-fill', attrs: { style: `width: ${percent}%` } }),
      ]),
      el('div', { className: 'progress-meta' }, [
        el('span', { text: `${done} of ${course.lessons.length} lessons done` }),
        el('span', { text: `${percent}%` }),
      ]),
      el('span', { className: 'course-link', text: 'View the course →' }),
    ]);

    grid.append(card);
  }
}
