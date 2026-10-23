/**
 * pages/auth.js — handles login, registration, password reset and
 * password update pages (identified by <body data-page="…">).
 */

import { el, must, getParam, showToast, setLoading, escapeHtml } from '../ui.js';
import {
  initAuth,
  authMode,
  authStartupError,
  signIn,
  signUp,
  signOut,
  sendPasswordReset,
  updateUserPassword,
  getCurrentUser,
  isRecoverySession,
} from '../supabase-client.js';
import { pullRemoteProgress } from '../progress.js';

export async function init() {
  await initAuth();
  showModeNotice();
  handleAuthMessages();

  // Password visibility toggles work on every auth page.
  for (const button of document.querySelectorAll('[data-password-toggle]')) {
    button.addEventListener('click', () => togglePassword(button));
  }

  const page = document.body.dataset.page;
  if (page === 'login') initLogin();
  if (page === 'register') initRegister();
  if (page === 'reset-password') initResetPassword();
  if (page === 'update-password') initUpdatePassword();
}

/* ---------------- shared helpers ---------------- */

function showModeNotice() {
  const banner = document.querySelector('[data-auth-mode-banner]');
  if (!banner) return;

  if (authMode() === 'demo') {
    banner.hidden = false;
    banner.innerHTML =
      '<strong>Demo mode — accounts stay in this browser</strong>' +
      'Supabase is not configured yet, so sign-up, login and progress use local ' +
      'storage instead of a real backend. Follow README.md to connect Supabase ' +
      'for real accounts, email confirmation and password reset.';
  } else if (authStartupError()) {
    banner.hidden = false;
    banner.innerHTML = `<strong>Connection problem</strong>${escapeHtml(authStartupError())}`;
  }
}

/**
 * Read a callback parameter from either the query string or the URL hash.
 * Supabase can return errors in the hash before it clears the token data.
 */
function getCallbackParam(name) {
  const search = new URLSearchParams(window.location.search);
  if (search.has(name)) return search.get(name);

  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return hash.get(name);
}

/** Show messages / errors coming back from Supabase email links. */
function handleAuthMessages() {
  const message = getCallbackParam('message');
  const error = getCallbackParam('error');
  const errorCode = getCallbackParam('error_code');
  const errorDescription = getCallbackParam('error_description');

  if (message === 'check_email' || message === 'confirmation_success') {
    const signedIn = Boolean(getCurrentUser());
    showFormMessage(
      'success',
      message === 'confirmation_success'
        ? signedIn
          ? 'Email confirmed — you are signed in and ready to learn.'
          : 'Email confirmed — you can log in now.'
        : 'Almost there! Check your inbox and click the confirmation link we just sent.'
    );
  }
  if (message === 'recovery') {
    showFormMessage('info', 'Enter your new password below to finish resetting it.');
  }
  if (error || errorCode) {
    let text = errorDescription || errorCode || error || 'unknown error';
    try {
      text = decodeURIComponent(text).replace(/_/g, ' ');
    } catch {
      /* keep the raw message if it is not URI-encoded */
    }
    showFormMessage('error', `That link did not work: ${text}. Request a new one below.`);
  }
}

function showFormMessage(kind, text, formMessage) {
  const box = formMessage || document.querySelector('.form-message');
  if (!box) return;
  box.className = `form-message show ${kind}`;
  box.textContent = text;
  box.setAttribute('role', kind === 'error' ? 'alert' : 'status');
}

function clearFormMessage(formMessage) {
  const box = formMessage || document.querySelector('.form-message');
  if (!box) return;
  box.className = 'form-message';
  box.textContent = '';
}

function setFieldError(input, message) {
  const field = input.closest('.field');
  const error = field ? field.querySelector('.field-error') : null;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (error) error.textContent = message || '';
  return !message;
}

function validateEmail(input) {
  const value = input.value.trim();
  if (!value) return setFieldError(input, 'Email is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return setFieldError(input, 'Enter a valid email address, like you@example.com.');
  }
  return setFieldError(input, '');
}

function validatePassword(input, { minLength = 6 } = {}) {
  const value = input.value;
  if (!value) return setFieldError(input, 'Password is required.');
  if (value.length < minLength) {
    return setFieldError(input, `Use at least ${minLength} characters.`);
  }
  return setFieldError(input, '');
}

function togglePassword(button) {
  const input = document.getElementById(button.dataset.passwordToggle);
  if (!input) return;
  const showing = input.type === 'text';
  input.type = showing ? 'password' : 'text';
  button.textContent = showing ? 'Show' : 'Hide';
  button.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
}

async function redirectAfterLogin() {
  const next = getParam('next');
  // Only allow relative redirects so ?next=https://evil.com cannot hijack login.
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next.slice(1) : 'dashboard.html';
  window.location.href = safeNext;
}

/* ---------------- login ---------------- */

