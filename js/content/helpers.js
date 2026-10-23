/**
 * helpers.js — tiny constructors shared by the expanded course content.
 *
 * Keeping the question shapes here makes the lesson files focused on the
 * teaching material while still producing plain data objects that the
 * existing grader understands.
 */

/** Multiple-choice question. `code` is optional code shown above the options. */
export function choice(prompt, options, answer, explain, code) {
  const question = { type: 'choice', prompt, options, answer, explain };
  if (code) question.code = code;
  return question;
}

/**
 * Fill-in-the-blank question.
 * `accepts` is an array with one array of accepted answers per blank.
 */
export function fill(prompt, code, accepts, explain) {
  return {
    type: 'fill',
    prompt,
    code,
    blanks: accepts.map((answers) => ({ accepts: [].concat(answers) })),
    explain,
  };
}

/** JavaScript "write code" question graded by expression tests. */
export function jsCode(prompt, starter, tests, solution, explain) {
  return { type: 'code', language: 'javascript', prompt, starter, tests, solution, explain };
}

/** HTML "write code" question graded by regular-expression checks. */
export function htmlCode(prompt, starter, checks, solution, explain) {
  return { type: 'code', language: 'html', prompt, starter, checks, solution, explain };
}

/** CSS "write code" question graded by regular-expression checks. */
export function cssCode(prompt, starter, checks, solution, explain) {
  return { type: 'code', language: 'css', prompt, starter, checks, solution, explain };
}

/**
 * Wrap a list of questions in the exercise shape used by every lesson.
 * The exercise id always follows the existing `ex-<lessonId>` convention so
 * local progress and Supabase sync keep working without schema changes.
 */
export function exerciseFor(lessonId, title, questions) {
  return {
    id: `ex-${lessonId}`,
    title: `Exercise: ${title}`,
    questions,
  };
}
