/**
 * pages/lesson.js — renders one lesson: text, table of contents,
 * a live playground, completion controls and lesson navigation.
 */

import { el, must, getParam, highlightAll, showToast, escapeHtml } from '../ui.js';
import { getLesson } from '../data.js';
import { loadProgress, recordVisit, markLessonComplete, markLessonIncomplete } from '../progress.js';

let course = null;
let lesson = null;

export async function init() {
  const courseId = getParam('course');
  const lessonId = getParam('id');
  const found = getLesson(courseId, lessonId);

  if (!found) {
    renderNotFound(courseId, lessonId);
    return;
  }

  course = found.course;
  lesson = found.lesson;
  document.title = `${lesson.title} · ${course.shortTitle} · CodeLearn`;

  recordVisit(lesson.id);

  renderArticle();
  renderToc();
  renderDemo();
  renderCompletion();
  renderLessonNav();
  highlightAll();
}

/* ---------------- article ---------------- */

function renderArticle() {
  const article = must('#lesson-content');
  article.innerHTML = '';

  article.append(
    el('p', {
      className: 'breadcrumb',
      html: `<a href="courses.html">Courses</a> <span>/</span> <a href="course.html?id=${course.id}">${course.shortTitle}</a> <span>/</span> Lesson ${lesson.order}`,
    }),
    el('h1', { text: lesson.title }),
    el('p', { className: 'muted', text: `${lesson.summary} · ${lesson.minutes} min read` }),
  );

  // Lesson HTML is authored by us inside js/data.js — safe to insert directly.
  const body = el('div', { html: lesson.content });
  article.append(body);
}

function renderToc() {
  const list = must('#lesson-toc');
  list.innerHTML = '';
  const headings = document.querySelectorAll('#lesson-content h2[id]');

  if (headings.length === 0) {
    list.append(el('li', { text: '—' }));
    return;
  }

  for (const heading of headings) {
    list.append(el('li', {}, [el('a', { text: heading.textContent, attrs: { href: `#${heading.id}` } })]));
  }
}

/* ---------------- live playground ---------------- */

function renderDemo() {
  if (!lesson.demo) return;
  const article = document.querySelector('#lesson-content');
  if (!article) return;
  article.append(buildDemo(lesson.demo));
}

