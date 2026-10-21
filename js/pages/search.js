/**
 * pages/search.js — the full search page (?q=…).
 */

import { el, must, getParam } from '../ui.js';
import { searchLessons, highlightTerms, POPULAR_SEARCHES } from '../search.js';

export async function init() {
  const input = must('#search-page-input');
  const form = must('#search-page-form');
  const resultsContainer = must('#search-page-results');
  const status = must('#search-page-status');

  const initialQuery = getParam('q') || '';
  input.value = initialQuery;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    // Keep the address bar shareable.
    const url = query ? `search.html?q=${encodeURIComponent(query)}` : 'search.html';
    window.history.replaceState({}, '', url);
    render(query);
  });

  render(initialQuery);

  function render(query) {
    resultsContainer.innerHTML = '';
    status.innerHTML = '';

    if (!query.trim()) {
      status.append(
        el('h2', { text: 'Search CodeLearn' }),
        el('p', { className: 'muted', text: 'Find lessons across every course — try one of these:' })
      );
      const popular = el('div', { className: 'demo-actions', attrs: { style: 'flex-wrap:wrap' } });
      for (const term of POPULAR_SEARCHES) {
        popular.append(el('button', {
          className: 'btn btn-outline',
          text: term,
          attrs: { type: 'button' },
        }));
      }
      popular.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        input.value = button.textContent;
        render(button.textContent);
      });
      resultsContainer.append(popular);
      return;
    }

    const results = searchLessons(query, 30);

    if (results.length === 0) {
      resultsContainer.append(el('div', { className: 'empty-state' }, [
        el('h2', { text: `No results for “${query}”` }),
        el('p', { text: 'Check the spelling, or try a shorter keyword like “flexbox” or “forms”.' }),
        el('a', { className: 'btn btn-primary', text: 'Browse all courses', attrs: { href: 'courses.html' } }),
      ]));
      return;
    }

    status.append(el('p', {
      className: 'muted',
      text: `${results.length} result${results.length === 1 ? '' : 's'} for “${query}”`,
      attrs: { style: 'margin-bottom:1rem' },
    }));

    const list = el('ul', { className: 'result-list' });
    for (const result of results) {
      list.append(el('li', { className: 'result-item' }, [
        el('span', { className: `tag ${result.courseTagClass}`, text: result.courseBadge }),
        el('h3', {}, [
          el('a', {
            html: highlightTerms(result.title, query),
            attrs: { href: result.url },
          }),
        ]),
        el('p', { html: highlightTerms(result.snippet, query) }),
      ]));
    }
    resultsContainer.append(list);
  }
}
