/**
 * ui.js — shared UI helpers for CodeLearn.
 * Safe to import everywhere: functions only run when called.
 */

/** Create an HTML element from a tag name and options. */
export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text != null) node.textContent = options.text;
  if (options.html != null) node.innerHTML = options.html;
  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      if (value === false || value == null) continue;
      node.setAttribute(name, value === true ? '' : value);
    }
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.append(child);
  }
  return node;
}

/** Query a single element (throws a clear error when missing). */
export function must(selector, root = document) {
  const node = root.querySelector(selector);
  if (!node) throw new Error(`Expected element not found: ${selector}`);
  return node;
}

/** Show a floating toast message. */
export function showToast(message, kind = 'info', duration = 3500) {
  const region = document.querySelector('.toast-region');
  if (!region) return;
  const toast = el('div', { className: `toast ${kind}`, text: message });
  region.append(toast);
  setTimeout(() => toast.remove(), duration);
}

/** Toggle a button's loading state (disables it and shows a spinner). */
export function setLoading(button, loading, loadingLabel = 'Working…') {
  if (!button) return;
  if (loading) {
    button.dataset.originalHtml = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '';
    button.append(
      el('span', { className: 'spinner', attrs: { 'aria-hidden': 'true' } }),
      document.createTextNode(loadingLabel)
    );
  } else {
    button.disabled = false;
    if (button.dataset.originalHtml != null) {
      button.innerHTML = button.dataset.originalHtml;
      delete button.dataset.originalHtml;
    }
  }
}

/** Simple, dependency-free syntax highlighting for our code samples. */
export function highlightCode(code, language = '') {
  const escaped = escapeHtml(code);
  const lang = language.toLowerCase();
  if (lang === 'html' || lang === 'xml') {
    return escaped
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-comment">$1</span>')
      .replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g, '$1<span class="tok-tag">$2</span>')
      .replace(/([\w-]+)=(&quot;.*?&quot;|"[^"]*")/g, '<span class="tok-attr">$1</span>=$2');
  }
  if (lang === 'css') {
    return escaped
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>')
      .replace(/([.#]?[a-zA-Z][\w-]*)(\s*\{)/g, '<span class="tok-tag">$1</span>$2')
      .replace(/([a-z-]+)(\s*:)/g, '<span class="tok-attr">$1</span>$2')
      .replace(/(:\s*)(#[0-9a-fA-F]{3,8}|\b\d+(?:px|rem|em|%|vh|vw|s)?\b)/g, '$1<span class="tok-number">$2</span>');
  }
  // JavaScript (default)
  return escaped
    .replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>')
    .replace(/(&#39;[^&#39;\n]*?&#39;|&quot;[^&quot;\n]*?&quot;|&#96;[^&#96;\n]*?&#96;)/g, '<span class="tok-string">$1</span>')
    .replace(/\b(const|let|var|function|return|if|else|for|while|of|in|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|null|undefined|true|false|this|document|window|console)\b/g, '<span class="tok-keyword">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
}

/** Escape HTML special characters (used before highlighting). */
export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

/** Highlight every <pre><code class="language-x"> block inside a container. */
export function highlightAll(root = document) {
  for (const block of root.querySelectorAll('pre > code[class*="language-"]')) {
    const language = block.className.replace(/.*language-/, '');
    block.innerHTML = highlightCode(block.textContent, language);
  }
}

/** Read a query-string parameter from the current URL. */
export function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/** Build an internal URL with the given query parameters. */
export function buildUrl(page, params = {}) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') search.set(key, value);
  }
  const query = search.toString();
  return query ? `${page}?${query}` : page;
}

/** Get the current page name from the body's data-page attribute. */
export function currentPage() {
  return document.body.dataset.page || '';
}

/* ---------------- Site chrome (header / footer behaviours) ---------------- */

/** Initialize shared header behaviours: mobile nav, search modal, auth area. */
export function initChrome() {
  initMobileNav();
  initSearchModal();
  markCurrentNavLink();
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close the menu when a link inside it is chosen.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function markCurrentNavLink() {
  // Pages like lesson.html set data-nav="courses" to highlight their section.
  const navKey = document.body.dataset.nav || currentPage();
  if (!navKey) return;
  for (const link of document.querySelectorAll('.navigation a')) {
    if (link.dataset.nav === navKey) link.setAttribute('aria-current', 'page');
  }
}

/** Open/close the header search modal with live results. */
function initSearchModal() {
  const modal = document.getElementById('search-modal');
  const openButtons = document.querySelectorAll('[data-open-search]');
  if (!modal || openButtons.length === 0) return;

  const input = modal.querySelector('.search-input');
  const resultsList = modal.querySelector('.search-results');
  const closeButton = modal.querySelector('[data-close-search]');
  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    input.value = '';
    renderModalResults(resultsList, '');
    input.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  for (const button of openButtons) button.addEventListener('click', open);
  if (closeButton) closeButton.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  document.addEventListener('keydown', (event) => {
    // "/" focuses search unless the user is typing in a field.
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (event.key === '/' && !typing && modal.hidden) {
      event.preventDefault();
      open();
    }
    if (event.key === 'Escape' && !modal.hidden) close();
  });

  // Live search as the user types; Enter goes to the full search page.
  input.addEventListener('input', () => renderModalResults(resultsList, input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = input.value.trim();
      window.location.href = buildUrl('search.html', { q: query });
    }
  });
}

async function renderModalResults(list, query) {
  list.innerHTML = '';
  if (!query.trim()) {
    list.append(el('li', { className: 'search-empty', text: 'Type to search courses, lessons and topics…' }));
    return;
  }
  const { searchLessons } = await import('./search.js');
  const results = searchLessons(query, 6);
  if (results.length === 0) {
    list.append(el('li', { className: 'search-empty', text: `No results for “${query}”.` }));
    return;
  }
  for (const result of results) {
    const link = el('a', { attrs: { href: result.url } }, [
      el('span', { className: 'search-result-kind', text: `${result.courseTitle} · Lesson` }),
      el('span', { className: 'search-result-title', text: result.title }),
      el('span', { className: 'search-result-snippet', text: result.snippet }),
    ]);
    list.append(el('li', {}, [link]));
  }
}

/** Fill the header auth area depending on the signed-in user. */
export function renderAuthActions(container, user, mode) {
  if (!container) return;
  container.innerHTML = '';
  if (user) {
    const email = user.email || 'learner';
    const name = (user.user_metadata && user.user_metadata.display_name) || email.split('@')[0];
    const chip = el('a', { className: 'user-chip', attrs: { href: 'dashboard.html' } }, [
      el('span', { className: 'avatar', text: name.charAt(0).toUpperCase() }),
      document.createTextNode(name),
    ]);
    container.append(chip);
  } else {
    container.append(
      el('a', { className: 'btn btn-ghost', text: 'Log in', attrs: { href: 'login.html' } }),
      el('a', { className: 'btn btn-primary', text: 'Sign up', attrs: { href: 'register.html' } })
    );
  }
  if (mode === 'demo') {
    const note = document.querySelector('[data-demo-note]');
    if (note) note.hidden = false;
  }
}