function buildDemo(demo) {
  const wrap = el('section', { className: 'demo', attrs: { 'aria-label': demo.title || 'Live example' } });

  const title = el('h3', { text: demo.title || 'Try it yourself' });
  const runButton = el('button', { className: 'btn btn-primary', text: 'Run', attrs: { type: 'button' } });
  const resetButton = el('button', { className: 'btn btn-outline', text: 'Reset', attrs: { type: 'button' } });
  const actions = el('div', { className: 'demo-actions' }, [runButton, resetButton]);

  wrap.append(el('div', { className: 'demo-head' }, [title, actions]));

  const editors = el('div', { className: 'demo-editors' });
  const output = el('div', { className: 'demo-output' });
  wrap.append(el('div', { className: 'demo-body' }, [editors, output]));

  const state = {
    html: demo.html || '',
    css: demo.css || '',
    js: demo.js || '',
  };
  const initial = { ...state };

  const editorsMeta = [];
  if (demo.type === 'html' || demo.type === 'css' || demo.type === 'dom') {
    editorsMeta.push({ key: 'html', label: 'HTML', language: 'html' });
  }
  if (demo.type === 'css') {
    editorsMeta.push({ key: 'css', label: 'CSS', language: 'css' });
  }
  if (demo.type === 'javascript' || demo.type === 'dom') {
    editorsMeta.push({ key: 'js', label: 'JavaScript', language: 'javascript' });
  }

  const textareas = {};
  for (const meta of editorsMeta) {
    const textarea = el('textarea', {
      attrs: {
        'aria-label': `${meta.label} editor`,
        spellcheck: 'false',
        rows: '8',
      },
    });
    textarea.value = state[meta.key];
    enableTabKey(textarea);

    let timer = null;
    textarea.addEventListener('input', () => {
      state[meta.key] = textarea.value;
      clearTimeout(timer);
      timer = setTimeout(run, 400);
    });

    textareas[meta.key] = textarea;
    editors.append(el('div', { className: 'demo-editor-label', text: meta.label }), textarea);
  }

  const consolePanel = el('pre', { className: 'demo-console', attrs: { 'aria-live': 'polite' } });
  let iframe = null;

  if (demo.type === 'html' || demo.type === 'css' || demo.type === 'dom') {
    iframe = el('iframe', {
      attrs: {
        title: 'Live preview',
        sandbox: 'allow-scripts',
      },
    });
    output.append(iframe);
    if (demo.type === 'dom') output.append(consolePanel);
  } else {
    output.append(consolePanel);
  }

  function print(level, text) {
    const line = el('div', { className: `log-${level}`, text });
    consolePanel.append(line);
    consolePanel.scrollTop = consolePanel.scrollHeight;
  }

  function run() {
    consolePanel.innerHTML = '';

    if (demo.type === 'javascript') {
      runJavaScript(state.js, print);
      return;
    }
    if (demo.type === 'dom') {
      runDomPreview(iframe, state.html, state.js, print);
      return;
    }
    runHtmlPreview(iframe, state.html, state.css);
  }

  runButton.addEventListener('click', run);
  resetButton.addEventListener('click', () => {
    Object.assign(state, initial);
    for (const [key, textarea] of Object.entries(textareas)) textarea.value = initial[key];
    run();
    showToast('Demo reset to its original code.');
  });

  run();
  return wrap;
}

/** Build the srcdoc for an HTML/CSS preview and load it into the iframe. */
function runHtmlPreview(iframe, html, css) {
  const styleTag = css ? `<style>${css}</style>` : '';
  iframe.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8">${styleTag}</head><body>${html}</body></html>`;
}

/**
 * Run JavaScript in the page with a captured console.
 * Everything happens inside one function scope, so student code cannot
 * leak into the rest of the site.
 */
function runJavaScript(code, print) {
  const captured = {
    log: (...args) => print('log', args.map(fmt).join(' ')),
    info: (...args) => print('info', args.map(fmt).join(' ')),
    warn: (...args) => print('warn', args.map(fmt).join(' ')),
    error: (...args) => print('error', args.map(fmt).join(' ')),
    debug: (...args) => print('log', args.map(fmt).join(' ')),
  };

  try {
    // eslint-disable-next-line no-new-func
    const run = new Function('console', `"use strict";\n${code}`);
    run(captured);
  } catch (error) {
    print('error', `Error: ${error.message}`);
  }
}

/** Run JavaScript inside a sandboxed iframe so DOM lessons can edit the page. */
function runDomPreview(iframe, html, js, print) {
  const bridge = `
<script>
(function () {
  function fmt(value) {
    try {
      if (typeof value === 'object' && value !== null) return JSON.stringify(value);
      return String(value);
    } catch (err) { return String(value); }
  }
  function send(level, args) {
    parent.postMessage({ codelearnDemo: true, level: level, text: Array.prototype.map.call(args, fmt).join(' ') }, '*');
  }
  console.log = function () { send('log', arguments); };
  console.info = function () { send('info', arguments); };
  console.warn = function () { send('warn', arguments); };
  console.error = function () { send('error', arguments); };
  window.onerror = function (message) { send('error', [message]); };
})();
<\/script>`;

  // Remove any listener from a previous run, then attach a fresh one.
  if (runDomPreview.listener) {
    window.removeEventListener('message', runDomPreview.listener);
  }
  runDomPreview.listener = (event) => {
    const data = event.data;
    if (data && data.codelearnDemo) print(data.level, data.text);
  };
  window.addEventListener('message', runDomPreview.listener);

  const style = '<style>body{font-family:system-ui,sans-serif;margin:0;padding:14px;color:#182033}</style>';
  iframe.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8">${style}${bridge}</head><body>${html}<script>${js}<\/script></body></html>`;
}

