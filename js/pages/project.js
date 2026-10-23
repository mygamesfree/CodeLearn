/**
 * pages/project.js — single project view.
 */

import { el, must, getParam } from '../ui.js';
import { getProject } from '../data.js';

export async function init() {
  const id = getParam('id');
  const project = getProject(id);

  if (!project) {
    renderNotFound(id);
    return;
  }

  document.title = `${project.title} · Projects · CodeLearn`;
  must('#project-breadcrumb').textContent = project.title;
  must('#project-title').textContent = project.title;
  must('#project-summary').textContent = project.summary;

  const meta = must('#project-meta');
  meta.innerHTML = '';
  for (const [label, value] of [
    ['Level', project.level],
    ['Focus', project.focus],
    ['Time', project.estimatedTime],
  ]) {
    meta.append(el('span', { className: 'project-pill', text: `${label}: ${value}` }));
  }

  const overview = must('#project-overview');
  overview.innerHTML = project.overview;

  const req = must('#project-requirements');
  req.innerHTML = '';
  for (const item of project.requirements) {
    req.append(el('li', { text: item }));
  }

  const steps = must('#project-steps');
  steps.innerHTML = '';
  for (const item of project.steps) {
    steps.append(el('li', { html: item }));
  }

  const crit = must('#project-criteria');
  crit.innerHTML = '';
  for (const item of project.completionCriteria) {
    crit.append(el('li', { text: item }));
  }

  const res = must('#project-resources');
  res.innerHTML = project.resources;
}

function renderNotFound(id) {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(
    el('div', { className: 'container section' }, [
      el('div', { className: 'empty-state' }, [
        el('h2', { text: 'Project not found' }),
        el('p', { text: id ? `We do not have a project with the id “${id}”.` : 'No project was specified.' }),
        el('a', { className: 'btn btn-primary', text: 'Browse all projects', attrs: { href: 'projects.html' } }),
      ]),
    ])
  );
}
