/**
 * pages/projects.js — list all projects.
 */

import { el, must } from '../ui.js';
import { PROJECTS } from '../data.js';

export async function init() {
  const grid = must('#projects-grid');
  grid.innerHTML = '';

  for (const project of PROJECTS) {
    const card = el('a', {
      className: 'course-card project-card',
      attrs: { href: `project.html?id=${project.id}` },
    }, [
      el('span', { className: 'course-badge badge-js', text: project.levelBadge || project.level }),
      el('span', { className: 'course-tag', text: project.difficulty }),
      el('h3', { text: project.title }),
      el('p', { text: project.summary }),
      el('div', { className: 'course-meta' }, [
        el('span', { text: project.focus }),
        el('span', { text: project.estimatedTime }),
      ]),
      el('span', { className: 'course-link', text: 'View project →' }),
    ]);
    grid.append(card);
  }
}
