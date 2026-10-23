#!/usr/bin/env node
/**
 * tests/validate.mjs — automated checks for the CodeLearn project.
 *
 * Run with:  node tests/validate.mjs   (or: npm test)
 *
 * It verifies everything that can be verified without a browser:
 *   1. every JavaScript file parses
 *   2. the content database is well formed and consistent
 *   3. every exercise is solvable and scores 100 with the reference answers
 *   4. every code-question reference solution passes its own tests/checks
 *   5. search finds the lessons you would expect
 *   6. progress storage math is correct
 *   7. every local link and script in every HTML page points to a real file
 *   8. page URLs with ?course= / ?id= parameters reference real content
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { COURSES, ALL_LESSONS, ALL_EXERCISES, PROJECTS, getCourse, getLesson, getProject, LESSON_COUNT, EXERCISE_COUNT } from '../js/data.js';
import { gradeExercise, gradeCode, referenceAnswers, normalizeAnswer, passingScore } from '../js/grading.js';
import { searchLessons, highlightTerms, buildIndex } from '../js/search.js';
import {
  emptyProgress,
  recordExerciseScore,
  completeLesson,
  loadProgress,
  getBestScore,
  mergeProgress,
} from '../js/storage.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

let passed = 0;
let failed = 0;
const failures = [];

function check(name, condition, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`  ok    ${name}`);
  } else {
    failed += 1;
    failures.push({ name, detail });
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function section(title) {
  console.log(`\n== ${title} ==`);
}

/* ---------------- 1. syntax ---------------- */
section('JavaScript syntax');

const jsFiles = [];
function collectJs(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectJs(full);
    else if (entry.endsWith('.js') || entry.endsWith('.mjs')) jsFiles.push(full);
  }
}
collectJs(ROOT);

for (const file of jsFiles) {
  if (file.includes('node_modules')) continue;
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  check(`parses ${file.replace(ROOT + '/', '')}`, result.status === 0, result.stderr.trim());
}

/* ---------------- 2. data integrity ---------------- */
section('Content database');

check('at least 3 courses', COURSES.length >= 3, `found ${COURSES.length}`);
check('lesson count matches data', LESSON_COUNT === ALL_LESSONS.length);
check('exercise count matches data', EXERCISE_COUNT === ALL_EXERCISES.length);

const courseIds = new Set();
for (const course of COURSES) {
  check(`course "${course.id}" has required fields`,
    Boolean(course.id && course.title && course.description && course.lessons?.length),
    JSON.stringify(course.id));
  check(`course id "${course.id}" is unique`, !courseIds.has(course.id));
  courseIds.add(course.id);
  check(`course "${course.id}" has a long description`, Boolean(course.longDescription));
}

const lessonIds = new Set();
const exerciseIds = new Set();
for (const lesson of ALL_LESSONS) {
  check(`lesson "${lesson.id}" has unique id`, !lessonIds.has(lesson.id));
  lessonIds.add(lesson.id);

  check(`lesson "${lesson.id}" has title/summary/content`,
    Boolean(lesson.title && lesson.summary && lesson.content && lesson.content.length > 100));
  check(`lesson "${lesson.id}" has a demo`, Boolean(lesson.demo && lesson.demo.type));
  check(`lesson "${lesson.id}" has an exercise`, Boolean(lesson.exercise));

  const exercise = lesson.exercise;
  check(`exercise "${exercise.id}" has unique id`, !exerciseIds.has(exercise.id));
  exerciseIds.add(exercise.id);
  check(`exercise "${exercise.id}" has questions`, exercise.questions?.length >= 2);
}

/* ---------------- 2b. lesson guides & projects ---------------- */
section('Lesson guides and projects');

