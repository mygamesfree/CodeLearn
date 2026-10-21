/**
 * supabase-client.js — authentication for CodeLearn.
 *
 * Two modes, chosen automatically at start-up:
 *
 *   1. "supabase" — config.js contains a project URL and anon key, and the
 *      supabase-js library loads from the CDN. Real accounts, emails and
 *      database sync are available.
 *
 *   2. "demo" — nothing is configured (or the library cannot load). Accounts
 *      are stored in this browser only. The UI shows a clear warning so
 *      nobody mistakes this for real authentication.
 *
 * The public API is promise-based and identical in both modes, so page code
 * never needs to care which mode is active.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config.js';
import {
  loadDemoSession,
  saveDemoSession,
  clearDemoSession,
  createDemoUser,
  verifyDemoUser,
} from './storage.js';

const SUPABASE_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

let client = null;
let mode = 'demo';
let startError = null;
let currentUser = null;
let startPromise = null;
let recoverySession = false;
const listeners = [];

/** True when a real Supabase project is configured and connected. */
export function isSupabaseMode() {
  return mode === 'supabase';
}

/** Which mode the app is running in: 'supabase' or 'demo'. */
export function authMode() {
  return mode;
}

/** A friendly message describing why supabase mode is unavailable (if it is). */
export function authStartupError() {
  return startError;
}

/** The live supabase-js client (null in demo mode). */
export function getClient() {
  return client;
}

/**
 * Initialise the auth system (call once per page).
 * Resolves to the current user object or null.
 */
export function initAuth() {
  if (!startPromise) startPromise = start();
  return startPromise;
}

async function start() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    mode = 'demo';
    currentUser = (loadDemoSession() || {}).user || null;
    notifyListeners(currentUser);
    return currentUser;
  }

  try {
    const { createClient } = await import(SUPABASE_CDN);
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    mode = 'supabase';

    // Pick up an existing session (also processes ?code= / #access_token= links
    // sent back by an email confirmation or password recovery).
    const { data } = await client.auth.getSession();
    currentUser = data.session ? data.session.user : null;

    client.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') recoverySession = true;
      currentUser = session ? session.user : null;
      notifyListeners(currentUser, event);
    });
  } catch (error) {
    mode = 'demo';
    startError =
      'Could not load the Supabase library from the CDN. ' +
      'Check your internet connection — accounts are running in local demo mode.';
    console.warn('[CodeLearn] Supabase unavailable:', error.message);
    currentUser = (loadDemoSession() || {}).user || null;
  }

  notifyListeners(currentUser);
  return currentUser;
}

/** The signed-in user (or null). Call initAuth() first. */
export function getCurrentUser() {
  return currentUser;
}

/** Subscribe to sign-in / sign-out changes. Returns an unsubscribe function. */
export function onAuthChange(callback) {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) listeners.splice(index, 1);
  };
}

function notifyListeners(user, event = 'INITIAL') {
  for (const listener of listeners) {
    try {
      listener(user, event);
    } catch (error) {
      console.error('[CodeLearn] auth listener failed:', error);
    }
  }
}

/* ---------------- sign in ---------------- */

/**
 * Sign in with email + password.
 * Returns { user } on success or { error } with a friendly message.
 */
export async function signIn(email, password) {
  await initAuth();

  if (mode === 'supabase') {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) return { error: friendlyError(error) };
    return { user: data.user };
  }

  const user = verifyDemoUser(email, password);
  if (!user) {
    return {
      error: 'No demo account matches that email and password. Create one with Sign up first.',
    };
  }
  currentUser = user;
  saveDemoSession(user);
  notifyListeners(user, 'SIGNED_IN');
  return { user };
}

/* ---------------- sign up ---------------- */

/**
 * Create a new account.
 * Returns { user, needsConfirmation } or { error }.
 */
export async function signUp({ email, password, displayName }) {
  await initAuth();

  if (mode === 'supabase') {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName || '' } },
    });
    if (error) return { error: friendlyError(error) };
    // When email confirmation is enabled, no session is returned yet.
    const needsConfirmation = !data.session;
    return { user: data.user, needsConfirmation };
  }

  const created = createDemoUser(email, password, displayName);
  if (!created) return { error: 'An account with this email already exists in demo mode.' };

  const user = verifyDemoUser(email, password);
  currentUser = user;
  saveDemoSession(user);
  notifyListeners(user, 'SIGNED_IN');
  return { user, needsConfirmation: false };
}

/* ---------------- sign out ---------------- */

export async function signOut() {
  await initAuth();

  if (mode === 'supabase') {
    const { error } = await client.auth.signOut();
    if (error) return { error: friendlyError(error) };
    currentUser = null;
    notifyListeners(currentUser, 'SIGNED_OUT');
    return {};
  }

  clearDemoSession();
  currentUser = null;
  notifyListeners(currentUser, 'SIGNED_OUT');
  return {};
}

/* ---------------- password reset ---------------- */

/**
 * Send a password-reset email.
 * In demo mode this refuses honestly instead of pretending to send email.
 */
export async function sendPasswordReset(email) {
  await initAuth();

  if (mode !== 'supabase') {
    return {
      error:
        'Password reset emails require Supabase. Add your project URL and anon key ' +
        'to config.js (see README.md), then try again.',
    };
  }

  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/update-password.html',
  });
  if (error) return { error: friendlyError(error) };
  return {};
}

/** Set a new password for the signed-in user (used on update-password.html). */
export async function updateUserPassword(newPassword) {
  await initAuth();

  if (mode !== 'supabase') {
    return {
      error:
        'Changing a password requires Supabase. Add your project credentials ' +
        'to config.js (see README.md) to enable this.',
    };
  }

  if (!currentUser) {
    return {
      error:
        'Open the reset link from your email first — this page only works during ' +
        'a password recovery session.',
    };
  }

  const { error } = await client.auth.updateUser({ password: newPassword });
  if (error) return { error: friendlyError(error) };
  return {};
}

/** True when the current session started from a password-recovery email link. */
export function isRecoverySession() {
  return recoverySession;
}

/* ---------------- helpers ---------------- */

/** Translate technical auth errors into messages beginners can act on. */
export function friendlyError(error) {
  const message = String(error && error.message ? error.message : error);

  const map = [
    [/invalid login credentials/i, 'Wrong email or password. Check both fields and try again.'],
    [/email not confirmed/i, 'Please confirm your email first. Open the confirmation link we sent you.'],
    [/user already registered/i, 'This email is already registered. Try logging in instead.'],
    [/password should be at least/i, 'Password is too short — use at least 6 characters.'],
    [/unable to validate email/i, 'That email address does not look valid.'],
    [/rate limit/i, 'Too many attempts. Please wait a minute and try again.'],
    [/fetch|network|failed to fetch/i, 'Network problem — check your connection and try again.'],
  ];

  for (const [pattern, friendly] of map) {
    if (pattern.test(message)) return friendly;
  }
  return message;
}
