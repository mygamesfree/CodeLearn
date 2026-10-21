/**
 * grading.js — exercise scoring engine.
 *
 * Pure functions with no DOM access, so the same logic runs in the browser
 * and in the Node validation tests (tests/validate.mjs).
 */

/**
 * Normalise an answer before comparing: trim, collapse spaces, lowercase.
 * Students can type with different spacing or capitalisation and still pass.
 */
export function normalizeAnswer(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/** Grade a single multiple-choice question. `answer` is the chosen index. */
export function gradeChoice(question, answerIndex) {
  const correct = Number(answerIndex) === Number(question.answer);
  return {
    correct,
    feedback: correct ? question.explain : `Not quite. ${stripTags(question.explain)}`,
  };
}

/** Grade a fill-in-the-blank question. `answers` is an array of strings. */
export function gradeFill(question, answers = []) {
  const given = [].concat(answers);
  let allCorrect = true;

  question.blanks.forEach((blank, index) => {
    const userAnswer = normalizeAnswer(given[index]);
    const accepted = blank.accepts.map(normalizeAnswer);
    if (!accepted.includes(userAnswer)) allCorrect = false;
  });

  return {
    correct: allCorrect,
    feedback: allCorrect
      ? question.explain
      : `Not quite. ${stripTags(question.explain)}`,
  };
}

/**
 * Grade a "write code" question.
 *  - JavaScript questions run their `tests` (expression vs expected value).
 *  - HTML/CSS questions are matched against regular-expression `checks`.
 */
export function gradeCode(question, userCode = '') {
  const code = String(userCode).trim();

  if (!code) {
    return {
      correct: false,
      feedback: 'Write some code before checking your answer.',
      testResults: [],
    };
  }

  if (question.language === 'javascript') {
    return gradeJavaScriptTests(question, code);
  }
  return gradePatternChecks(question, code);
}

function gradeJavaScriptTests(question, code) {
  const testResults = [];

  for (const test of question.tests || []) {
    try {
      // Run the student code, then evaluate the test expression.
      // "use strict" + new Function keeps everything inside one scope.
      const run = new Function(`"use strict";\n${code}\nreturn (${test.expression});`);
      const actual = run();
      testResults.push({
        label: test.label,
        pass: deepEqual(actual, test.expected),
        expected: stringify(test.expected),
        actual: stringify(actual),
      });
    } catch (error) {
      testResults.push({
        label: test.label,
        pass: false,
        expected: stringify(test.expected),
        actual: `Error: ${error.message}`,
      });
    }
  }

  const correct = testResults.length > 0 && testResults.every((result) => result.pass);
  return {
    correct,
    testResults,
    feedback: correct
      ? question.explain
      : 'Some tests failed — read the list above and adjust your code.',
  };
}

function gradePatternChecks(question, code) {
  const testResults = [];

  for (const check of question.checks || []) {
    let pass;
    try {
      const regex = new RegExp(check.pattern, check.flags || '');
      pass = regex.test(code);
      if (check.not) pass = !pass;
    } catch (error) {
      pass = false;
    }
    testResults.push({ label: check.message, pass });
  }

  const correct = testResults.length > 0 && testResults.every((result) => result.pass);
  return {
    correct,
    testResults,
    feedback: correct ? question.explain : 'Some checks failed — read the list above and try again.',
  };
}

/**
 * Grade a whole exercise.
 * `answers` shape:
 *   choice -> answers[questionIndex] = number (chosen option)
 *   fill   -> answers[questionIndex] = [string, string, …]
 *   code   -> answers[questionIndex] = "source code"
 */
export function gradeExercise(exercise, answers = {}) {
  const results = exercise.questions.map((question, index) => {
    const answer = answers[index];
    const grade = gradeQuestion(question, answer);
    return { index, question, ...grade };
  });

  const correctCount = results.filter((result) => result.correct).length;
  const total = results.length;
  const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return { results, correctCount, total, score, passed: score >= passingScore(exercise) };
}

/** Grade one question based on its type. */
export function gradeQuestion(question, answer) {
  switch (question.type) {
    case 'choice':
      return gradeChoice(question, answer);
    case 'fill':
      return gradeFill(question, answer);
    case 'code':
      return gradeCode(question, answer);
    default:
      return { correct: false, feedback: `Unknown question type: ${question.type}` };
  }
}

/** Score needed (out of 100) to pass an exercise and complete the lesson. */
export function passingScore() {
  return 70;
}

/** Remove HTML tags from explanation text used as plain-text feedback. */
function stripTags(html) {
  return String(html || '').replace(/<[^>]*>/g, '');
}

/** Compare two values deeply (arrays and plain objects included). */
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== 'object') return Number.isNaN(a) && Number.isNaN(b);
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => deepEqual(a[key], b[key]));
}

function stringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/**
 * Build the reference answers for an exercise (used by automated tests
 * to prove that every exercise is solvable and scores 100).
 */
export function referenceAnswers(exercise) {
  const answers = {};
  exercise.questions.forEach((question, index) => {
    if (question.type === 'choice') {
      answers[index] = question.answer;
    } else if (question.type === 'fill') {
      answers[index] = question.blanks.map((blank) => blank.accepts[0]);
    } else if (question.type === 'code') {
      answers[index] = question.solution;
    }
  });
  return answers;
}