for (const lesson of ALL_LESSONS) {
  check(`lesson "${lesson.id}" has learning objectives`,
    Array.isArray(lesson.objectives) && lesson.objectives.length >= 2);
  check(`lesson "${lesson.id}" has practical tasks`,
    Array.isArray(lesson.tasks) && lesson.tasks.length >= 2);
  check(`lesson "${lesson.id}" has a summary`,
    Array.isArray(lesson.takeaways) && lesson.takeaways.length >= 2);
  check(`lesson "${lesson.id}" order is a positive number`,
    Number.isInteger(lesson.order) && lesson.order > 0);
}

check('at least 4 projects', PROJECTS.length >= 4, `found ${PROJECTS.length}`);
const projectIds = new Set();
for (const project of PROJECTS) {
  check(`project "${project.id}" has a unique id`, !projectIds.has(project.id));
  projectIds.add(project.id);
  check(`project "${project.id}" has required fields`,
    Boolean(project.title && project.summary && project.overview && project.level));
  check(`project "${project.id}" has requirements`,
    Array.isArray(project.requirements) && project.requirements.length >= 3);
  check(`project "${project.id}" has steps`,
    Array.isArray(project.steps) && project.steps.length >= 3);
  check(`project "${project.id}" has completion criteria`,
    Array.isArray(project.completionCriteria) && project.completionCriteria.length >= 3);
  check(`project "${project.id}" is retrievable`, Boolean(getProject(project.id)));
}

check('every course has at least 6 lessons',
  COURSES.every((course) => course.lessons.length >= 6));

/* ---------------- 3. exercise grading ---------------- */
section('Exercise grading');

for (const exercise of ALL_EXERCISES) {
  const reference = referenceAnswers(exercise);
  const grade = gradeExercise(exercise, reference);
  check(`${exercise.id}: reference answers score 100`,
    grade.score === 100 && grade.passed,
    `score=${grade.score} correct=${grade.correctCount}/${grade.total}`);

  const empty = gradeExercise(exercise, {});
  check(`${exercise.id}: empty answers do not pass`,
    empty.score < passingScore() && empty.passed === false,
    `score=${empty.score}`);

  const wrong = gradeExercise(exercise, wrongAnswers(exercise));
  check(`${exercise.id}: wrong answers do not pass`,
    wrong.score < 100 && wrong.passed === false,
    `score=${wrong.score}`);
}

function wrongAnswers(exercise) {
  const answers = {};
  exercise.questions.forEach((question, index) => {
    if (question.type === 'choice') answers[index] = -1;
    else if (question.type === 'fill') answers[index] = question.blanks.map(() => 'definitely-wrong');
    else answers[index] = 'not the solution';
  });
  return answers;
}

/* ---------------- 4. reference solutions ---------------- */
section('Code question solutions');

for (const exercise of ALL_EXERCISES) {
  for (const question of exercise.questions) {
    if (question.type !== 'code') continue;
    const result = gradeCode(question, question.solution);
    check(`${exercise.id}: reference solution passes`, result.correct,
      JSON.stringify(result.testResults));
  }
}

/* ---------------- 5. question shape ---------------- */
section('Question shapes');

for (const exercise of ALL_EXERCISES) {
  exercise.questions.forEach((question, index) => {
    const id = `${exercise.id}[${index}]`;
    check(`${id} has a prompt`, Boolean(question.prompt));
    check(`${id} has an explanation`, Boolean(question.explain));

    if (question.type === 'choice') {
      check(`${id} has >=2 options and a valid answer index`,
        question.options?.length >= 2 &&
        Number.isInteger(question.answer) &&
        question.answer >= 0 &&
        question.answer < question.options.length);
      check(`${id} options are unique`,
        new Set(question.options).size === question.options.length);
    }
    if (question.type === 'fill') {
      const blanks = (question.code.match(/___/g) || []).length;
      check(`${id} has one blank marker per blank`, blanks === question.blanks?.length,
        `markers=${blanks} blanks=${question.blanks?.length}`);
      check(`${id} blanks have accepted answers`,
        question.blanks?.every((blank) => blank.accepts?.length > 0));
    }
    if (question.type === 'code') {
      check(`${id} is a known code language`,
        ['javascript', 'html', 'css'].includes(question.language), question.language);
      if (question.language === 'javascript') {
        check(`${id} has tests with expected values`,
          question.tests?.length > 0 && question.tests.every((t) => t.expression && 'expected' in t));
      } else {
        check(`${id} has regex checks`,
          question.checks?.length > 0 && question.checks.every((c) => c.pattern && c.message));
        // Patterns must compile.
        for (const checkItem of question.checks || []) {
          try {
            new RegExp(checkItem.pattern, checkItem.flags || '');
            check(`${id} check pattern compiles`, true);
          } catch (error) {
            check(`${id} check pattern compiles`, false, error.message);
          }
        }
      }
      check(`${id} has a reference solution`, Boolean(question.solution));
    }
  });
}

