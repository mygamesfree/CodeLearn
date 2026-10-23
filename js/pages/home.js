/**
 * pages/home.js — the homepage: hero course cards and live stats.
 */

import { el, must, highlightAll } from '../ui.js';
import { COURSES, PROJECTS, LESSON_COUNT, EXERCISE_COUNT } from '../data.js';
import { completedCount, loadProgress } from '../progress.js';

export async function init() {
  renderCourseCards();
  renderProjectCards();
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

const FEATURED_PROJECT_IDS = [
  'proj-personal-portfolio',
  'proj-landing-page',
  'proj-interactive-quiz',
  'proj-task-tracker',
];

function renderProjectCards() {
  const grid = document.getElementById('home-project-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const projectById = new Map(PROJECTS.map((project) => [project.id, project]));
  const featured = FEATURED_PROJECT_IDS.map((id) => projectById.get(id)).filter(Boolean);

  for (const project of featured) {
    grid.append(
      el('a', {
        className: 'course-card project-card',
        attrs: { href: `project.html?id=${project.id}` },
      }, [
        el('span', { className: 'course-badge badge-js', text: project.levelBadge || 'PRJ' }),
        el('span', { className: 'course-tag', text: project.focus }),
        el('h3', { text: project.title }),
        el('p', { text: project.summary }),
        el('div', { className: 'course-meta' }, [
          el('span', { text: project.level }),
          el('span', { text: project.estimatedTime }),
        ]),
        el('span', { className: 'course-link', text: 'View project →' }),
      ])
    );
  }
}

function renderStats() {
  const lessonStat = document.querySelector('[data-stat-lessons]');
  const exerciseStat = document.querySelector('[data-stat-exercises]');
  const projectStat = document.querySelector('[data-stat-projects]');
  const progressStat = document.querySelector('[data-stat-progress]');

  if (lessonStat) lessonStat.textContent = String(LESSON_COUNT);
  if (exerciseStat) exerciseStat.textContent = String(EXERCISE_COUNT);
  if (projectStat) projectStat.textContent = String(PROJECTS.length);

  if (!progressStat) return;
  const completed = completedCount();
  const progress = loadProgress();
  const attempted = Object.keys(progress.scores).length;
  progressStat.textContent = attempted > 0 ? `${completed}/${LESSON_COUNT}` : '0';
}
