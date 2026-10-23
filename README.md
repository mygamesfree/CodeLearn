# CodeLearn

A free, beginner-friendly learning platform for **HTML**, **CSS** and **JavaScript** —
hand-built with vanilla HTML5, CSS3 and JavaScript modules. No frameworks, no build step.

## Features

- **3 structured courses · 63 lessons** from beginner fundamentals through intermediate practice
- **Learning objectives, practical tasks and summaries** on every lesson
- **Live playgrounds** on every lesson: edit HTML/CSS/JS in the browser and see results instantly
  (JavaScript lessons get a captured console; DOM lessons run inside a sandboxed iframe)
- **63 exercises** with three question types (multiple choice, fill-in-the-blank, write-code),
  including code-reading and debugging questions, instant feedback, per-question explanations,
  scores and unlimited retries
- **11 progressively harder projects** with requirements, steps, completion criteria and resources
- **Developer Neon theme** — dark charcoal surfaces, neon green accent, polished cards and
  code blocks, responsive layouts and reduced-motion support
- **Search** across all courses and lessons (header modal with live results + full search page)
- **Progress tracking** — lesson completion and best exercise scores, stored in the browser and
  synced to your account when Supabase is connected
- **Accounts** — sign up, log in, log out, email confirmation and password reset via Supabase
- **Responsive** layout for desktop, tablet and mobile, with an accessible hamburger menu
- **Demo mode** — everything works with zero configuration; auth pages clearly warn that
  accounts are local-only until Supabase is connected

## Quick start

No account or configuration is needed to browse and learn:

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

(Any static file server works, e.g. `npx serve`.)

> The site uses ES modules, so it must be served over HTTP — opening `index.html`
> directly with `file://` will not work.

## Project structure

```
index.html … update-password.html   the pages (each declares <body data-page="…">)
projects.html, project.html        project list and single project view
script.js                     single entry point: loads the right page module
style.css                     full design system (CSS variables, sections)
config.js                     Supabase URL + anon key (empty = demo mode)
js/
  data.js                     ALL course, lesson, exercise and project content
  ui.js                       DOM helpers, toasts, search modal, mobile nav
  grading.js                  exercise scoring engine (pure functions)
  search.js                   client-side search index
  storage.js                  localStorage progress + demo accounts
  supabase-client.js          auth API (Supabase or demo mode)
  progress.js                 progress tracking + Supabase sync
  pages/*.js                  one module per page
supabase/schema.sql           database schema + Row Level Security policies
tests/validate.mjs            automated checks (node tests/validate.mjs)
tests/browser_test.py         80 end-to-end browser tests (Playwright)
```

All learning content lives in **`js/data.js`** — edit that one file to change text,
add lessons, write new exercises or define projects. Every exercise supports automated
verification: `referenceAnswers()` builds the correct answers and the test suite proves
each one scores 100. Lesson objectives, practical tasks and takeaways are attached from
the same file so the lesson page, tests and navigation stay consistent.

## Connect real accounts (Supabase)

Until you do this, the site runs in **demo mode**: sign-up/login use browser storage only,
and the auth pages show a visible warning. Progress, lessons and exercises work either way.

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is enough).

2. **Create the tables and policies** — open *SQL Editor → New query*, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql) and click **Run**. This creates `profiles`,
   `lesson_progress`, Row Level Security policies, and a trigger that creates a profile row
   on sign-up.

3. **Copy your credentials** — *Project Settings → API*:
   - *Project URL* → `SUPABASE_URL`
   - *anon public* key → `SUPABASE_ANON_KEY`

   Put both in **`config.js`**:

   ```js
   export const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
   export const SUPABASE_ANON_KEY = 'eyJ...your-anon-key...';
   ```

   These two values are public by design and safe in frontend code. Access is limited to what
   the RLS policies allow. **Never** put the `service_role` key, database password or any
   secret in frontend code.

4. **Configure auth URLs** — *Authentication → URL Configuration*:
   - Site URL: `http://localhost:8000` (and your production URL later)
   - Redirect URLs: add `http://localhost:8000/update-password.html` and
     `http://localhost:8000/login.html`

5. **Email confirmation** — by default Supabase sends a confirmation link after sign-up.
   The site handles the `?message=check_email` and confirmation redirects automatically.
   For quick local testing you can disable it under *Authentication → Providers → Email*.

6. Restart the server and reload — the demo-mode warning disappears and accounts are real.
   Progress you already earned locally is merged with your account on first sign-in.

### How progress sync works

- Progress is **always** written to `localStorage` first, so it works offline and without an account.
- When signed in, it is also upserted into `lesson_progress` (one row per user + lesson) and
  merged back down on sign-in (highest score wins, most recent completion date wins).
- Row Level Security guarantees users can only read/write **their own** rows.

## Tests

```bash
# Static + logic tests (no browser needed, only Node):
node tests/validate.mjs
# or: npm test

# End-to-end browser tests (needs Playwright):
pip install playwright && playwright install chromium
python3 tests/browser_test.py
```

`validate.mjs` checks: JS syntax of every file, content database integrity, that **every
exercise is solvable and scores 100% with its reference answers**, search behaviour,
progress-storage math, and that every local link/script in every HTML page points to a real file.

`browser_test.py` checks, in a real Chromium browser: page rendering, live playgrounds,
in-browser exercise grading (correct, wrong and failing-code paths), search modal and search
page, demo-mode register/login/logout/password-reset flows, progress persistence, mobile
navigation, and that no JavaScript console errors occur.

## Browser support

Evergreen browsers (Chrome, Firefox, Edge, Safari). The site uses ES modules, CSS custom
properties and `iframe.srcdoc` — all supported in current browser versions.