function initLogin() {
  const form = must('#login-form');
  const emailInput = must('#login-email');
  const passwordInput = must('#login-password');
  const submit = must('#login-submit');

  // Already signed in? Send them to the dashboard straight away.
  if (getCurrentUser()) {
    const notice = document.querySelector('[data-already-logged-in]');
    if (notice) notice.hidden = false;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFormMessage();

    const emailOk = validateEmail(emailInput);
    const passwordOk = passwordInput.value ? setFieldError(passwordInput, '') : setFieldError(passwordInput, 'Password is required.');
    if (!emailOk || !passwordOk) return;

    setLoading(submit, true, 'Logging in…');
    try {
      const result = await signIn(emailInput.value.trim(), passwordInput.value);
      if (result.error) {
        showFormMessage('error', result.error);
        return;
      }
      showToast(`Welcome back, ${(result.user.email || 'learner').split('@')[0]}!`, 'success');
      await pullRemoteProgress();
      await redirectAfterLogin();
    } catch (error) {
      console.error(error);
      showFormMessage('error', 'Something went wrong while logging in. Please try again.');
    } finally {
      setLoading(submit, false);
    }
  });
}

/* ---------------- register ---------------- */

function initRegister() {
  const form = must('#register-form');
  const nameInput = must('#register-name');
  const emailInput = must('#register-email');
  const passwordInput = must('#register-password');
  const confirmInput = must('#register-confirm');
  const submit = must('#register-submit');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFormMessage();

    const nameOk = nameInput.value.trim()
      ? setFieldError(nameInput, '')
      : setFieldError(nameInput, 'Please tell us what to call you.');
    const emailOk = validateEmail(emailInput);
    const passwordOk = validatePassword(passwordInput);

    let confirmOk = setFieldError(confirmInput, '');
    if (confirmInput.value !== passwordInput.value) {
      confirmOk = setFieldError(confirmInput, 'The two passwords do not match.');
    }

    if (!nameOk || !emailOk || !passwordOk || !confirmOk) return;

    setLoading(submit, true, 'Creating your account…');
    try {
      const result = await signUp({
        email: emailInput.value.trim(),
        password: passwordInput.value,
        displayName: nameInput.value.trim(),
      });

      if (result.error) {
        showFormMessage('error', result.error);
        return;
      }

      if (result.needsConfirmation) {
        showFormMessage(
          'success',
          'Account created! Check your inbox and click the confirmation link, then log in.'
        );
        form.reset();
        showToast('Confirmation email sent.', 'success');
      } else {
        showToast('Account created — welcome to CodeLearn!', 'success');
        await redirectAfterLogin();
      }
    } catch (error) {
      console.error(error);
      showFormMessage('error', 'Something went wrong while creating your account. Please try again.');
    } finally {
      setLoading(submit, false);
    }
  });
}

/* ---------------- password reset request ---------------- */

function initResetPassword() {
  const form = must('#reset-form');
  const emailInput = must('#reset-email');
  const submit = must('#reset-submit');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFormMessage();

    if (!validateEmail(emailInput)) return;

    setLoading(submit, true, 'Sending…');
    try {
      const result = await sendPasswordReset(emailInput.value.trim());
      if (result.error) {
        showFormMessage('error', result.error);
        return;
      }
      showFormMessage(
        'success',
        'Reset link sent! Check your inbox and follow the link to choose a new password.'
      );
      form.reset();
    } catch (error) {
      console.error(error);
      showFormMessage('error', 'The reset email could not be sent. Please try again.');
    } finally {
      setLoading(submit, false);
    }
  });
}

/* ---------------- new password ---------------- */

function initUpdatePassword() {
  const form = must('#update-form');
  const passwordInput = must('#update-password');
  const confirmInput = must('#update-confirm');
  const submit = must('#update-submit');

  // If Supabase is not configured there is nothing sensible to do here.
  if (authMode() !== 'supabase') {
    form.hidden = true;
    showFormMessage(
      'error',
      'Setting a new password requires Supabase. Add your project credentials to ' +
        'config.js (see README.md), then reopen the link from your reset email.'
    );
    return;
  }

  // Supabase exchanges the recovery link for a short-lived session. Without
  // that session there is no user to update, so explain what to do instead.
  if (!getCurrentUser()) {
    form.hidden = true;
    showFormMessage(
      'error',
      'Open the password reset link from your email to choose a new password. ' +
        'If the link has expired, request a new one.'
    );
    return;
  }

  if (isRecoverySession()) {
    showFormMessage('info', 'Reset link verified. Choose a new password below.');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFormMessage();

    const passwordOk = validatePassword(passwordInput, { minLength: 8 });
    let confirmOk = setFieldError(confirmInput, '');
    if (confirmInput.value !== passwordInput.value) {
      confirmOk = setFieldError(confirmInput, 'The two passwords do not match.');
    }
    if (!passwordOk || !confirmOk) return;

    setLoading(submit, true, 'Saving…');
    try {
      const result = await updateUserPassword(passwordInput.value);
      if (result.error) {
        showFormMessage('error', result.error);
        return;
      }
      showFormMessage('success', 'Password updated! Redirecting you to your dashboard…');
      showToast('Password updated.', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (error) {
      console.error(error);
      showFormMessage('error', 'The new password could not be saved. Please try again.');
    } finally {
      setLoading(submit, false);
    }
  });
}

/** Exported so the dashboard can reuse the same sign-out flow. */
export { signOut };
