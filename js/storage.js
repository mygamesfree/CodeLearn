/**
 * storage.js — local (browser) persistence for progress and demo accounts.
 *
 * Progress is always saved locally so the site keeps working offline and
 * without an account. When a user signs in with Supabase, js/progress.js
 * syncs the same data to the database.
 *
 * Every function degrades gracefully when localStorage is unavailable
 * (private browsing, Node tests): an in-memory object is used instead.
 */

const PROGRESS_KEY = 'codelearn_progress_v1';
const DEMO_AUTH_KEY = 'codelearn_demo_auth_v1';
const SESSION_KEY = 'codelearn_session_v1';

/* ---------------- tiny storage backend ---------------- */

const memoryStore = new Map();

function backend() {
  try {
    const probe = '__codelearn_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return {
      getItem: (key) => (memoryStore.has(key) ? memoryStore.get(key) : null),
      setItem: (key, value) => memoryStore.set(key, String(value)),
      removeItem: (key) => memoryStore.delete(key),
    };
  }
}

function readJson(key, fallback) {
  try {
    const raw = backend().getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    backend().setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — ignore, memory copy still works */
  }
}

/* ---------------- progress ---------------- */

/** Empty progress document. */
export function emptyProgress() {
  return {
    version: 1,
    completed: {},   // lessonId -> ISO timestamp
    scores: {},      // exerciseId -> { best, last, attempts }
    visits: {},      // lessonId -> ISO timestamp
  };
}

/** Read the full local progress document. */
export function loadProgress() {
  const stored = readJson(PROGRESS_KEY, null);
  if (!stored || stored.version !== 1) return emptyProgress();
  return {
    version:  1,
    completed: stored.completed || {},
    scores: stored.scores || {},
    visits: stored.visits || {},
  };
}

/** Save the full local progress document. */
export function saveProgress(progress) {
  writeJson(PROGRESS_KEY, progress);
}

/** Record that a lesson was opened. */
export function recordVisit(lessonId) {
  const progress = loadProgress();
  progress.visits[lessonId] = new Date().toISOString();
  saveProgress(progress);
}

/** Mark a lesson complete (idempotent). Returns true when newly completed. */
export function completeLesson(lessonId) {
  const progress = loadProgress();
  const isNew = !progress.completed[lessonId];
  if (isNew) {
    progress.completed[lessonId] = new Date().toISOString();
    saveProgress(progress);
  }
  return isNew;
}

/** Re-open a lesson (mark it incomplete again). */
export function uncompleteLesson(lessonId) {
  const progress = loadProgress();
  if (!progress.completed[lessonId]) return false;
  delete progress.completed[lessonId];
  saveProgress(progress);
  return true;
}

/**
 * Store the result of an exercise attempt.
 * Keeps the best score plus the most recent attempt count.
 */
export function recordExerciseScore(exerciseId, score) {
  const progress = loadProgress();
  const current = progress.scores[exerciseId] || { best: 0, last: 0, attempts: 0 };
  const updated = {
    best: Math.max(current.best, score),
    last: score,
    attempts: current.attempts + 1,
  };
  progress.scores[exerciseId] = updated;
  saveProgress(progress);
  return updated;
}

/** Best score for one exercise (0 when never attempted). */
export function getBestScore(exerciseId) {
  const progress = loadProgress();
  const entry = progress.scores[exerciseId];
  return entry ? entry.best : 0;
}

/** Merge remote progress into the local copy (called after signing in). */
export function mergeProgress(remote = {}) {
  const local = loadProgress();

  for (const [lessonId, timestamp] of Object.entries(remote.completed || {})) {
    // Keep the most recent completion date from either side.
    if (!local.completed[lessonId] || timestamp > local.completed[lessonId]) {
      local.completed[lessonId] = timestamp;
    }
  }

  for (const [exerciseId, entry] of Object.entries(remote.scores || {})) {
    const current = local.scores[exerciseId] || { best: 0, last: 0, attempts: 0 };
    local.scores[exerciseId] = {
      best: Math.max(current.best, entry.best || 0),
      last: entry.last || entry.best || current.last,
      attempts: Math.max(current.attempts, entry.attempts || 0),
    };
  }

  saveProgress(local);
  return local;
}

/* ---------------- demo authentication ---------------- */
/*
 * Used ONLY when Supabase is not configured. Accounts live in this browser
 * and are clearly labelled as a demo in the UI. Passwords are stored as a
 * non-reversible hash so they are never written in plain text — but this is
 * still not real security, which is one reason real auth needs Supabase.
 */

function hashPassword(text) {
  // Simple FNV-1a style hash. NOT cryptographically secure — demo only.
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

/** List demo accounts stored in this browser (emails only). */
export function loadDemoUsers() {
  return readJson(DEMO_AUTH_KEY, {});
}

/** Create a demo account. Returns false when the email already exists. */
export function createDemoUser(email, password, displayName) {
  const users = loadDemoUsers();
  const key = email.toLowerCase();
  if (users[key]) return false;
  users[key] = {
    email,
    passwordHash: hashPassword(password),
    displayName: displayName || email.split('@')[0],
    createdAt: new Date().toISOString(),
  };
  writeJson(DEMO_AUTH_KEY, users);
  return true;
}

/** Check demo credentials. Returns the user object or null. */
export function verifyDemoUser(email, password) {
  const users = loadDemoUsers();
  const record = users[String(email).toLowerCase()];
  if (!record) return null;
  if (record.passwordHash !== hashPassword(password)) return null;
  return { email: record.email, user_metadata: { display_name: record.displayName } };
}

/* ---------------- session ---------------- */

/** Save the current session (demo mode only). */
export function saveDemoSession(user) {
  writeJson(SESSION_KEY, { user, savedAt: Date.now() });
}

/** Read the saved demo session. */
export function loadDemoSession() {
  return readJson(SESSION_KEY, null);
}

/** Clear the saved demo session. */
export function clearDemoSession() {
  try {
    backend().removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
