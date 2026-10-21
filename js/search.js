/**
 * search.js — client-side search across courses and lessons.
 *
 * Builds a lightweight index from the content database in data.js.
 * Every search is plain text matching, so it works offline and needs
 * no server.
 */

import { COURSES, ALL_LESSONS } from './data.js';

/** Strip HTML tags from a string (used on lesson content). */
function textOf(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Build the search index once per page load. */
let indexCache = null;

export function buildIndex() {
  if (indexCache) return indexCache;

  indexCache = ALL_LESSONS.map((lesson) => {
    const course = COURSES.find((item) => item.id === lesson.courseId);
    const body = textOf(lesson.content);
    return {
      lessonId: lesson.id,
      courseId: lesson.courseId,
      courseTitle: course ? course.title : lesson.courseId,
      courseBadge: course ? course.badge : '',
      courseTagClass: course ? course.tagClass : '',
      title: lesson.title,
      summary: lesson.summary,
      body,
      // Searchable haystack: title + summary + course name + first of the body.
      haystack: `${lesson.title} ${lesson.summary} ${course ? course.title : ''} ${course ? course.tagline : ''} ${body}`.toLowerCase(),
      url: `lesson.html?course=${lesson.courseId}&id=${lesson.id}`,
    };
  });

  return indexCache;
}

/**
 * Search lessons for a query string.
 * Returns up to `limit` results, best matches first.
 */
export function searchLessons(query, limit = 10) {
  const terms = String(query || '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) return [];

  const scored = buildIndex()
    .map((entry) => {
      let score = 0;
      for (const term of terms) {
        // Title matches weigh far more than body matches.
        if (entry.title.toLowerCase().includes(term)) score += 10;
        if (entry.summary.toLowerCase().includes(term)) score += 5;
        if (entry.courseTitle.toLowerCase().includes(term)) score += 4;
        if (entry.body.toLowerCase().includes(term)) score += 1;
      }
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((item) => ({
    ...item.entry,
    snippet: makeSnippet(item.entry.body, terms[0]),
  }));
}

/** Extract a short excerpt around the first matching term. */
export function makeSnippet(body, term, radius = 80) {
  const text = String(body || '');
  const position = text.toLowerCase().indexOf(String(term || '').toLowerCase());
  if (position === -1) return text.slice(0, radius * 2).trim() + '…';

  const start = Math.max(0, position - radius);
  const end = Math.min(text.length, position + radius);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return prefix + text.slice(start, end).trim() + suffix;
}

/** Highlight query terms inside plain text; returns an HTML string. */
export function highlightTerms(text, query) {
  const terms = String(query || '')
    .split(/\s+/)
    .filter((term) => term.length > 1)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  let html = escapeHtml(text);
  if (terms.length === 0) return html;

  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  return html.replace(regex, '<mark>$1</mark>');
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Popular search terms shown on the search page. */
export const POPULAR_SEARCHES = ['flexbox', 'selectors', 'functions', 'forms', 'loops', 'dom'];