function fmt(value) {
  try {
    if (typeof value === 'object' && value !== null) return JSON.stringify(value);
    return String(value);
  } catch {
    return String(value);
  }
}

/** Let Tab insert spaces inside the code editors instead of leaving them. */
function enableTabKey(textarea) {
  textarea.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = textarea.value.slice(0, start) + '  ' + textarea.value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + 2;
  });
}

/* ---------------- completion + navigation ---------------- */

function renderCompletion() {
  const box = must('#lesson-actions');
  const progress = loadProgress();
  const completed = Boolean(progress.completed[lesson.id]);
  const exercise = lesson.exercise;
  const score = progress.scores[exercise.id];

  box.innerHTML = '';

  const exerciseLink = el('a', {
    className: 'btn btn-primary btn-block',
    text: score ? `Open exercise (best ${score.best}%)` : 'Open the exercise',
    attrs: { href: `exercise.html?course=${course.id}&id=${lesson.id}` },
  });

  const completeButton = el('button', {
    className: `btn ${completed ? 'btn-outline' : 'btn-primary'} btn-block`,
    text: completed ? 'Completed ✓ — mark as incomplete' : 'Mark lesson as complete',
    attrs: { type: 'button' },
  });

  completeButton.addEventListener('click', async () => {
    completeButton.disabled = true;
    try {
      if (completed) {
        await markLessonIncomplete(lesson.id, course.id);
        showToast('Lesson marked as incomplete.');
      } else {
        await markLessonComplete(lesson.id, course.id);
        showToast('Lesson completed — nice work!', 'success');
      }
      renderCompletion();
    } catch (error) {
      console.error(error);
      showToast('Could not save your progress. Please try again.', 'error');
      completeButton.disabled = false;
    }
  });

  box.append(exerciseLink, completeButton);

  if (score) {
    box.append(el('p', {
      className: 'muted',
      text: `Exercise attempts: ${score.attempts} · Best score: ${score.best}%`,
      attrs: { style: 'margin-top:0.75rem;font-size:0.85rem' },
    }));
  }
}

function renderLessonNav() {
  const nav = must('#lesson-nav');
  nav.innerHTML = '';

  const index = course.lessons.findIndex((item) => item.id === lesson.id);
  const previous = index > 0 ? course.lessons[index - 1] : null;
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null;

  if (previous) {
    nav.append(el('a', {
      className: 'btn btn-outline',
      text: `← ${previous.title}`,
      attrs: { href: `lesson.html?course=${course.id}&id=${previous.id}` },
    }));
  } else {
    nav.append(el('a', {
      className: 'btn btn-outline',
      text: '← Course overview',
      attrs: { href: `course.html?id=${course.id}` },
    }));
  }

  if (next) {
    nav.append(el('a', {
      className: 'btn btn-primary',
      text: `${next.title} →`,
      attrs: { href: `lesson.html?course=${course.id}&id=${next.id}` },
    }));
  } else {
    nav.append(el('a', {
      className: 'btn btn-primary',
      text: 'Next course →',
      attrs: { href: 'courses.html' },
    }));
  }
}

function renderNotFound(courseId, lessonId) {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(
    el('div', { className: 'container section' }, [
      el('div', { className: 'empty-state' }, [
        el('h2', { text: 'Lesson not found' }),
        el('p', {
          text: lessonId
            ? `There is no lesson “${escapeHtml(lessonId)}” in course “${escapeHtml(courseId || '—')}”.`
            : 'The address is missing a course or lesson id.',
        }),
        el('a', { className: 'btn btn-primary', text: 'Browse courses', attrs: { href: 'courses.html' } }),
      ]),
    ])
  );
  showToast('Lesson not found.', 'error');
}
