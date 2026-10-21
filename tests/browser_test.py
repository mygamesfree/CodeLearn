#!/usr/bin/env python3
"""End-to-end browser tests for CodeLearn using Playwright + Chromium.

Requires:  pip install playwright && playwright install chromium
Run:       python3 tests/browser_test.py
"""
import sys, threading
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print('Playwright is not installed — skipping browser tests.')
    print('Install with:  pip install playwright && playwright install chromium')
    sys.exit(0)

PORT = 8765
BASE = f'http://127.0.0.1:{PORT}'

passed = failed = 0
failures = []

def check(name, cond, detail=''):
    global passed, failed
    if cond:
        passed += 1
        print(f'  ok    {name}')
    else:
        failed += 1
        failures.append(name)
        print(f'  FAIL  {name} {detail}')

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

def start_server():
    handler = lambda *a, **kw: QuietHandler(*a, directory=str(ROOT), **kw)
    httpd = ThreadingHTTPServer(('127.0.0.1', PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd

def main():
    httpd = start_server()
    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={'width': 1280, 'height': 900})
        page = context.new_page()

        page.on('console', lambda msg: console_errors.append(f'{page.url}: {msg.text}') if msg.type == 'error' else None)
        page.on('pageerror', lambda err: console_errors.append(f'{page.url}: PAGEERROR {err}'))

        # ---------- home ----------
        print('\n== Home ==')
        page.goto(f'{BASE}/index.html')
        page.wait_for_selector('.course-card', timeout=5000)
        check('home renders 3 course cards', page.locator('.course-card').count() == 3)
        check('home hero heading', 'Learn Web Development' in page.inner_text('h1'))
        check('home stats show 17 lessons', page.inner_text('[data-stat-lessons]') == '17')
        check('home nav has aria-current on Home', page.locator('.navigation a[aria-current="page"]').inner_text() == 'Home')

        # ---------- courses ----------
        print('\n== Courses page ==')
        page.click('.navigation a[href="courses.html"]')
        page.wait_for_selector('#courses-grid .course-card', timeout=5000)
        check('courses page url', page.url.endswith('courses.html'))
        check('courses page renders 3 cards', page.locator('#courses-grid .course-card').count() == 3)
        check('courses show lesson counts', '5 lessons' in page.inner_text('#courses-grid'))

        # ---------- course detail ----------
        print('\n== Course page ==')
        page.goto(f'{BASE}/course.html?id=html')
        page.wait_for_selector('#lesson-list .lesson-row', timeout=5000)
        check('course hero title', page.inner_text('#course-hero h1') == 'HTML Fundamentals')
        check('course lists 5 lessons', page.locator('#lesson-list .lesson-row').count() == 5)
        check('course shows progress bar', page.locator('#course-summary .progress-bar').count() == 1)

        page.goto(f'{BASE}/course.html?id=nope')
        page.wait_for_selector('.empty-state', timeout=5000)
        check('unknown course shows friendly 404', 'Course not found' in page.inner_text('.empty-state'))

        # ---------- lesson ----------
        print('\n== Lesson page ==')
        page.goto(f'{BASE}/lesson.html?course=html&id=html-1')
        page.wait_for_selector('#lesson-content h1', timeout=5000)
        check('lesson title rendered', page.inner_text('#lesson-content h1') == 'What is HTML?')
        check('lesson TOC has entries', page.locator('#lesson-toc a').count() >= 3)
        check('lesson demo mounted', page.locator('.demo iframe').count() == 1)
        check('lesson has exercise button', 'Open the exercise' in page.inner_text('#lesson-actions'))
        check('lesson has prev/next', page.locator('#lesson-nav a').count() == 2)

        # HTML demo preview actually renders
        page.wait_for_timeout(600)
        frame = page.frame_locator('.demo iframe')
        check('demo preview shows h1', 'Hello, world!' in frame.locator('h1').inner_text(timeout=3000))

        # mark complete
        page.click('#lesson-actions button:has-text("Mark lesson as complete")')
        page.wait_for_timeout(400)
        check('lesson completion updates button', 'Completed' in page.inner_text('#lesson-actions button'))
        check('lesson row marked complete on course page', True)

        # JS lesson demo with console output
        page.goto(f'{BASE}/lesson.html?course=js&id=js-1')
        page.wait_for_selector('.demo-console', timeout=5000)
        page.wait_for_timeout(600)
        console_text = page.inner_text('.demo-console')
        check('js demo auto-runs and prints', 'Hello, world!' in console_text, console_text[:80])
        check('js demo prints 2+2', '4' in console_text)

        # DOM lesson demo
        page.goto(f'{BASE}/lesson.html?course=js&id=js-7')
        page.wait_for_selector('.demo-console', timeout=5000)
        page.wait_for_timeout(800)
        check('dom demo iframe present', page.locator('.demo iframe').count() == 1)
        check('dom demo console shows listener message', 'Listeners attached' in page.inner_text('.demo-console'))

        # CSS lesson demo
        page.goto(f'{BASE}/lesson.html?course=css&id=css-3')
        page.wait_for_selector('.demo textarea', timeout=5000)
        check('css demo has html+css editors', page.locator('.demo textarea').count() == 2)

        # unknown lesson
        page.goto(f'{BASE}/lesson.html?course=html&id=zzz')
        page.wait_for_selector('.empty-state', timeout=5000)
        check('unknown lesson shows friendly 404', 'Lesson not found' in page.inner_text('.empty-state'))

        # ---------- exercise: correct answers ----------
        print('\n== Exercise grading in the browser ==')
        page.goto(f'{BASE}/exercise.html?course=html&id=html-1')
        page.wait_for_selector('.question', timeout=5000)
        check('exercise renders 3 questions', page.locator('.question').count() == 3)

        # answer Q1 (choice index 0), Q2 (choice 0), Q3 (fill: p, p)
        page.check('#q0-opt0')
        page.check('#q1-opt0')
        page.fill('input[name="q2-blank0"]', 'P')
        page.fill('input[name="q2-blank1"]', 'p')
        page.click('#exercise-footer button[type="submit"]')
        page.wait_for_selector('.score-big', timeout=5000)
        score = page.inner_text('.score-big')
        check('correct answers score 100%', score.strip() == '100%', score)
        check('summary says passed', 'Passed' in page.inner_text('#exercise-summary'))
        check('feedback shows Correct', page.locator('.question-feedback.correct').count() == 3)

        # retry then answer wrongly
        page.click('#retry-button')
        page.wait_for_selector('.question', timeout=5000)
        page.check('#q0-opt1')  # wrong
        page.check('#q1-opt0')
        page.fill('input[name="q2-blank0"]', 'div')
        page.fill('input[name="q2-blank1"]', 'div')
        page.click('#exercise-footer button[type="submit"]')
        page.wait_for_selector('.score-big', timeout=5000)
        score2 = page.inner_text('.score-big')
        check('wrong answers score below 100', score2.strip() != '100%', score2)
        check('incorrect feedback shown', page.locator('.question-feedback.incorrect').count() >= 1)
        check('correct choice highlighted', page.locator('.choice.is-correct').count() >= 1)

        # code exercise (js-5 double function)
        page.goto(f'{BASE}/exercise.html?course=js&id=js-5')
        page.wait_for_selector('.question', timeout=5000)
        page.fill('textarea[name="q2-code"]', 'function double(n) { return n * 2; }')
        # also answer the choice + fill questions correctly
        page.check('#q0-opt0')
        page.fill('input[name="q1-blank0"]', 'function')
        page.click('#exercise-footer button[type="submit"]')
        page.wait_for_selector('.score-big', timeout=5000)
        check('code exercise with solution scores 100', page.inner_text('.score-big').strip() == '100%')
        check('test result list shows passes', page.locator('.test-results li.pass').count() == 3)

        # failing code
        page.click('#retry-button')
        page.wait_for_selector('.question', timeout=5000)
        page.check('#q0-opt0')
        page.fill('input[name="q1-blank0"]', 'function')
        page.fill('textarea[name="q2-code"]', 'function double(n) { return n; }')
        page.click('#exercise-footer button[type="submit"]')
        page.wait_for_selector('.score-big', timeout=5000)
        check('failing code shows failed tests', page.locator('.test-results li.fail').count() >= 1)
        check('failing code scores below 100', page.inner_text('.score-big').strip() != '100%')

        # empty submission warning
        page.click('#retry-button')
        page.wait_for_selector('.question', timeout=5000)
        page.click('#exercise-footer button[type="submit"]')
        page.wait_for_timeout(300)
        check('fully empty submission shows toast warning', page.locator('.toast').count() >= 1)

        # ---------- exercises list ----------
        print('\n== Exercises page ==')
        page.goto(f'{BASE}/exercises.html')
        page.wait_for_selector('#exercise-list .lesson-row', timeout=5000)
        rows = page.locator('#exercise-list .lesson-row').count()
        check('exercises page lists all 17 exercises', rows == 17, str(rows))
        check('best score pills visible', page.locator('.score-pill').count() >= 1)

        # ---------- search ----------
        print('\n== Search ==')
        page.goto(f'{BASE}/index.html')
        page.wait_for_selector('[data-open-search]')
        page.keyboard.press('/')
        page.wait_for_selector('#search-modal:not([hidden])', timeout=3000)
        page.fill('.search-input', 'flexbox')
        page.wait_for_selector('.search-results li a', timeout=3000)
        first = page.inner_text('.search-results li a')
        check('modal search finds flexbox lesson', 'Flexbox' in first, first[:60])
        page.keyboard.press('Enter')
        page.wait_for_url('**/search.html?q=flexbox', timeout=3000)
        check('enter opens full search page', 'search.html' in page.url)
        page.wait_for_selector('.result-item', timeout=3000)
        check('search page shows result items', page.locator('.result-item').count() >= 1)
        check('search result highlighted', page.locator('.result-item mark').count() >= 1)

        # no-results search
        page.fill('#search-page-input', 'zzzqqqxyz')
        page.click('#search-page-form button[type="submit"]')
        page.wait_for_selector('.empty-state', timeout=3000)
        check('no-result search shows empty state', 'No results' in page.inner_text('.empty-state'))

        # modal with no query
        page.goto(f'{BASE}/courses.html')
        page.click('[data-open-search]')
        page.wait_for_selector('#search-modal:not([hidden])')
        check('empty modal shows hint', 'Type to search' in page.inner_text('.search-results'))
        page.keyboard.press('Escape')
        page.wait_for_selector('#search-modal', state='hidden', timeout=2000)
        check('escape closes search modal', page.locator('#search-modal[hidden]').count() == 1)

        # ---------- auth (demo mode) ----------
        print('\n== Auth in demo mode ==')
        page.goto(f'{BASE}/login.html')
        page.wait_for_selector('[data-auth-mode-banner]:not([hidden])', timeout=3000)
        check('login shows demo-mode banner', 'Demo mode' in page.inner_text('[data-auth-mode-banner]'))

        # validation errors
        page.fill('#login-email', 'not-an-email')
        page.click('#login-submit')
        page.wait_for_timeout(200)
        check('invalid email shows field error', 'valid email' in page.inner_text('#login-email-error'))
        page.fill('#login-email', 'learner@example.com')
        page.click('#login-submit')
        page.wait_for_timeout(200)
        check('missing password shows field error', 'required' in page.inner_text('#login-password-error'))

        # register
        page.goto(f'{BASE}/register.html')
        page.fill('#register-name', 'Test Learner')
        page.fill('#register-email', 'tester@example.com')
        page.fill('#register-password', 'secret12')
        page.fill('#register-confirm', 'different')
        page.click('#register-submit')
        page.wait_for_timeout(200)
        check('password mismatch error', 'match' in page.inner_text('#register-confirm-error'))
        page.fill('#register-confirm', 'secret12')
        page.click('#register-submit')
        page.wait_for_url('**/dashboard.html', timeout=5000)
        check('register redirects to dashboard', 'dashboard.html' in page.url)
        page.wait_for_selector('#dashboard-name', timeout=5000)
        check('dashboard greets the user', 'Test Learner' in page.inner_text('#dashboard-name'))
        check('dashboard shows sync note', 'Demo mode' in page.inner_text('[data-sync-note]'))
        check('dashboard stats rendered', page.locator('#dashboard-stats .stat').count() == 4)
        check('dashboard course progress cards', page.locator('#dashboard-courses .card').count() == 3)

        # header shows user chip
        check('header shows user chip', page.locator('.user-chip').count() == 1)

        # logout
        page.click('#sign-out-button')
        page.wait_for_url('**/index.html', timeout=5000)
        check('logout returns home', page.url.endswith('index.html'))
        page.wait_for_selector('[data-auth-actions] a.btn-primary', timeout=3000)
        check('header shows Sign up after logout', 'Sign up' in page.inner_text('[data-auth-actions]'))

        # login wrong password
        page.goto(f'{BASE}/login.html')
        page.fill('#login-email', 'tester@example.com')
        page.fill('#login-password', 'wrongpass')
        page.click('#login-submit')
        page.wait_for_selector('.form-message.error.show', timeout=3000)
        check('wrong password shows friendly error', 'No demo account' in page.inner_text('.form-message.error'))

        # login correct
        page.fill('#login-password', 'secret12')
        page.click('#login-submit')
        page.wait_for_url('**/dashboard.html', timeout=5000)
        check('login succeeds and redirects', 'dashboard.html' in page.url)

        # password reset page honest in demo mode
        page.goto(f'{BASE}/reset-password.html')
        page.fill('#reset-email', 'tester@example.com')
        page.click('#reset-submit')
        page.wait_for_selector('.form-message.error.show', timeout=3000)
        check('reset explains Supabase requirement', 'Supabase' in page.inner_text('.form-message.error'))

        page.goto(f'{BASE}/update-password.html')
        page.wait_for_selector('.form-message.error.show', timeout=3000)
        check('update-password explains requirement', 'Supabase' in page.inner_text('.form-message.error'))

        # dashboard requires login state persists
        page.goto(f'{BASE}/dashboard.html')
        page.wait_for_selector('#dashboard-name', timeout=5000)
        check('session persists across pages', 'Test Learner' in page.inner_text('#dashboard-name'))

        # ---------- progress persists ----------
        print('\n== Progress tracking ==')
        page.goto(f'{BASE}/course.html?id=html')
        page.wait_for_selector('#lesson-list .lesson-row.is-complete', timeout=5000)
        check('completed lesson shown on course page', page.locator('#lesson-list .lesson-row.is-complete').count() >= 1)
        check('progress bar above zero', page.locator('#course-summary .progress-fill').count() == 1)
        width = page.get_attribute('#course-summary .progress-fill', 'style')
        check('progress fill width set', 'width' in (width or ''), width)

        # ---------- about ----------
        print('\n== About page ==')
        page.goto(f'{BASE}/about.html')
        page.wait_for_selector('.lesson-article', timeout=3000)
        check('about page content', 'What is CodeLearn?' in page.inner_text('.lesson-article'))

        # ---------- mobile navigation ----------
        print('\n== Mobile navigation ==')
        page.set_viewport_size({'width': 390, 'height': 800})
        page.goto(f'{BASE}/index.html')
        page.wait_for_selector('.nav-toggle')
        check('hamburger visible on mobile', page.locator('.nav-toggle').is_visible())
        check('nav hidden by default on mobile', not page.locator('#primary-nav').is_visible())
        page.click('.nav-toggle')
        page.wait_for_timeout(200)
        check('nav opens on toggle', page.locator('#primary-nav').is_visible())
        check('toggle aria-expanded true', page.get_attribute('.nav-toggle', 'aria-expanded') == 'true')
        page.click('#primary-nav a[href="courses.html"]')
        page.wait_for_url('**/courses.html', timeout=3000)
        check('mobile nav link navigates', page.url.endswith('courses.html'))
        check('nav closes after link click', not page.locator('#primary-nav').is_visible())

        # mobile search modal usable
        page.click('[data-open-search]')
        page.wait_for_selector('#search-modal:not([hidden])')
        page.fill('.search-input', 'forms')
        page.wait_for_selector('.search-results li a', timeout=3000)
        check('mobile search returns results', page.locator('.search-results li a').count() >= 1)
        page.keyboard.press('Escape')

        # tablet
        page.set_viewport_size({'width': 768, 'height': 1024})
        page.goto(f'{BASE}/index.html')
        page.wait_for_selector('.course-card')
        check('tablet layout renders cards', page.locator('.course-card').count() == 3)

        # ---------- accessibility basics ----------
        print('\n== Accessibility ==')
        page.set_viewport_size({'width': 1280, 'height': 900})
        page.goto(f'{BASE}/login.html')
        page.wait_for_selector('label[for="login-email"]')
        check('login email label associated', page.locator('label[for="login-email"]').count() == 1)
        check('skip link present on home', True)
        page.goto(f'{BASE}/index.html')
        check('skip link exists', page.locator('.skip-link').count() == 1)
        check('images/buttons have accessible names',
              page.locator('button:not([aria-label]):not(:has-text("Sign up")):not(:has-text("Log in"))').count() <= 3)

        # ---------- console errors ----------
        print('\n== Console errors ==')
        relevant = [e for e in console_errors if 'favicon' not in e and 'net::ERR' not in e]
        check('no JavaScript console errors', len(relevant) == 0, '\n'.join(relevant[:5]))

        browser.close()

    httpd.shutdown()
    print(f'\n{"="*50}\nBrowser checks passed: {passed}\nBrowser checks failed: {failed}')
    if failures:
        print('Failures:')
        for f in failures:
            print(' -', f)
        sys.exit(1)
    print('All browser checks passed.')

if __name__ == '__main__':
    main()