/* ---------------- 6. search ---------------- */
section('Search');

check('search index covers every lesson', buildIndex().length === ALL_LESSONS.length);

const flex = searchLessons('flexbox');
check('search "flexbox" finds the Flexbox lesson',
  flex.length > 0 && flex[0].lessonId === 'css-4',
  flex.map((r) => r.lessonId).join(','));

const dom = searchLessons('querySelector');
check('search "querySelector" finds the DOM lesson',
  dom.some((r) => r.lessonId === 'js-7'));

const multi = searchLessons('css selectors');
check('multi-term search returns results', multi.length > 0);

check('empty query returns nothing', searchLessons('').length === 0);
check('unknown query returns nothing', searchLessons('zzzzqqqq').length === 0);

const highlighted = highlightTerms('Learn Flexbox layouts', 'flexbox');
check('highlight wraps matches in <mark>', highlighted.includes('<mark>Flexbox</mark>'));

const snippetSource = 'word '.repeat(100) + 'special needle here ' + 'word '.repeat(100);
const { makeSnippet } = await import('../js/search.js');
const snippet = makeSnippet(snippetSource, 'needle');
check('snippet is shorter than the body and contains the term',
  snippet.length < 250 && snippet.includes('needle'));

/* ---------------- 7. progress storage ---------------- */
section('Progress storage');

recordExerciseScore('ex-test-1', 40);
recordExerciseScore('ex-test-1', 80);
recordExerciseScore('ex-test-1', 60);
check('best score is kept across attempts', getBestScore('ex-test-1') === 80);
check('attempt count grows', loadProgress().scores['ex-test-1'].attempts === 3);
check('last score is the latest', loadProgress().scores['ex-test-1'].last === 60);

const firstTime = completeLesson('test-lesson-1');
check('completing a new lesson returns true', firstTime === true);
check('completing twice keeps one timestamp', completeLesson('test-lesson-1') === false);
check('completed lesson is listed', Boolean(loadProgress().completed['test-lesson-1']));

mergeProgress({
  completed: { 'remote-lesson': '2026-01-01T00:00:00.000Z', 'test-lesson-1': '2020-01-01T00:00:00.000Z' },
  scores: { 'ex-test-2': { best: 90, last: 90, attempts: 1 } },
});
const merged = loadProgress();
check('merge adds remote lessons', Boolean(merged.completed['remote-lesson']));
check('merge keeps the better local timestamp', merged.completed['test-lesson-1'] !== '2020-01-01T00:00:00.000Z');
check('merge adds remote scores', merged.scores['ex-test-2'].best === 90);
check('empty progress shape is valid', emptyProgress().completed && emptyProgress().scores);

/* ---------------- 8. HTML links and assets ---------------- */
section('HTML links and assets');

const htmlFiles = readdirSync(ROOT).filter((name) => name.endsWith('.html'));
const jsReferences = new Set();
const allLessonsById = new Map(ALL_LESSONS.map((lesson) => [lesson.id, lesson]));
const allExercisesByLesson = new Map(ALL_EXERCISES.map((ex) => [ex.lessonId, ex]));

