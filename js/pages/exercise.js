/**
 * pages/exercise.js — interactive exercise: questions, checking,
 * feedback, scoring, retry and progress saving.
 */

import { el, must, getParam, showToast, escapeHtml } from '../ui.js';
import { getLesson } from '../data.js';
import { gradeExercise, passingScore } from '../grading.js';
import { getBestScore, saveExerciseScore } from '../progress.js';

let course = null;
let lesson = null;
let exercise = null;
let submitted = false;

export async function init() {
  const found = getLesson(getParam('course'), getParam('id'));
  if (!found || !found.lesson.exercise) {
    renderNotFound();
    return;
  }

  course = found.course;
  lesson = found.lesson;
  exercise = lesson.exercise;
  document.title = `${exercise.title} · CodeLearn`;

  must('#exercise-form').addEventListener('submit', onSubmit);

  renderHeader();
  renderQuestions();
  renderFooter();
}

/* ---------------- header ---------------- */

function renderHeader() {
  const header = must('#exercise-header');
  header.innerHTML = '';
  header.append(
    el('p', {
      className: 'breadcrumb',
      html: `<a href="courses.html">Courses</a> <span>/</span> <a href="course.html?id=${course.id}">${course.shortTitle}</a> <span>/</span> <a href="lesson.html?course=${course.id}&id=${lesson.id}">${escapeHtml(lesson.title)}</a>`,
    }),
    el('h1', { text: exercise.title }),
    el('p', {
      className: 'muted',
      text: `${exercise.questions.length} questions · pass mark ${passingScore()}% · best score ${getBestScore(exercise.id)}%`,
    }),
  );
}

/* ---------------- questions ---------------- */

function renderQuestions() {
  const form = must('#exercise-form');
  form.innerHTML = '';

  exercise.questions.forEach((question, index) => {
    form.append(renderQuestion(question, index));
  });
}

function renderQuestion(question, index) {
  const card = el('fieldset', { className: 'question', attrs: { 'aria-labelledby': `q${index}-prompt` } });
  card.append(
    el('legend', {
      className: 'visually-hidden',
      text: `Question ${index + 1}: ${stripHtml(question.prompt)}`,
    }),
    el('p', {
      className: 'question-prompt',
      id: `q${index}-prompt`,
      html: `<span class="question-number">${index + 1}</span>${question.prompt}<span class="question-type">${typeLabel(question.type)}</span>`,
    })
  );

  if (question.type === 'choice') card.append(renderChoices(question, index));
  if (question.type === 'fill') card.append(renderFill(question, index));
  if (question.type === 'code') card.append(renderCode(question, index));

  card.append(el('div', { className: 'question-feedback', attrs: { id: `feedback-${index}`, role: 'status' } }));
  return card;
}

function typeLabel(type) {
  return { choice: 'Multiple choice', fill: 'Fill in the blank', code: 'Write code' }[type] || type;
}

function renderChoices(question, index) {
  const group = el('div', { className: 'choices', attrs: { role: 'radiogroup', 'aria-label': `Question ${index + 1}` } });

  question.options.forEach((option, optionIndex) => {
    const input = el('input', {
      attrs: {
        type: 'radio',
        name: `q${index}`,
        value: String(optionIndex),
        id: `q${index}-opt${optionIndex}`,
      },
    });
    const label = el('label', { className: 'choice', attrs: { for: `q${index}-opt${optionIndex}` } }, [
      input,
      el('span', { html: option }),
    ]);
    group.append(label);
  });

  return group;
}

function renderFill(question, index) {
  const holder = el('div', { className: 'fill-code' });
  const parts = question.code.split('___');

  parts.forEach((part, partIndex) => {
    // Keep line breaks visible inside the code block.
    for (const [lineIndex, line] of part.split('\n').entries()) {
      if (lineIndex > 0) holder.append(document.createElement('br'));
      holder.append(document.createTextNode(line));
    }
    if (partIndex < parts.length - 1) {
      const input = el('input', {
        className: 'blank-input',
        attrs: {
          type: 'text',
          name: `q${index}-blank${partIndex}`,
          'aria-label': `Blank ${partIndex + 1} of question ${index + 1}`,
          autocomplete: 'off',
          spellcheck: 'false',
        },
      });
      holder.append(input);
    }
  });

  return holder;
}

function renderCode(question, index) {
  const wrap = el('div');
  const textarea = el('textarea', {
    className: 'code-editor',
    attrs: {
      name: `q${index}-code`,
      'aria-label': `Code editor for question ${index + 1}`,
      spellcheck: 'false',
      rows: '8',
    },
  });
  textarea.value = question.starter || '';
  enableTabKey(textarea);

  const tests = el('ul', { className: 'test-results', attrs: { id: `tests-${index}` } });

  const hint = el('p', {
    className: 'field-hint',
    html: question.language === 'javascript'
      ? 'Write plain JavaScript — the checker runs your function and compares the results.'
      : 'Write HTML (or CSS) and the checker will look for the required pieces.',
  });

  wrap.append(textarea, hint, tests);
  return wrap;
}

/* ---------------- checking + feedback ---------------- */

function collectAnswers() {
  const answers = {};

  exercise.questions.forEach((question, index) => {
    if (question.type === 'choice') {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      answers[index] = selected ? Number(selected.value) : undefined;
    } else if (question.type === 'fill') {
      answers[index] = question.blanks.map((_, blankIndex) => {
        const input = document.querySelector(`input[name="q${index}-blank${blankIndex}"]`);
        return input ? input.value : '';
      });
    } else if (question.type === 'code') {
      const textarea = document.querySelector(`textarea[name="q${index}-code"]`);
      answers[index] = textarea ? textarea.value : '';
    }
  });

  return answers;
}

