/**
 * script.js — the single entry point loaded by every page.
 *
 * Each page declares its identity with <body data-page="…"> and this file
 * loads the matching module from js/pages/. Shared behaviours (mobile
 * navigation, search modal, header auth area) are initialised first.
 */

import { initChrome, renderAuthActions, showToast } from './js/ui.js';
import { initAuth, onAuthChange, authMode, getClient } from './js/supabase-client.js';
import { configureProgress } from './js/progress.js';

/** Map of page name -> module that exports init(). */
const pageModules = {
  home: () => import('./js/pages/home.js'),
  courses: () => import('./js/pages/courses.js'),
  course: () => import('./js/pages/course.js'),
  lesson: () => import('./js/pages/lesson.js'),
  exercise: () => import('./js/pages/exercise.js'),
  exercises: () => import('./js/pages/exercises.js'),
  search: () => import('./js/pages/search.js'),
  login: () => import('./js/pages/auth.js'),
  register: () => import('./js/pages/auth.js'),
  'reset-password': () => import('./js/pages/auth.js'),
  'update-password': () => import('./js/pages/auth.js'),
  dashboard: () => import('./js/pages/dashboard.js'),
};

async function bootstrap() {
  initChrome();

  const pageName = document.body.dataset.page || '';
  const loadModule = pageModules[pageName];

  // Start authentication quietly; pages that need the user await initAuth().
  const authReady = initAuth();
  authReady
    .then((user) => {
      // Give the progress service the live client so it can sync when signed in.
      configureProgress(getClient());
      updateHeaderAuth(user);
    })
    .catch((error) => console.warn('[CodeLearn] auth init failed:', error));

  onAuthChange((user) => updateHeaderAuth(user));

  if (!loadModule) return;

  try {
    const module = await loadModule();
    await module.init();
  } catch (error) {
    console.error(`[CodeLearn] Failed to load the "${pageName}" page:`, error);
    showPageError();
  }
}

function updateHeaderAuth(user) {
  const container = document.querySelector('[data-auth-actions]');
  renderAuthActions(container, user, authMode());
}

function showPageError() {
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'empty-state';
  box.style.margin = '3rem auto';
  box.style.maxWidth = '560px';
  box.innerHTML =
    '<h2>Something went wrong</h2>' +
    '<p>This page could not be loaded. Try refreshing, or go back ' +
    '<a href="index.html">to the homepage</a>.</p>';
  main.append(box);
  showToast('This page could not be loaded.', 'error');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