for (const name of htmlFiles) {
  const html = readFileSync(join(ROOT, name), 'utf8');

  check(`${name} links style.css`, html.includes('href="style.css"'));
  check(`${name} loads script.js`, html.includes('src="script.js"'));
  check(`${name} has a data-page attribute`, /<body[^>]*data-page="/.test(html));
  check(`${name} has a nav toggle button`, html.includes('class="nav-toggle"'));
  check(`${name} has a search modal`, html.includes('id="search-modal"'));
  check(`${name} has a toast region`, html.includes('class="toast-region"'));

  // local href / src targets
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|data:|#|\/)/.test(ref)) continue;
    const [path, query] = ref.split('?');
    jsReferences.add(path);

    if (path.endsWith('.html')) {
      check(`${name} → ${path} exists`, existsSync(join(ROOT, path)));
    } else {
      check(`${name} → ${path} exists`, existsSync(join(ROOT, path)));
    }

    // Validate query parameters against the content database.
    if (query && path === 'course.html') {
      const id = new URLSearchParams(query).get('id');
      check(`${name}: course link id "${id}" is real`, Boolean(getCourse(id)));
    }
    if (query && (path === 'lesson.html' || path === 'exercise.html')) {
      const params = new URLSearchParams(query);
      const courseId = params.get('course');
      const lessonId = params.get('id');
      const lesson = getLesson(courseId, lessonId);
      check(`${name}: lesson link ${lessonId} in ${courseId} is real`, Boolean(lesson));
      if (path === 'exercise.html' && lesson) {
        check(`${name}: lesson ${lessonId} has an exercise`, Boolean(allExercisesByLesson.get(lessonId)));
      }
    }
  }

  // No placeholder links left behind.
  check(`${name} has no href="#" dead links`, !/href="#"/.test(html));
  check(`${name} has no TODO markers`, !/TODO|FIXME|lorem ipsum/i.test(html));
}

/* Every module referenced from script.js must exist. */
const scriptSource = readFileSync(join(ROOT, 'script.js'), 'utf8');
const moduleRefs = [...scriptSource.matchAll(/import\('([^']+)'\)/g)].map((match) => match[1]);
for (const ref of moduleRefs) {
  check(`script.js → ${ref} exists`, existsSync(join(ROOT, ref)));
}

/* Every relative import inside js/ must resolve. */
function checkImportsIn(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      checkImportsIn(full);
      continue;
    }
    if (!entry.endsWith('.js')) continue;
    const source = readFileSync(full, 'utf8');
    const imports = [...source.matchAll(/from\s+'([^']+)'/g)].map((match) => match[1]);
    for (const spec of imports) {
      if (spec.startsWith('.')) {
        const target = join(dir, spec);
        check(`${full.replace(ROOT + '/', '')} → ${spec} exists`, existsSync(target));
      }
    }
  }
}
checkImportsIn(join(ROOT, 'js'));

/* config.js must never contain a real secret — only comments about them. */
function stripJsComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}
const configSource = stripJsComments(readFileSync(join(ROOT, 'config.js'), 'utf8'));
check('config.js contains no service_role key', !/service_role/i.test(configSource));
check('config.js contains no JWT secret', !/eyJ[A-Za-z0-9_-]{20,}/.test(configSource));

/* Other frontend files must never reference secrets at all. */
for (const file of jsFiles) {
  const relative = file.replace(ROOT + '/', '');
  if (relative.startsWith('node_modules/')) continue;
  if (relative.startsWith('tests/')) continue;

  const source = readFileSync(file, 'utf8');
  if (relative === 'config.js') continue;

  check(
    `${relative} has no service_role reference`,
    !/service_role/i.test(source)
  );
}

/* ---------------- report ---------------- */
console.log(`\n${'='.repeat(50)}`);
console.log(`Checks passed: ${passed}`);
console.log(`Checks failed: ${failed}`);
if (failed > 0) {
  console.log('\nFailures:');
  for (const failure of failures) {
    console.log(` - ${failure.name}${failure.detail ? ` (${failure.detail})` : ''}`);
  }
  process.exitCode = 1;
} else {
  console.log('All checks passed.');
}