function showResults(grade) {
  grade.results.forEach((result) => {
    const question = result.question;
    const feedback = document.getElementById(`feedback-${result.index}`);

    feedback.className = `question-feedback show ${result.correct ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = result.correct
      ? `<strong>Correct.</strong> ${result.feedback}`
      : `<strong>Not correct.</strong> ${result.feedback}`;

    if (question.type === 'choice') {
      const labels = document.querySelectorAll(`#exercise-form .question:nth-of-type(${result.index + 1}) .choice`);
      const chosen = collectAnswers()[result.index];
      labels.forEach((label, optionIndex) => {
        label.classList.remove('is-correct', 'is-wrong');
        if (optionIndex === Number(question.answer)) label.classList.add('is-correct');
        if (optionIndex === Number(chosen) && !result.correct) label.classList.add('is-wrong');
      });
    }

    if (question.type === 'fill') {
      const answers = collectAnswers()[result.index] || [];
      question.blanks.forEach((blank, blankIndex) => {
        const input = document.querySelector(`input[name="q${result.index}-blank${blankIndex}"]`);
        if (!input) return;
        const accepted = blank.accepts.map((value) => value.trim().toLowerCase());
        const given = String(answers[blankIndex] || '').trim().toLowerCase();
        input.classList.remove('is-correct', 'is-wrong');
        input.classList.add(accepted.includes(given) ? 'is-correct' : 'is-wrong');
      });
    }

    if (question.type === 'code') {
      const list = document.getElementById(`tests-${result.index}`);
      list.innerHTML = '';
      list.classList.add('show');
      for (const test of result.testResults || []) {
        list.append(el('li', {
          className: test.pass ? 'pass' : 'fail',
          text: `${test.pass ? '✔' : '✘'} ${test.label}${test.pass ? '' : ` — expected ${test.expected}, got ${test.actual}`}`,
        }));
      }
    }
  });
}

function showSummary(grade) {
  const summary = must('#exercise-summary');
  const passed = grade.passed;
  const tone = grade.score >= 90 ? 'good' : passed ? 'ok' : 'bad';

  summary.innerHTML = '';
  summary.append(
    el('div', { className: 'score-summary' }, [
      el('p', { className: 'muted', text: 'Your score', attrs: { style: 'margin:0' } }),
      el('p', { className: `score-big ${tone}`, text: `${grade.score}%` }),
      el('p', {
        text: passed
          ? `Passed! You answered ${grade.correctCount} of ${grade.total} questions correctly.`
          : `You answered ${grade.correctCount} of ${grade.total} questions correctly. You need ${passingScore()}% to pass — review the lesson and try again.`,
      }),
    ]),
    el('div', { className: 'demo-actions' }, [
      el('button', { className: 'btn btn-outline', text: 'Retry exercise', attrs: { type: 'button', id: 'retry-button' } }),
      el('a', { className: 'btn btn-ghost', text: 'Back to lesson', attrs: { href: `lesson.html?course=${course.id}&id=${lesson.id}` } }),
    ])
  );

  document.getElementById('retry-button').addEventListener('click', () => {
    submitted = false;
    renderQuestions();
    renderFooter();
    document.getElementById('exercise-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function renderFooter() {
  const footer = must('#exercise-footer');
  footer.innerHTML = '';

  const checkButton = el('button', {
    className: 'btn btn-primary btn-lg',
    text: 'Check my answers',
    attrs: { type: 'submit', form: 'exercise-form' },
  });

  const hint = el('p', { className: 'muted', text: 'You can retry as often as you like — only your best score is kept.', attrs: { style: 'margin:0' } });
  footer.append(checkButton, hint);
}

function onSubmit(event) {
  event.preventDefault();
  if (submitted) return;

  const answers = collectAnswers();

  // Warn before checking if any question is completely empty.
  const unanswered = exercise.questions.filter((question, index) => {
    const answer = answers[index];
    if (question.type === 'choice') return answer == null;
    if (question.type === 'fill') return (answer || []).every((value) => !value.trim());
    return !String(answer || '').trim();
  }).length;

  if (unanswered === exercise.questions.length) {
    showToast('Answer at least one question before checking.', 'error');
    return;
  }

  submitted = true;
  const grade = gradeExercise(exercise, answers);
  showResults(grade);
  showSummary(grade);

  saveExerciseScore(exercise.id, course.id, lesson.id, grade.score)
    .then(() => {
      if (grade.passed) {
        showToast(`Excellent! Score saved: ${grade.score}%`, 'success');
      } else {
        showToast(`Score saved: ${grade.score}% — retry when ready.`);
      }
    })
    .catch((error) => {
      console.error(error);
      showToast('Your score could not be saved, but you can keep practising.', 'error');
    });

  document.getElementById('exercise-summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function enableTabKey(textarea) {
  textarea.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = textarea.value.slice(0, start) + '  ' + textarea.value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + 2;
  });
}

function stripHtml(html) {
  return String(html || '').replace(/<[^>]*>/g, '');
}

function renderNotFound() {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.append(
    el('div', { className: 'container section' }, [
      el('div', { className: 'empty-state' }, [
        el('h2', { text: 'Exercise not found' }),
        el('p', { text: 'That exercise does not exist. Pick one from the exercises page.' }),
        el('a', { className: 'btn btn-primary', text: 'All exercises', attrs: { href: 'exercises.html' } }),
      ]),
    ])
  );
  showToast('Exercise not found.', 'error');
}

// Submit wiring happens in init() once the form has been rendered.
