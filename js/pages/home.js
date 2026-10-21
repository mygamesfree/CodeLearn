/**
 * pages/home.js — the homepage: hero course cards and live stats.
 */

import { el, must, highlightAll } from '../ui.js';
import { COURSES, LESSON_COUNT, EXERCISE_COUNT } from '../data.js';
import { completedCount, loadProgress } from '../progress.js';

export async function init() {
  renderCourseCards();
  renderStats();
  highlightAll();
}

function renderCourseCards() {
  const grid = must('#home-course-grid');
  grid.innerHTML = '';

  for (const course of COURSES) {
    const card = el('a', {
      className: 'course-card',
      attrs: { href: `course.html?id=${course.id}` },
    }, [
      el('span', { className: `course-badge ${course.badgeClass}`, text: course.badge }),
      el('span', { className: 'course-tag', text: course.tagline }),
      el('h3', { text: course.title }),
      el('p', { text: course.description }),
      el('div', { className: 'course-meta' }, [
        el('span', { text: `${course.lessons.length} lessons` }),
        el('span', { text: course.level }),
      ]),
      el('span', { className: 'course-link', text: 'View the course →' }),
    ]);
    grid.append(card);
  }
}

function renderStats() {
  const lessonStat = document.querySelector('[data-stat-lessons]');
  const exerciseStat = document.querySelector('[data-stat-exercises]');
  const progressStat = document.querySelector('[data-stat-progress]');
  if (!lessonStat || !exerciseStat || !progressStat) return;

  lessonStat.textContent = String(LESSON_COUNT);
  exerciseStat.textContent = String(EXERCISE_COUNT);

  const completed = completedCount();
  const progress = loadProgress();
  const attempted = Object.keys(progress.scores).length;
  progressStat.textContent = attempted > 0 ? `${completed}/${LESSON_COUNT}` : '0';
}
