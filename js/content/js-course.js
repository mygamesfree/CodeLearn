/**
 * js-course.js — expanded JavaScript curriculum.
 *
 * The existing ten lessons stay in place. These additions split the larger
 * topics into focused lessons and finish with two guided project lessons.
 */

import { choice, fill, jsCode, exerciseFor } from './helpers.js';

export const JS_MODULES = [
  {
    id: 'js-m1',
    title: 'Variables, Types and Operators',
    description: 'Store values safely and understand how JavaScript performs calculations.',
    lessonIds: ['js-1', 'js-2'],
  },
  {
    id: 'js-m2',
    title: 'Conditions and Loops',
    description: 'Make decisions and repeat work without duplicating code.',
    lessonIds: ['js-3', 'js-4'],
  },
  {
    id: 'js-m3',
    title: 'Functions and Scope',
    description: 'Build reusable behaviour and understand where variables live.',
    lessonIds: ['js-5', 'js-11', 'js-12'],
  },
  {
    id: 'js-m4',
    title: 'Arrays and Objects',
    description: 'Model collections and records, then read and update them safely.',
    lessonIds: ['js-6', 'js-13'],
  },
  {
    id: 'js-m5',
    title: 'Strings and Array Methods',
    description: 'Transform text and data with the methods used in real applications.',
    lessonIds: ['js-14', 'js-15'],
  },
  {
    id: 'js-m6',
    title: 'DOM Selection and Manipulation',
    description: 'Find elements, change the page and understand the DOM from JavaScript.',
    lessonIds: ['js-7', 'js-16', 'js-17'],
  },
  {
    id: 'js-m7',
    title: 'Events and Form Validation',
    description: 'Respond to users and validate input before it reaches your data.',
    lessonIds: ['js-18', 'js-19'],
  },
  {
    id: 'js-m8',
    title: 'Debugging and Error Handling',
    description: 'Find bugs systematically and fail gracefully.',
    lessonIds: ['js-20'],
  },
  {
    id: 'js-m9',
    title: 'JSON, localStorage and Async JavaScript',
    description: 'Persist data and work with operations that finish later.',
    lessonIds: ['js-8', 'js-21'],
  },
  {
    id: 'js-m10',
    title: 'Fetch API Fundamentals',
    description: 'Request data from servers, handle HTTP errors and show loading states.',
    lessonIds: ['js-9', 'js-22'],
  },
  {
    id: 'js-m11',
    title: 'Complete Interactive Project',
    description: 'Build, test and refine a weather dashboard with real application patterns.',
    lessonIds: ['js-23', 'js-24'],
  },
  {
    id: 'js-m12',
    title: 'Classes, Modules and Clean Code',
    description: 'Organise larger programs into understandable pieces.',
    lessonIds: ['js-10'],
  },
];

export const JS_LESSONS = [
  {
    id: 'js-11',
    title: 'Functions in Depth',
    summary: 'Use parameters, defaults, rest arguments, return values and arrow functions well.',
    minutes: 15,
    content: `
<h2 id="forms">Three ways to write a function</h2>
<pre><code class="language-javascript">// Function declaration (hoisted)
function add(a, b) {
  return a + b;
}

// Function expression (not hoisted)
const subtract = function (a, b) {
  return a - b;
};

// Arrow function (concise, no own this)
const multiply = (a, b) => a * b;</code></pre>
<p>Prefer declarations for named, reusable behaviour and arrow functions for short callbacks. Arrow functions do not have their own <code>this</code>, which is helpful in array methods but surprising in object methods.</p>

<h2 id="parameters">Parameters and arguments</h2>
<pre><code class="language-javascript">function greet(name = 'friend') {
  return 'Hello, ' + name + '!';
}

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

greet();          // "Hello, friend!"
sum(1, 2, 3, 4);  // 10</code></pre>
<p>Default parameters apply when the argument is <code>undefined</code>. Rest parameters collect any number of arguments into a real array.</p>

<h2 id="return">Return values</h2>
<p>A function without a <code>return</code> returns <code>undefined</code>. A function stops at the first <code>return</code> it reaches. Return a value instead of logging it when other code needs the result.</p>
<pre><code class="language-javascript">function isAdult(age) {
  return age >= 18;
}

const label = isAdult(21) ? 'adult' : 'minor';</code></pre>

<h2 id="pure">Pure functions and side effects</h2>
<p>A <strong>pure function</strong> returns the same output for the same input and does not modify anything outside itself. Pure functions are easier to test and reason about.</p>
<pre><code class="language-javascript">// Pure
const area = (width, height) => width * height;

// Side effect: changes external state
let total = 0;
function addToTotal(value) {
  total += value;
}</code></pre>
<div class="note note-tip"><strong>One job per function</strong>If you need the word "and" to describe a function, consider splitting it. Small functions are easier to name, test and reuse.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Parameters, defaults and rest arguments',
      js: `function greet(name = 'friend') {
  return 'Hello, ' + name + '!';
}

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

const double = (n) => n * 2;

console.log(greet());
console.log(greet('Ada'));
console.log(sum(1, 2, 3, 4));
console.log(double(21));`,
    },
    objectives: [
      'Choose between function declarations, expressions and arrow functions.',
      'Use default, rest and normal parameters correctly.',
      'Write pure functions that return values instead of relying on globals.',
    ],
    tasks: [
      'Add a default value for the greeting name.',
      'Write a function that accepts any number of scores and returns their sum.',
      'Rewrite a small logging function to return its result instead.',
    ],
    takeaways: [
      'Declarations are hoisted; expressions and arrows are not.',
      'Arrow functions have no own this binding.',
      'Return values make functions composable and testable.',
    ],
    exercise: exerciseFor('js-11', 'functions in depth', [
      choice('Which function form is hoisted and can be called before its definition?', ['Arrow function', 'Function declaration', 'Function expression', 'Class method'], 1, 'Function declarations are hoisted with their body.'),
      fill('Return the sum from the function.', 'function add(a, b) {\n  ___ a + b;\n}', [['return']], 'Without return, the function would produce undefined.'),
      choice('What does an arrow function not have?', ['Parameters', 'A return value', 'Its own this binding', 'A name'], 2, 'Arrow functions inherit this from the surrounding scope.'),
      jsCode('Write a function double that returns a number multiplied by two.', '// write your function below\n', [
        { expression: 'double(4)', expected: 8 },
        { expression: 'double(-3)', expected: -6 },
        { expression: 'double(0)', expected: 0 },
      ], `function double(number) {\n  return number * 2;\n}`, 'Return the calculation so the caller can use the result.'),
      choice('What is a pure function?', ['A function with no parameters', 'A function that always returns the same output for the same input without side effects', 'A function written with arrow syntax', 'A function that logs to the console'], 1, 'Pure functions depend only on their inputs and do not mutate external state.'),
      choice('What does a function without a return statement produce?', ['null', '0', 'undefined', 'An error'], 2, 'A missing return produces undefined.'),
    ]),
  },

  {
    id: 'js-12',
    title: 'Scope, Closures and Hoisting',
    summary: 'Understand where variables live, how closures remember values and why var behaves differently.',
    minutes: 15,
    content: `
<h2 id="scope">Three kinds of scope</h2>
<ul>
  <li><strong>Global scope</strong> — accessible everywhere in the script.</li>
  <li><strong>Function scope</strong> — variables created inside a function.</li>
  <li><strong>Block scope</strong> — variables created inside <code>{ }</code> with <code>let</code> or <code>const</code>.</li>
</ul>
<pre><code class="language-javascript">let globalValue = 10;

function example() {
  let functionValue = 20;
  if (true) {
    let blockValue = 30;
    console.log(globalValue, functionValue, blockValue);
  }
  // blockValue is not available here
}</code></pre>

<h2 id="var">var versus let and const</h2>
<p><code>var</code> is function-scoped and hoisted with an initial value of <code>undefined</code>. <code>let</code> and <code>const</code> are block-scoped and hoisted but stay in a <strong>temporal dead zone</strong> until their declaration runs.</p>
<pre><code class="language-javascript">console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError
let b = 2;</code></pre>
<p>Use <code>const</code> by default, switch to <code>let</code> only when reassignment is necessary, and avoid <code>var</code> in new code.</p>

<h2 id="closures">Closures</h2>
<p>A <strong>closure</strong> is a function that remembers variables from the scope where it was created, even after that outer function has returned.</p>
<pre><code class="language-javascript">function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const next = makeCounter();
next(); // 1
next(); // 2
next(); // 3</code></pre>
<p>Closures power event handlers, module patterns, memoisation and private state. Each call to <code>makeCounter()</code> creates an independent <code>count</code>.</p>

<h2 id="hoisting">Hoisting in practice</h2>
<p>Function declarations are fully hoisted. Variable declarations are hoisted differently depending on the keyword. This is why calling a function before its declaration can work while reading a <code>let</code> too early throws an error.</p>
<div class="note note-warn"><strong>Common bug</strong>Creating listeners inside a loop with <code>var</code> can make every handler see the final value. Use <code>let</code> or create a function scope for each iteration.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Closures keep private state',
      js: `function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counterA = makeCounter();
const counterB = makeCounter();

console.log(counterA());
console.log(counterA());
console.log(counterB());

function makeGreeter(greeting) {
  return (name) => greeting + ', ' + name;
}

const sayHi = makeGreeter('Hi');
console.log(sayHi('Ada'));`,
    },
    objectives: [
      'Distinguish global, function and block scope.',
      'Explain the difference between var, let and const.',
      'Use closures to keep private state.',
    ],
    tasks: [
      'Create a closure that returns a function adding 10 to a number.',
      'Predict what a var loop handler logs before running it.',
      'Convert a var declaration to const and check for errors.',
    ],
    takeaways: [
      'let and const are block-scoped; var is function-scoped.',
      'Closures remember the environment in which they were created.',
      'Prefer const by default and avoid var in new code.',
    ],
    exercise: exerciseFor('js-12', 'scope and closures', [
      choice('Which variables are block-scoped?', ['var only', 'let and const', 'function declarations only', 'All variables'], 1, 'let and const are limited to the nearest block.'),
      choice('What is a closure?', ['A function without parameters', 'A function that remembers variables from its outer scope', 'A loop that never ends', 'A way to close the browser'], 1, 'Closures retain access to their lexical environment.'),
      fill('Keep the count private inside makeCounter.', 'function makeCounter() {\n  ___ count = 0;\n  return () => ++count;\n}', [['let']], 'let creates a block-scoped variable that the returned function can close over.'),
      choice('What happens when you read a let variable before its declaration?', ['It returns undefined', 'It throws a ReferenceError', 'It returns null', 'It creates a global'], 1, 'let and const are in the temporal dead zone until initialised.'),
      jsCode('Write makeAdder(n) that returns a function adding n to its argument.', '// write your function below\n', [
        { expression: 'makeAdder(5)(3)', expected: 8 },
        { expression: 'makeAdder(10)(-4)', expected: 6 },
      ], `function makeAdder(n) {\n  return function (value) {\n    return value + n;\n  };\n}`, 'The returned function closes over n, so each adder keeps its own value.'),
    ]),
  },

  {
    id: 'js-13',
    title: 'Objects in Depth',
    summary: 'Create records, read dynamic keys, destructure values and copy objects safely.',
    minutes: 15,
    content: `
<h2 id="objects">Objects are key/value records</h2>
<pre><code class="language-javascript">const user = {
  name: 'Ada',
  age: 36,
  skills: ['HTML', 'CSS'],
  greet() {
    return 'Hello, ' + this.name;
  },
};

user.name;          // "Ada"
user['age'];        // 36
user.greet();       // "Hello, Ada"</code></pre>
<p>Use dot notation for known keys and bracket notation for dynamic keys or keys containing spaces.</p>
<pre><code class="language-javascript">const field = 'email';
user[field] = 'ada@example.com';</code></pre>

<h2 id="methods">Methods and this</h2>
<p>A method is a function stored on an object. Inside a regular method, <code>this</code> refers to the object it was called on. Arrow functions do not bind their own <code>this</code>, so avoid them for object methods that need the object.</p>

<h2 id="destructuring">Destructuring and spread</h2>
<pre><code class="language-javascript">const { name, age = 0 } = user;
const { name: userName } = user;

const updated = { ...user, age: 37 };

const { password, ...publicUser } = user;</code></pre>
<p>Spread creates a <strong>shallow</strong> copy. Nested objects are still shared, so deep changes can leak between copies.</p>

<h2 id="iterating">Inspecting objects</h2>
<pre><code class="language-javascript">Object.keys(user);   // ["name", "age", ...]
Object.values(user); // ["Ada", 36, ...]
Object.entries(user); // [["name", "Ada"], ...]

for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}</code></pre>

<h2 id="optional">Optional chaining</h2>
<p><code>user?.address?.city</code> returns <code>undefined</code> instead of throwing when a link is missing. Use <code>??</code> to provide a fallback for <code>null</code> or <code>undefined</code> without treating <code>0</code> or <code>""</code> as missing.</p>
<pre><code class="language-javascript">const city = user?.address?.city ?? 'Unknown';</code></pre>
<div class="note note-tip"><strong>Prefer immutable updates</strong>Create a new object rather than mutating shared data: <code>{ ...user, active: true }</code>. It makes state changes easier to track.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Objects, destructuring and spread',
      js: `const user = {
  name: 'Ada',
  age: 36,
  address: { city: 'London' },
};

const { name, age } = user;
const updated = { ...user, age: 37, active: true };

console.log(name, age);
console.log(updated);
console.log(user?.address?.city);
console.log(user?.company?.name ?? 'No company');

for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key + '=' + value);
}`,
    },
    objectives: [
      'Read and update object properties with dot and bracket notation.',
      'Use destructuring, rest and spread without mutating shared data.',
      'Inspect objects with Object.keys, values and entries.',
    ],
    tasks: [
      'Add a method that returns the user’s full name.',
      'Destructure two properties and rename one.',
      'Create an updated user object without changing the original.',
    ],
    takeaways: [
      'Bracket notation supports dynamic keys; dot notation is for known keys.',
      'Spread copies one level deep, not nested objects.',
      'Optional chaining and nullish coalescing handle missing data safely.',
    ],
    exercise: exerciseFor('js-13', 'objects', [
      choice('Which syntax reads a property whose name is stored in a variable?', ['user.key', 'user[key]', 'user->key', 'user.key()'], 1, 'Bracket notation evaluates the key expression.'),
      fill('Destructure the name property.', 'const { ___ } = user;', [['name']], 'Destructuring uses the property name inside braces.'),
      choice('What kind of copy does { ...user } create?', ['Deep copy', 'Shallow copy', 'Reference to the same object', 'JSON string'], 1, 'Spread copies top-level properties; nested objects remain shared.'),
      choice('What does user?.address?.city return when address is missing?', ['An error', 'null', 'undefined', 'An empty string'], 2, 'Optional chaining short-circuits to undefined.'),
      choice('Which method returns an array of key/value pairs?', ['Object.keys', 'Object.values', 'Object.entries', 'Object.assign'], 2, 'Object.entries returns [key, value] pairs.'),
      jsCode('Write fullName(person) that returns the first and last name separated by a space.', '// write your function below\n', [
        { expression: "fullName({ first: 'Ada', last: 'Lovelace' })", expected: 'Ada Lovelace' },
        { expression: "fullName({ first: 'Alan', last: 'Turing' })", expected: 'Alan Turing' },
      ], `function fullName(person) {\n  return person.first + ' ' + person.last;\n}`, 'Read both properties and return a new string.'),
    ]),
  },

  {
    id: 'js-14',
    title: 'Strings and Template Literals',
    summary: 'Work with text using template literals and the string methods you will use every day.',
    minutes: 14,
    content: `
<h2 id="immutable">Strings are immutable</h2>
<p>String methods never change the original string; they return a new one. Reassign the result if you want to keep it.</p>
<pre><code class="language-javascript">let name = 'Ada';
name.toUpperCase();
console.log(name); // still "Ada"

name = name.toUpperCase();
console.log(name); // "ADA"</code></pre>

<h2 id="templates">Template literals</h2>
<p>Backtick strings support interpolation and multi-line text:</p>
<pre><code class="language-javascript">const name = 'Ada';
const role = 'engineer';

const message = \`Hello \${name}, you are an \${role}.\`;
console.log(message);

const html = \`&lt;h2&gt;\${name}&lt;/h2&gt;\`;</code></pre>
<p>Interpolation converts values to strings automatically. Prefer template literals over long <code>+</code> concatenations, especially when building markup.</p>

<h2 id="methods">Everyday methods</h2>
<ul>
  <li><code>length</code> — number of UTF-16 code units.</li>
  <li><code>trim()</code> — removes whitespace from both ends.</li>
  <li><code>includes()</code> — returns true/false.</li>
  <li><code>startsWith()</code> / <code>endsWith()</code> — prefix and suffix checks.</li>
  <li><code>slice(start, end)</code> — extracts without modifying the original.</li>
  <li><code>split(separator)</code> — turns a string into an array.</li>
  <li><code>replace()</code> / <code>replaceAll()</code> — replaces the first or all matches.</li>
  <li><code>padStart()</code> / <code>padEnd()</code> — pads to a target length.</li>
  <li><code>repeat()</code> — repeats a string.</li>
</ul>
<pre><code class="language-javascript">const slug = '  Hello World  '.trim().toLowerCase().replaceAll(' ', '-');
// "hello-world"

const initials = 'Ada Lovelace'
  .split(' ')
  .map((word) => word[0])
  .join('');
// "AL"</code></pre>

<h2 id="searching">Searching and replacing</h2>
<p><code>indexOf()</code> returns -1 when not found. <code>replace()</code> replaces only the first match unless you use a global regular expression or <code>replaceAll()</code>.</p>
<pre><code class="language-javascript">'a-b-c'.replace('-', '+');    // "a+b-c"
'a-b-c'.replaceAll('-', '+'); // "a+b+c"</code></pre>
<div class="note note-warn"><strong>Escaping</strong>When building HTML strings, user text must be escaped to avoid injection. Prefer <code>textContent</code> when inserting plain text into the DOM.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Template literals and string methods',
      js: `const user = { name: 'Ada Lovelace', role: 'engineer' };

function greeting(person) {
  return 'Hello ' + person.name + ', welcome back!';
}

const slug = '  Hello World  '.trim().toLowerCase().replaceAll(' ', '-');

console.log(greeting(user));
console.log('Slug:', slug);
console.log('Initials:', user.name.split(' ').map((word) => word[0]).join(''));
console.log('Contains Ada:', user.name.includes('Ada'));
console.log('Padded:', String(7).padStart(3, '0'));`,
    },
    objectives: [
      'Interpolate values with template literals.',
      'Use trim, includes, slice, split, replace and padStart.',
      'Explain why string methods return new values.',
    ],
    tasks: [
      'Build a greeting using a template literal.',
      'Convert a title into a URL-friendly slug.',
      'Extract the first three characters of a string with slice.',
    ],
    takeaways: [
      'Strings are immutable; methods return new strings.',
      'Template literals make interpolation and multi-line strings readable.',
      'replace replaces one match; replaceAll replaces every match.',
    ],
    exercise: exerciseFor('js-14', 'strings', [
      choice('What does "hello".toUpperCase() return?', ['"hello"', '"HELLO"', 'undefined', 'An error'], 1, 'toUpperCase returns a new uppercase string.'),
      fill('Insert the name into the template literal.', 'const text = `Hello, ___!`;', [['${name}']], 'Interpolation uses the ${expression} syntax inside backticks.'),
      choice('What does "a-b-c".replace("-", "+") return?', ['"a+b+c"', '"a+b-c"', '"a-b-c"', '"abc"'], 1, 'replace without a global regex changes only the first match.'),
      choice('Which method turns a string into an array?', ['join', 'split', 'slice', 'trim'], 1, 'split divides a string at a separator and returns an array.'),
      jsCode('Write capitalise(text) that returns the first letter uppercase and the rest unchanged.', '// write your function below\n', [
        { expression: "capitalise('hello')", expected: 'Hello' },
        { expression: "capitalise('world')", expected: 'World' },
        { expression: "capitalise('')", expected: '' },
      ], `function capitalise(text) {\n  if (!text) return '';\n  return text[0].toUpperCase() + text.slice(1);\n}`, 'Combine the uppercase first character with the rest of the string.'),
      choice('What does "  hi  ".trim() return?', ['"  hi  "', '"hi"', '"hi  "', 'undefined'], 1, 'trim removes whitespace from both ends.'),
    ]),
  },

  {
    id: 'js-15',
    title: 'Array Methods: map, filter and reduce',
    summary: 'Transform and summarise collections with the core array methods.',
    minutes: 16,
    content: `
<h2 id="map">map: transform every item</h2>
<pre><code class="language-javascript">const prices = [10, 20, 30];
const withVat = prices.map((price) => price * 1.2);
// [12, 24, 36]</code></pre>
<p><code>map</code> returns a new array of the same length. Use it when every item should become something else.</p>

<h2 id="filter">filter: keep matching items</h2>
<pre><code class="language-javascript">const ages = [12, 18, 25, 16];
const adults = ages.filter((age) => age >= 18);
// [18, 25]</code></pre>
<p>The callback must return a truthy or falsy value. <code>filter</code> never changes the original array.</p>

<h2 id="reduce">reduce: turn many values into one</h2>
<pre><code class="language-javascript">const numbers = [1, 2, 3, 4];
const total = numbers.reduce((sum, number) => sum + number, 0);
// 10</code></pre>
<p>The second argument is the starting accumulator. Always provide it unless you are certain the array is non-empty.</p>
<pre><code class="language-javascript">const cart = [
  { name: 'Tea', price: 4, qty: 2 },
  { name: 'Cake', price: 6, qty: 1 },
];

const totalPrice = cart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);</code></pre>

<h2 id="search-methods">find, some, every and sort</h2>
<ul>
  <li><code>find()</code> returns the first matching item or <code>undefined</code>.</li>
  <li><code>some()</code> returns true if at least one item matches.</li>
  <li><code>every()</code> returns true only if all items match.</li>
  <li><code>sort()</code> mutates the array; use <code>[...items].sort()</code> to keep the original safe.</li>
</ul>
<pre><code class="language-javascript">const scores = [72, 88, 91, 64];
scores.some((score) => score > 90);  // true
scores.every((score) => score >= 60); // true

const sorted = [...scores].sort((a, b) => b - a);
// [91, 88, 72, 64]</code></pre>

<h2 id="chaining">Chaining</h2>
<p>Methods that return arrays can be chained. Keep chains readable by naming intermediate results when the logic grows.</p>
<pre><code class="language-javascript">const names = users
  .filter((user) => user.active)
  .map((user) => user.name)
  .sort();</code></pre>
<div class="note note-tip"><strong>Choose the right tool</strong>map changes shape, filter removes items, reduce produces one value, find stops at the first match. Use forEach only when you want side effects, not a result.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Transform and summarise an array',
      js: `const cart = [
  { name: 'Tea', price: 4, qty: 2 },
  { name: 'Cake', price: 6, qty: 1 },
  { name: 'Mug', price: 9, qty: 0 },
];

const names = cart.map((item) => item.name);
const inStock = cart.filter((item) => item.qty > 0);
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

console.log(names);
console.log(inStock.map((item) => item.name));
console.log('Total:', total);
console.log('Has cake:', cart.some((item) => item.name === 'Cake'));`,
    },
    objectives: [
      'Transform arrays with map and select items with filter.',
      'Summarise values with reduce and an initial accumulator.',
      'Choose between find, some, every and forEach.',
    ],
    tasks: [
      'Double every number in an array with map.',
      'Keep only numbers greater than ten with filter.',
      'Calculate a cart total with reduce.',
    ],
    takeaways: [
      'map, filter and reduce return new values without mutating the original.',
      'reduce needs an initial accumulator for predictable results.',
      'sort mutates, so copy first when the original must stay unchanged.',
    ],
    exercise: exerciseFor('js-15', 'array methods', [
      choice('Which method returns a new array of the same length?', ['filter', 'map', 'reduce', 'find'], 1, 'map transforms every item and keeps the length.'),
      choice('Which method returns one accumulated value?', ['map', 'filter', 'reduce', 'some'], 2, 'reduce combines items into a single result.'),
      fill('Sum the numbers starting from zero.', 'numbers.reduce((sum, n) => sum + n, ___);', [['0']], 'Zero is the initial accumulator.'),
      jsCode('Write sumEven(numbers) that returns the sum of the even numbers.', '// write your function below\n', [
        { expression: 'sumEven([1, 2, 3, 4])', expected: 6 },
        { expression: 'sumEven([10, 11, 12])', expected: 22 },
        { expression: 'sumEven([1, 3, 5])', expected: 0 },
      ], `function sumEven(numbers) {\n  return numbers\n    .filter((n) => n % 2 === 0)\n    .reduce((sum, n) => sum + n, 0);\n}`, 'Filter the even numbers, then reduce them with an initial value of 0.'),
      choice('Which method stops at the first matching item?', ['filter', 'map', 'find', 'every'], 2, 'find returns the first matching element or undefined.'),
      choice('What happens if you call sort() without a comparator on numbers?', ['It sorts numerically', 'It sorts as strings by default', 'It reverses the array', 'It throws an error'], 1, 'Default sort compares string representations, so 10 can come before 2.'),
    ]),
  },

  {
    id: 'js-16',
    title: 'DOM Selection and Traversal',
    summary: 'Find the right elements, guard against null and move through the document tree.',
    minutes: 14,
    content: `
<h2 id="selecting">Selecting elements</h2>
<pre><code class="language-javascript">const title = document.getElementById('title');
const firstCard = document.querySelector('.card');
const allCards = document.querySelectorAll('.card');</code></pre>
<ul>
  <li><code>getElementById()</code> is fast and returns one element or <code>null</code>.</li>
  <li><code>querySelector()</code> accepts any CSS selector and returns the first match or <code>null</code>.</li>
  <li><code>querySelectorAll()</code> returns a static <code>NodeList</code> of all matches.</li>
</ul>

<h2 id="null">Always guard against null</h2>
<p>If an element is missing, accessing a property throws an error. Guard early:</p>
<pre><code class="language-javascript">const button = document.querySelector('.save');

if (button) {
  button.addEventListener('click', save);
}</code></pre>
<p>This is especially important when a script is shared across several pages.</p>

<h2 id="traversal">Traversal</h2>
<pre><code class="language-javascript">const card = document.querySelector('.card');

card.parentElement;
card.children;
card.firstElementChild;
card.lastElementChild;
card.nextElementSibling;
card.previousElementSibling;
card.closest('.panel');
card.matches('.card--featured');</code></pre>
<p>Prefer <code>closest()</code> when handling events from nested elements — it walks up until it finds a matching ancestor.</p>

<h2 id="nodelist">NodeList versus array</h2>
<p><code>querySelectorAll()</code> returns a NodeList. Modern browsers support <code>forEach</code> on it, but map and filter are array methods. Convert when needed:</p>
<pre><code class="language-javascript">const cards = [...document.querySelectorAll('.card')];
const featured = cards.filter((card) => card.matches('.card--featured'));</code></pre>
<div class="note note-tip"><strong>Scope your queries</strong>Search inside a known container instead of the whole document: <code>panel.querySelector('.title')</code>. It is faster and less likely to grab the wrong element.</div>
`,
    demo: {
      type: 'dom',
      title: 'Select and inspect elements',
      html: `<main id="app">
  <h1>DOM selection</h1>
  <ul class="list">
    <li class="item">One</li>
    <li class="item is-active">Two</li>
    <li class="item">Three</li>
  </ul>
</main>`,
      js: `const list = document.querySelector('.list');
const items = document.querySelectorAll('.item');

console.log('Items:', items.length);
console.log('First text:', list.firstElementChild.textContent);
console.log('Active:', document.querySelector('.item.is-active').textContent);
console.log('Parent:', document.querySelector('.item').parentElement.className);

items.forEach((item, index) => {
  console.log(index + ': ' + item.textContent);
});`,
    },
    objectives: [
      'Select elements with getElementById, querySelector and querySelectorAll.',
      'Guard against null before using a selected element.',
      'Traverse the DOM with children, siblings and closest.',
    ],
    tasks: [
      'Select the first list item and log its text.',
      'Select all items and count them.',
      'Use closest() to find the list from an item.',
    ],
    takeaways: [
      'querySelector returns the first match; querySelectorAll returns all matches.',
      'Missing elements return null, so guard before using them.',
      'closest() and parentElement make traversal predictable.',
    ],
    exercise: exerciseFor('js-16', 'DOM selection', [
      choice('What does document.querySelector(".card") return?', ['All cards', 'The first matching card or null', 'A NodeList', 'The card’s text'], 1, 'querySelector returns the first match, or null when nothing matches.'),
      fill('Select all elements with the class item.', 'const items = document.___(".item");', [['querySelectorAll']], 'querySelectorAll returns every matching element.'),
      choice('Which method finds the nearest ancestor matching a selector?', ['parentElement', 'closest', 'querySelector', 'matches'], 1, 'closest walks up the tree until it finds a match.'),
      choice('What does querySelectorAll return?', ['An array', 'A NodeList', 'A string', 'A single element'], 1, 'It returns a static NodeList, which can be converted to an array with spread.'),
      jsCode('Write toArray(list) that converts an array-like value into a real array.', '// write your function below\n', [
        { expression: 'Array.isArray(toArray({ 0: "a", length: 1 }))', expected: true },
        { expression: 'toArray({ 0: "a", 1: "b", length: 2 }).join(",")', expected: 'a,b' },
      ], `function toArray(list) {\n  return Array.from(list);\n}`, 'Array.from converts array-like values and iterables into arrays.'),
      choice('Why guard a selected element with if (element)?', ['To make it faster', 'Because it may be null and accessing properties would throw', 'To add CSS', 'To create a NodeList'], 1, 'A missing selector result is null; checking prevents runtime errors.'),
    ]),
  },

  {
    id: 'js-17',
    title: 'DOM Manipulation',
    summary: 'Create, insert, style and remove elements safely without breaking the page.',
    minutes: 16,
    content: `
<h2 id="content">textContent versus innerHTML</h2>
<pre><code class="language-javascript">const title = document.querySelector('h1');

title.textContent = 'New title';          // safe, treats input as text
title.innerHTML = '&lt;em&gt;New&lt;/em&gt; title'; // parses HTML</code></pre>
<p>Use <code>textContent</code> for user-provided text. Using <code>innerHTML</code> with untrusted input enables <strong>cross-site scripting (XSS)</strong>.</p>
<pre><code class="language-javascript">// Unsafe if name comes from a user
element.innerHTML = '&lt;p&gt;Hello ' + name + '&lt;/p&gt;';

// Safe
const p = document.createElement('p');
p.textContent = 'Hello ' + name;
element.append(p);</code></pre>

<h2 id="creating">Creating and inserting elements</h2>
<pre><code class="language-javascript">const item = document.createElement('li');
item.textContent = 'New task';
item.classList.add('task');
item.dataset.id = '42';

list.append(item);    // at the end
list.prepend(item);   // at the start
item.remove();        // remove from the DOM

parent.insertBefore(item, referenceNode);</code></pre>
<p><code>append()</code> accepts strings and nodes, while <code>appendChild()</code> accepts only nodes. Prefer <code>append()</code> in new code.</p>

<h2 id="classes">Classes, attributes and styles</h2>
<pre><code class="language-javascript">card.classList.add('is-open');
card.classList.remove('is-open');
card.classList.toggle('is-open');
card.classList.contains('is-open');

button.setAttribute('aria-expanded', 'true');
button.dataset.action = 'save';

card.style.setProperty('--progress', '60%');</code></pre>
<p>Prefer classes for visual states so styles stay in CSS. Inline styles are useful for dynamic values such as a progress width.</p>

<h2 id="performance">Batch your changes</h2>
<p>Reading layout properties in a loop and then writing can cause repeated reflows. Group reads and writes. Build a fragment when adding many elements:</p>
<pre><code class="language-javascript">const fragment = document.createDocumentFragment();
for (const name of names) {
  const li = document.createElement('li');
  li.textContent = name;
  fragment.append(li);
}
list.append(fragment);</code></pre>
<div class="note note-warn"><strong>Do not build HTML with user strings</strong>If you must generate markup, escape every interpolated value. The safer default is createElement + textContent.</div>
`,
    demo: {
      type: 'dom',
      title: 'Create and update a list',
      html: `<section class="panel">
  <h1>Tasks</h1>
  <ul id="tasks"></ul>
  <button id="add" type="button">Add task</button>
</section>`,
      js: `const list = document.getElementById('tasks');
const button = document.getElementById('add');
let count = 0;

function addTask() {
  count += 1;
  const li = document.createElement('li');
  li.textContent = 'Task ' + count;
  li.className = 'task';
  if (count % 2 === 0) li.classList.add('even');
  list.append(li);
  console.log('Added:', li.textContent);
}

button.addEventListener('click', addTask);
addTask();
addTask();`,
    },
    objectives: [
      'Set text safely and explain the XSS risk of innerHTML.',
      'Create, insert and remove elements.',
      'Toggle classes and update attributes and data properties.',
    ],
    tasks: [
      'Add a new list item with createElement and textContent.',
      'Toggle an is-active class on a button click.',
      'Remove the last item from a list.',
    ],
    takeaways: [
      'textContent is safe for user input; innerHTML parses markup.',
      'createElement + append keeps insertion explicit and secure.',
      'classList and dataset keep state readable and CSS-friendly.',
    ],
    exercise: exerciseFor('js-17', 'DOM manipulation', [
      choice('Which property safely inserts plain text?', ['innerHTML', 'textContent', 'outerHTML', 'innerText with HTML'], 1, 'textContent treats the value as text, not markup.'),
      fill('Create a new paragraph element.', 'const p = document.___("p");', [['createElement']], 'createElement builds a new DOM node.'),
      choice('What is the risk of using innerHTML with user input?', ['Slower fonts', 'Cross-site scripting (XSS)', 'Lost CSS', 'A NodeList error'], 1, 'Untrusted HTML can execute scripts or inject malicious markup.'),
      choice('Which method adds a class without removing existing classes?', ['className =', 'classList.add', 'setAttribute("class", …) only', 'classList.replace'], 1, 'classList.add appends a class safely.'),
      jsCode('Write escapeHtml(value) that replaces &, < and > with HTML entities.', '// write your function below\n', [
        { expression: "escapeHtml('<b>')", expected: '&lt;b&gt;' },
        { expression: "escapeHtml('a & b')", expected: 'a &amp; b' },
      ], `function escapeHtml(value) {\n  return String(value)\n    .replaceAll('&', '&amp;')\n    .replaceAll('<', '&lt;')\n    .replaceAll('>', '&gt;');\n}`, 'Escaping special characters prevents user text from becoming markup.'),
      choice('Which call removes an element from the DOM?', ['element.delete()', 'element.remove()', 'element.hide()', 'document.removeChild(element)'], 1, 'remove() detaches the element from its parent.'),
    ]),
  },

  {
    id: 'js-18',
    title: 'Events and Event Delegation',
    summary: 'Listen for interactions, understand bubbling and handle many elements with one listener.',
    minutes: 16,
    content: `
<h2 id="listeners">Adding listeners</h2>
<pre><code class="language-javascript">const button = document.querySelector('#save');

button.addEventListener('click', (event) => {
  console.log('Clicked', event.target);
});</code></pre>
<p>Use <code>addEventListener</code> instead of inline <code>onclick</code> attributes. You can add several listeners, remove them with a matching function reference, and keep behaviour separate from markup.</p>

<h2 id="event-object">The event object</h2>
<ul>
  <li><code>event.target</code> — the element that triggered the event.</li>
  <li><code>event.currentTarget</code> — the element whose listener is running.</li>
  <li><code>event.type</code> — such as "click" or "submit".</li>
  <li><code>event.preventDefault()</code> — stops the browser’s default action.</li>
  <li><code>event.stopPropagation()</code> — stops the event from bubbling further.</li>
</ul>

<h2 id="bubbling">Bubbling and delegation</h2>
<p>Most events bubble from the target up through its ancestors. Delegation uses this to handle many children with one listener on a parent:</p>
<pre><code class="language-javascript">const list = document.querySelector('#tasks');

list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const item = button.closest('li');
  if (button.dataset.action === 'delete') item.remove();
});</code></pre>
<p>Delegation keeps working when new children are added later and uses less memory than one listener per item.</p>

<h2 id="forms">Forms and keyboard events</h2>
<pre><code class="language-javascript">form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDialog();
});</code></pre>
<p>Do not listen only for mouse clicks. Use real buttons so <kbd>Enter</kbd> and <kbd>Space</kbd> work automatically, and provide keyboard alternatives for custom interactions.</p>

<h2 id="options">Listener options and cleanup</h2>
<p><code>{ once: true }</code> removes the listener after it runs. <code>{ passive: true }</code> promises not to call <code>preventDefault()</code>, which helps scrolling performance. Remove listeners when a component is destroyed to avoid leaks.</p>
<div class="note note-tip"><strong>Prefer delegation for lists</strong>One listener on the container is simpler to maintain than rebuilding listeners every time the list changes.</div>
`,
    demo: {
      type: 'dom',
      title: 'Event delegation on a task list',
      html: `<h1>Delegated events</h1>
<ul id="list">
  <li>Write HTML <button data-action="done" type="button">Done</button></li>
  <li>Learn CSS <button data-action="done" type="button">Done</button></li>
</ul>
<p id="status">Click a Done button.</p>`,
      js: `const list = document.getElementById('list');
const status = document.getElementById('status');

list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="done"]');
  if (!button) return;

  const item = button.closest('li');
  item.style.textDecoration = 'line-through';
  status.textContent = 'Completed: ' + item.firstChild.textContent.trim();
  console.log(status.textContent);
});`,
    },
    objectives: [
      'Attach listeners with addEventListener and read the event object.',
      'Use preventDefault and stopPropagation deliberately.',
      'Handle dynamic child elements with event delegation.',
    ],
    tasks: [
      'Add a click listener that logs the clicked element.',
      'Prevent a form from reloading the page.',
      'Use delegation to mark list items as done.',
    ],
    takeaways: [
      'target is the origin; currentTarget is the element with the listener.',
      'Events bubble, enabling delegation from a parent.',
      'Use real buttons and keyboard events for accessible interactions.',
    ],
    exercise: exerciseFor('js-18', 'events', [
      choice('Which property refers to the element that triggered the event?', ['currentTarget', 'target', 'listener', 'parent'], 1, 'target is the original element that dispatched the event.'),
      fill('Stop the form from reloading the page.', 'form.addEventListener("submit", (event) => {\n  event.___();\n});', [['preventDefault']], 'preventDefault cancels the browser’s default submit behaviour.'),
      choice('What is event delegation?', ['Adding a listener to every child', 'Handling child events with a listener on a common ancestor', 'Removing all events', 'Using inline onclick'], 1, 'Delegation relies on bubbling and a shared ancestor.'),
      choice('Why is stopPropagation often unnecessary?', ['It is deprecated', 'It can prevent other useful handlers from running', 'It stops the page loading', 'It disables keyboard input'], 1, 'Use it only when you truly need to prevent bubbling.'),
      jsCode('Write actionOf(event) that returns event.currentTarget.dataset.action.', '// write your function below\n', [
        { expression: "actionOf({ currentTarget: { dataset: { action: 'save' } } })", expected: 'save' },
        { expression: "actionOf({ currentTarget: { dataset: {} } })", expected: undefined },
      ], `function actionOf(event) {\n  return event.currentTarget.dataset.action;\n}`, 'currentTarget is the element whose listener is running.'),
      choice('Which listener option runs a handler only once?', ['{ once: true }', '{ passive: true }', '{ capture: true }', '{ repeat: false }'], 0, 'once removes the listener automatically after the first call.'),
    ]),
  },

  {
    id: 'js-19',
    title: 'Form Validation',
    summary: 'Combine native validation with JavaScript for clear, accessible feedback.',
    minutes: 15,
    content: `
<h2 id="native">Start with native validation</h2>
<p>HTML attributes give you required fields, type checks, pattern matching and length limits for free. JavaScript should enhance that experience, not replace it.</p>
<pre><code class="language-html">&lt;input id="email" type="email" required&gt;
&lt;input id="age" type="number" min="13" max="120"&gt;</code></pre>

<h2 id="api">The constraint validation API</h2>
<pre><code class="language-javascript">const input = document.querySelector('#email');

input.checkValidity();   // true or false
input.validity.valid;    // boolean
input.validity.typeMismatch; // true when an email is malformed
input.validationMessage; // browser-provided message

input.setCustomValidity('This email is already registered.');
input.setCustomValidity(''); // clear the custom error</code></pre>
<p>Map browser messages to your own interface when you want consistent, friendlier wording. Keep the message next to the field and connect it with <code>aria-describedby</code>.</p>

<h2 id="events">Validate at the right time</h2>
<p>Validate on submit, then re-validate on <code>input</code> once the user has attempted a submission. Validating on every keystroke from the start can feel hostile.</p>
<pre><code class="language-javascript">form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    form.reportValidity();
    return;
  }

  event.preventDefault();
  const data = new FormData(form);
  save(Object.fromEntries(data));
});</code></pre>

<h2 id="custom">Custom rules</h2>
<pre><code class="language-javascript">function validatePassword(value) {
  if (value.length &lt; 8) return 'Use at least 8 characters.';
  if (!/[0-9]/.test(value)) return 'Include a number.';
  return '';
}

const password = document.querySelector('#password');
password.addEventListener('input', () => {
  password.setCustomValidity(validatePassword(password.value));
});</code></pre>

<h2 id="security">Client-side validation is not security</h2>
<p>Anyone can bypass browser JavaScript. Always validate and sanitise on the server, use parameterised queries, and never trust a value because the form looked correct in the browser.</p>
<div class="note note-tip"><strong>Error language</strong>Say what is wrong and how to fix it: "Enter an email like name@example.com", not "Invalid input".</div>
`,
    demo: {
      type: 'dom',
      title: 'Inline validation with custom messages',
      html: `<form id="signup">
  <p>
    <label for="email">Email</label><br>
    <input id="email" type="email" required>
  </p>
  <p>
    <label for="password">Password</label><br>
    <input id="password" type="password" required>
  </p>
  <p id="error" role="status"></p>
  <button type="submit">Sign up</button>
</form>`,
      js: `const form = document.getElementById('signup');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');

function validatePassword(value) {
  if (value.length < 8) return 'Use at least 8 characters.';
  if (!/[0-9]/.test(value)) return 'Include a number.';
  return '';
}

password.addEventListener('input', () => {
  password.setCustomValidity(validatePassword(password.value));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    error.textContent = password.validationMessage || 'Please check the fields.';
    form.reportValidity();
    return;
  }
  error.textContent = 'Account created for ' + email.value;
});`,
    },
    objectives: [
      'Use native constraint validation before writing custom logic.',
      'Read validity state and set custom validity messages.',
      'Explain why server-side validation is mandatory.',
    ],
    tasks: [
      'Add a minimum length to the password field.',
      'Show a custom message when a password has no number.',
      'Prevent submission when the form is invalid.',
    ],
    takeaways: [
      'Native attributes handle common checks with no JavaScript.',
      'checkValidity and setCustomValidity integrate custom rules.',
      'Client validation improves UX; server validation protects the system.',
    ],
    exercise: exerciseFor('js-19', 'form validation', [
      choice('Which method returns whether a form/control passes validation?', ['checkValidity()', 'reportValidity()', 'validate()', 'isValid()'], 0, 'checkValidity returns a boolean without showing the browser UI.'),
      fill('Stop submission when the form is invalid.', 'if (!form.checkValidity()) {\n  event.___();\n}', [['preventDefault']], 'preventDefault stops the default submit action.'),
      choice('What does setCustomValidity("") do?', ['Creates an error', 'Clears the custom error', 'Disables the field', 'Submits the form'], 1, 'An empty string clears the custom validity message.'),
      choice('When is the best first moment to validate a form?', ['On every keystroke from page load', 'On submit, then while correcting', 'Never', 'Only on the server'], 1, 'Validating on submit avoids punishing users while they are still typing.'),
      jsCode('Write isValidEmail(value) that accepts a simple name@domain.tld address.', '// write your function below\n', [
        { expression: "isValidEmail('ada@example.com')", expected: true },
        { expression: "isValidEmail('not-an-email')", expected: false },
        { expression: "isValidEmail('a@b')", expected: false },
      ], `function isValidEmail(value) {\n  return /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(value);\n}`, 'A simple pattern checks for characters, an @, a domain and a dot.'),
      choice('Why is client-side validation insufficient?', ['It is too slow', 'Users can bypass it, so the server must validate too', 'It cannot check required fields', 'It only works in Chrome'], 1, 'The server must always treat incoming data as untrusted.'),
    ]),
  },

  {
    id: 'js-20',
    title: 'Debugging and Error Handling',
    summary: 'Read errors, use breakpoints and fail gracefully with try/catch.',
    minutes: 15,
    content: `
<h2 id="errors">Reading an error</h2>
<p>A stack trace tells you the error type, message, file and line. Start at the top of the stack (the origin) and read downwards. A <code>TypeError: Cannot read properties of undefined</code> usually means an object or selector returned nothing.</p>
<pre><code class="language-javascript">const user = undefined;
console.log(user.name); // TypeError</code></pre>

<h2 id="console">The console is more than log</h2>
<ul>
  <li><code>console.log()</code> — general output.</li>
  <li><code>console.warn()</code> / <code>console.error()</code> — severity and stack context.</li>
  <li><code>console.table()</code> — arrays of objects in a readable table.</li>
  <li><code>console.group()</code> / <code>console.groupEnd()</code> — organise related output.</li>
  <li><code>console.time()</code> / <code>console.timeEnd()</code> — measure performance.</li>
</ul>

<h2 id="breakpoints">Breakpoints beat console spam</h2>
<ol>
  <li>Open DevTools → Sources and find your file.</li>
  <li>Click a line number to set a breakpoint.</li>
  <li>Reload or trigger the action; execution pauses.</li>
  <li>Inspect scope, call stack and values.</li>
  <li>Step over, into or out of functions.</li>
</ol>
<p>Use a <code>debugger;</code> statement when it is hard to reach the code through the UI. Remove it before shipping.</p>

<h2 id="try-catch">try/catch/finally</h2>
<pre><code class="language-javascript">function parseConfig(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Invalid config:', error.message);
    return null;
  } finally {
    console.log('Parsing attempt finished');
  }
}</code></pre>
<p><code>catch</code> handles synchronous errors thrown in the <code>try</code> block. <code>finally</code> always runs, which is useful for cleanup. You can throw your own errors with <code>throw new Error('message')</code>.</p>

<h2 id="async-errors">Async errors</h2>
<p>A rejected promise is not caught by a surrounding synchronous <code>try/catch</code> unless you await it. Use <code>try/catch</code> inside an async function, or <code>.catch()</code> on the promise.</p>
<pre><code class="language-javascript">async function load() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}</code></pre>

<h2 id="defensive">Defensive checks</h2>
<p>Validate inputs, guard missing DOM elements, provide fallbacks and never let one failed request blank the whole page. A useful error message and a retry button are part of the feature.</p>
<div class="note note-tip"><strong>Reproduce first</strong>Before changing code, write down the smallest set of steps that reliably causes the bug. A reproducible bug is halfway fixed.</div>
`,
    demo: {
      type: 'javascript',
      title: 'try/catch and the console toolkit',
      js: `function safeParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error: error.message };
  } finally {
    console.log('Finished parsing');
  }
}

console.log(safeParse('{"name":"Ada"}'));
console.log(safeParse('{broken'));

console.table([
  { name: 'Ada', score: 92 },
  { name: 'Alan', score: 88 },
]);

console.time('loop');
let total = 0;
for (let i = 0; i < 100000; i++) total += i;
console.timeEnd('loop');
console.log('Total:', total);`,
    },
    objectives: [
      'Read a stack trace and locate the failing line.',
      'Use breakpoints and console methods to inspect state.',
      'Handle synchronous and asynchronous errors gracefully.',
    ],
    tasks: [
      'Reproduce an error and read its message and line number.',
      'Wrap JSON.parse in a try/catch and return a fallback.',
      'Use console.table on an array of objects.',
    ],
    takeaways: [
      'Start debugging from the error message and the top of the stack.',
      'Breakpoints reveal real values instead of guessed ones.',
      'Handle expected failures and show users a useful recovery path.',
    ],
    exercise: exerciseFor('js-20', 'debugging and errors', [
      choice('Which block always runs after try/catch?', ['catch', 'finally', 'throw', 'else'], 1, 'finally runs whether or not an error occurred.'),
      fill('Handle the parse failure.', 'try {\n  return JSON.parse(text);\n} ___ (error) {\n  return null;\n}', [['catch']], 'catch receives the thrown error.'),
      choice('What usually causes "Cannot read properties of undefined"?', ['A CSS typo', 'Accessing a property on a missing value', 'A missing semicolon', 'Using const'], 1, 'The value is undefined, so reading a property throws.'),
      jsCode('Write safeParse(text) that returns parsed JSON or null on failure.', '// write your function below\n', [
        { expression: "safeParse('{\"a\":1}').a", expected: 1 },
        { expression: "safeParse('{broken')", expected: null },
      ], `function safeParse(text) {\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    return null;\n  }\n}`, 'try/catch turns an invalid JSON error into a predictable null result.'),
      choice('Which tool lets you pause execution and inspect scope?', ['A breakpoint in DevTools', 'console.log only', 'A CSS linter', 'The Network panel'], 0, 'Breakpoints pause the debugger and expose the current scope.'),
      choice('How do you catch a rejected awaited promise?', ['With a global onclick', 'With try/catch inside an async function', 'With CSS', 'Promises cannot fail'], 1, 'await converts rejection into a throw that try/catch can handle.'),
    ]),
  },

  {
    id: 'js-21',
    title: 'Promises and async/await',
    summary: 'Coordinate asynchronous work, run tasks in parallel and handle failures.',
    minutes: 16,
    content: `
<h2 id="async">Why async exists</h2>
<p>JavaScript runs on one thread. Network requests, timers and file reads happen outside the main thread. A <strong>Promise</strong> represents a value that will be available later. It can be pending, fulfilled or rejected.</p>
<pre><code class="language-javascript">const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 500);
});

promise.then((value) => console.log(value));</code></pre>

<h2 id="then">then, catch and finally</h2>
<pre><code class="language-javascript">fetch('/api/user')
  .then((response) => response.json())
  .then((user) => console.log(user))
  .catch((error) => console.error(error))
  .finally(() => console.log('Request finished'));</code></pre>
<p>Returning a promise from <code>then</code> flattens the chain. Throwing inside <code>then</code> sends control to the nearest <code>catch</code>.</p>

<h2 id="await">async/await</h2>
<p><code>async</code> functions always return a promise. <code>await</code> pauses the async function until the promise settles, without blocking the rest of the page.</p>
<pre><code class="language-javascript">async function loadUser() {
  try {
    const response = await fetch('/api/user');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (error) {
    console.error('Could not load user:', error.message);
    return null;
  }
}</code></pre>

<h2 id="parallel">Sequential versus parallel</h2>
<pre><code class="language-javascript">// Sequential: each await waits for the previous one
const user = await getUser();
const posts = await getPosts();

// Parallel: start both, then wait for both
const [user, posts] = await Promise.all([getUser(), getPosts()]);</code></pre>
<ul>
  <li><code>Promise.all()</code> rejects if any promise rejects.</li>
  <li><code>Promise.allSettled()</code> waits for every promise and reports each result.</li>
  <li><code>Promise.race()</code> settles with the first promise to settle.</li>
  <li><code>Promise.any()</code> resolves with the first fulfilled promise.</li>
</ul>

<h2 id="pitfalls">Pitfalls</h2>
<p>Do not forget <code>await</code> when the next line depends on the result. Do not use <code>forEach</code> with async callbacks and expect it to wait — use <code>for...of</code> or <code>Promise.all(items.map(...))</code>. Unhandled rejections should be logged and surfaced to the user.</p>
<div class="note note-tip"><strong>Parallel by default</strong>If two requests do not depend on each other, start them together with Promise.all and reduce the total waiting time.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Promises in parallel and sequence',
      js: `function wait(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function run() {
  console.time('parallel');
  const [a, b] = await Promise.all([wait(400, 'A'), wait(400, 'B')]);
  console.timeEnd('parallel');
  console.log(a, b);

  console.time('sequential');
  const c = await wait(400, 'C');
  const d = await wait(400, 'D');
  console.timeEnd('sequential');
  console.log(c, d);
}

run();
console.log('This logs before the promises finish.');`,
    },
    objectives: [
      'Explain the three states of a promise.',
      'Use then/catch and async/await with error handling.',
      'Run independent asynchronous tasks in parallel.',
    ],
    tasks: [
      'Convert a then chain to async/await.',
      'Run two simulated requests with Promise.all.',
      'Catch a rejection and log a friendly message.',
    ],
    takeaways: [
      'A promise is pending, fulfilled or rejected.',
      'await pauses only the current async function.',
      'Promise.all runs independent work in parallel.',
    ],
    exercise: exerciseFor('js-21', 'async JavaScript', [
      choice('Which is not a promise state?', ['Pending', 'Fulfilled', 'Rejected', 'Scheduled'], 3, 'The three states are pending, fulfilled and rejected.'),
      fill('Wait for the promise result.', 'const data = ___ response.json();', [['await']], 'await unwraps the promise inside an async function.'),
      choice('What does Promise.all do?', ['Runs promises one by one', 'Waits for all promises or rejects on the first rejection', 'Ignores rejections', 'Creates a new thread'], 1, 'Promise.all resolves when all resolve and rejects when any rejects.'),
      choice('Which function returns a promise?', ['A normal function', 'An async function', 'A CSS function', 'JSON.parse'], 1, 'async functions always return a promise.'),
      jsCode('Write asyncValue() that returns a promise resolving to 42.', '// write your function below\n', [
        { expression: 'asyncValue() instanceof Promise', expected: true },
        { expression: 'typeof asyncValue', expected: 'function' },
      ], `async function asyncValue() {\n  return 42;\n}`, 'Returning a value from an async function wraps it in a resolved promise.'),
      choice('Which method waits for every promise and reports each outcome?', ['Promise.all', 'Promise.race', 'Promise.allSettled', 'Promise.reject'], 2, 'allSettled never rejects early; it reports fulfilled and rejected results.'),
    ]),
  },

  {
    id: 'js-22',
    title: 'Fetch API Fundamentals',
    summary: 'Request JSON, check HTTP status, send data and handle loading and errors.',
    minutes: 17,
    content: `
<h2 id="fetch">fetch returns a promise</h2>
<pre><code class="language-javascript">async function getUsers() {
  const response = await fetch('https://api.example.com/users');
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return response.json();
}</code></pre>
<p>Important: <code>fetch</code> does not reject on HTTP errors such as 404 or 500. You must check <code>response.ok</code> or <code>response.status</code>.</p>

<h2 id="response">Reading the response</h2>
<ul>
  <li><code>response.json()</code> — parse JSON (also returns a promise).</li>
  <li><code>response.text()</code> — plain text or HTML.</li>
  <li><code>response.blob()</code> — binary data such as images.</li>
  <li><code>response.headers.get('content-type')</code> — inspect headers.</li>
</ul>
<p>A response body can only be consumed once. Clone it with <code>response.clone()</code> before reading it twice.</p>

<h2 id="post">Sending data</h2>
<pre><code class="language-javascript">const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Learn fetch' }),
});</code></pre>
<p>For authentication, send a token in the <code>Authorization</code> header. Never put API secrets or service-role keys in front-end code — anything shipped to the browser is public.</p>

<h2 id="abort">Timeouts and cancellation</h2>
<pre><code class="language-javascript">const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
  return await response.json();
} finally {
  clearTimeout(timer);
}</code></pre>

<h2 id="ui">Loading and error states</h2>
<p>Every request needs three UI states: loading, success and failure. Disable duplicate submissions, show a spinner or skeleton, and give the user a retry path. Do not leave the page looking frozen.</p>
<pre><code class="language-javascript">button.disabled = true;
showStatus('Loading…');

try {
  const data = await getUsers();
  render(data);
} catch (error) {
  showStatus('Could not load data. Try again.');
} finally {
  button.disabled = false;
}</code></pre>
<div class="note note-warn"><strong>CORS</strong>Browsers block cross-origin reads unless the server sends the right CORS headers. A CORS error is a server configuration issue, not a bug you can fix by changing the fetch URL blindly.</div>
`,
    demo: {
      type: 'javascript',
      title: 'Simulated fetch with loading and errors',
      js: `function fakeFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('missing')) {
        reject(new Error('HTTP 404'));
      } else {
        resolve({ ok: true, json: () => Promise.resolve({ title: 'Learn fetch' }) });
      }
    }, 300);
  });
}

async function load(url) {
  console.log('Loading', url);
  try {
    const response = await fakeFetch(url);
    if (!response.ok) throw new Error('Bad response');
    const data = await response.json();
    console.log('Success:', data.title);
  } catch (error) {
    console.log('Failed:', error.message);
  } finally {
    console.log('Done');
  }
}

load('/api/task/1');
load('/api/missing');`,
    },
    objectives: [
      'Make GET and POST requests with fetch.',
      'Check response.ok and parse JSON safely.',
      'Show loading, success and error states and cancel requests.',
    ],
    tasks: [
      'Fetch a JSON endpoint and log the parsed data.',
      'Send a POST request with a JSON body.',
      'Add a loading message and a retry button to a request.',
    ],
    takeaways: [
      'fetch resolves for HTTP errors; check response.ok yourself.',
      'JSON parsing is asynchronous and consumes the body once.',
      'Never ship private API keys in browser code.',
    ],
    exercise: exerciseFor('js-22', 'fetch', [
      choice('What does fetch return?', ['A JSON object immediately', 'A promise that resolves to a Response', 'A string', 'An array of users'], 1, 'fetch returns a promise for a Response object.'),
      fill('Parse the JSON response body.', 'const data = await response.___();', [['json']], 'response.json() returns a promise for the parsed body.'),
      choice('Which status check is correct?', ['if (response.ok)', 'if (response === 200)', 'if (response.statusText)', 'if (!response)'], 0, 'response.ok is true for status codes 200–299.'),
      choice('Why is fetch not automatically throwing on a 404?', ['404 is not an HTTP error', 'fetch only rejects on network failures, so you check the status', 'The server hides it', 'JSON cannot represent errors'], 1, 'HTTP error statuses still produce a resolved Response.'),
      choice('Where should an API service-role key live?', ['In the front-end JavaScript', 'In a public config file', 'On a trusted server or backend', 'In a CSS comment'], 2, 'Browser code is public; secrets belong on the server.'),
      jsCode('Write itemUrl(id) that returns "https://api.example.com/items/" plus the id.', '// write your function below\n', [
        { expression: 'itemUrl(7)', expected: 'https://api.example.com/items/7' },
        { expression: 'itemUrl(42)', expected: 'https://api.example.com/items/42' },
      ], `function itemUrl(id) {\n  return 'https://api.example.com/items/' + id;\n}`, 'String concatenation or a template literal builds the endpoint.'),
    ]),
  },

  {
    id: 'js-23',
    title: 'Complete Project: Weather Dashboard',
    summary: 'Build an interactive dashboard with form input, loading states, errors and saved preferences.',
    minutes: 30,
    content: `
<h2 id="brief">The brief</h2>
<p>Build a <strong>Weather Dashboard</strong> where a visitor types a city and sees current conditions. Use a public weather API, or a mock object while you learn. The project must handle success, loading, empty and error states.</p>
<p><strong>Requirements</strong></p>
<ul>
  <li>A search form with a labelled city input.</li>
  <li>Fetch weather data and display temperature, conditions and an icon.</li>
  <li>Show a loading state while the request is in flight.</li>
  <li>Show a friendly error message for an unknown city or network failure.</li>
  <li>Disable the submit button during a request to prevent duplicates.</li>
  <li>Save the last searched city in localStorage and restore it on load.</li>
  <li>Provide a retry action after failure.</li>
  <li>Work with keyboard only and remain readable on mobile.</li>
</ul>

<h2 id="state">Plan the state</h2>
<pre><code class="language-javascript">const state = {
  city: '',
  status: 'idle', // idle | loading | success | error
  weather: null,
  error: null,
};</code></pre>
<p>Render the interface from state instead of scattering DOM changes through the request. A single <code>render()</code> function keeps the UI consistent.</p>

<h2 id="structure">Suggested structure</h2>
<pre><code class="language-javascript">const form = document.querySelector('#search-form');
const input = document.querySelector('#city');
const result = document.querySelector('#result');

async function search(city) {
  state.status = 'loading';
  state.error = null;
  render();

  try {
    const data = await fetchWeather(city);
    state.weather = data;
    state.status = 'success';
    localStorage.setItem('lastCity', city);
  } catch (error) {
    state.error = error.message;
    state.status = 'error';
  }

  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  search(city);
});</code></pre>

<h2 id="milestones">Milestones</h2>
<ol>
  <li><strong>Mock first.</strong> Build the UI with a hard-coded weather object.</li>
  <li><strong>Form flow.</strong> Read the city, validate it and show loading.</li>
  <li><strong>Request.</strong> Replace the mock with fetch and check response.ok.</li>
  <li><strong>Errors.</strong> Handle 404, network failure and empty input.</li>
  <li><strong>Persistence.</strong> Restore the last city for returning visitors.</li>
  <li><strong>Polish.</strong> Add responsive CSS, focus states and reduced-motion support.</li>
  <li><strong>Review.</strong> Test keyboard submission and slow-network behaviour.</li>
</ol>

<h2 id="checklist">Completion checklist</h2>
<ul>
  <li>The form has a visible label and works with Enter.</li>
  <li>Only one request can be active at a time.</li>
  <li>Loading, success and error states are all visible.</li>
  <li>Invalid input does not produce a confusing console error.</li>
  <li>The last city survives a page refresh.</li>
  <li>No secrets are present in the source code.</li>
  <li>Layout works at 320px and with 200% zoom.</li>
</ul>

<h2 id="stretch">Stretch goals</h2>
<p>Add a five-day forecast, a temperature unit toggle, geolocation with explicit permission, or caching with a timestamp so repeat searches are instant. Add a loading skeleton instead of a text message.</p>
`,
    demo: {
      type: 'dom',
      title: 'Weather dashboard starter with mock data',
      html: `<main class="app">
  <h1>Weather dashboard</h1>
  <form id="search-form">
    <label for="city">City</label>
    <input id="city" name="city" value="London" autocomplete="address-level2">
    <button type="submit">Search</button>
  </form>
  <section id="result" aria-live="polite"></section>
</main>`,
      js: `const form = document.getElementById('search-form');
const input = document.getElementById('city');
const result = document.getElementById('result');

const mock = {
  London: { temp: 14, condition: 'Cloudy' },
  Lisbon: { temp: 21, condition: 'Sunny' },
};

function render(city, weather) {
  result.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.textContent = city;
  const p = document.createElement('p');
  p.textContent = weather.temp + '°C — ' + weather.condition;
  result.append(h2, p);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  result.textContent = 'Loading…';
  setTimeout(() => {
    const weather = mock[city];
    if (!weather) {
      result.textContent = 'No weather found for ' + city + '. Try London or Lisbon.';
      return;
    }
    render(city, weather);
    console.log('Rendered weather for', city);
  }, 400);
});`,
    },
    objectives: [
      'Build an interactive app from a feature brief.',
      'Manage loading, success and error states in one render path.',
      'Persist a small preference with localStorage.',
    ],
    tasks: [
      'Replace the mock data with a real fetch request.',
      'Add a retry button that repeats the last search.',
      'Save and restore the last searched city.',
    ],
    takeaways: [
      'A state object plus one render function prevents UI bugs.',
      'Every async feature needs loading, empty, success and error states.',
      'Persist only small, non-sensitive preferences in localStorage.',
    ],
    exercise: exerciseFor('js-23', 'the weather dashboard project', [
      choice('Which state should the app show while a request is running?', ['success', 'loading', 'error', 'idle only'], 1, 'A distinct loading state prevents the UI from looking frozen.'),
      fill('Listen for the form submission.', 'form.___("submit", handleSubmit);', [['addEventListener']], 'addEventListener registers the submit handler.'),
      choice('Why disable the submit button during a request?', ['To style it', 'To prevent duplicate requests', 'To clear the form', 'To enable keyboard input'], 1, 'Disabling prevents impatient users from sending the same request repeatedly.'),
      codeChoiceTemp(),
      jsCode('Write formatTemp(celsius) that rounds and adds "°C".', '// write your function below\n', [
        { expression: 'formatTemp(20.4)', expected: '20°C' },
        { expression: 'formatTemp(-3.6)', expected: '-4°C' },
      ], `function formatTemp(celsius) {\n  return Math.round(celsius) + '°C';\n}`, 'Math.round handles both positive and negative temperatures before adding the unit.'),
      choice('What should happen when a city is not found?', ['Show a blank page', 'Show a clear message and allow another search', 'Crash with a console error only', 'Reload automatically'], 1, 'A visible, recoverable error is part of the feature.'),
    ]),
  },

  {
    id: 'js-24',
    title: 'Project: Test, Refine and Ship',
    summary: 'Harden the dashboard with edge cases, accessibility checks and a clean final review.',
    minutes: 20,
    content: `
<h2 id="edge-cases">Test the edge cases</h2>
<p>Happy-path testing is not enough. Try:</p>
<ul>
  <li>An empty city name.</li>
  <li>A city with spaces, accents or unusual characters.</li>
  <li>A very slow network and a failed request.</li>
  <li>Rapid repeated submissions.</li>
  <li>No saved city on first visit.</li>
  <li>Corrupt or missing localStorage data.</li>
</ul>
<pre><code class="language-javascript">function readLastCity() {
  try {
    return localStorage.getItem('lastCity') || '';
  } catch {
    return '';
  }
}</code></pre>

<h2 id="accessibility">Accessibility review</h2>
<ul>
  <li>The input has a real <code>&lt;label&gt;</code>.</li>
  <li>Status updates use an <code>aria-live</code> region.</li>
  <li>Errors are text, not colour alone.</li>
  <li>Focus moves sensibly after a search.</li>
  <li>Buttons are real buttons and work with Enter/Space.</li>
  <li>Motion respects <code>prefers-reduced-motion</code>.</li>
</ul>

<h2 id="code-review">A quick code review</h2>
<pre><code class="language-javascript">// Before: one large handler with mixed concerns
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  result.textContent = 'Loading…';
  const response = await fetch('...' + input.value);
  const data = await response.json();
  result.textContent = data.temp;
});

// After: explicit states and guarded failure
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  search(city);
});</code></pre>
<p>Separate user input handling, data loading and rendering. Small functions with one responsibility are easier to test and change.</p>

<h2 id="review-checklist">Final checklist</h2>
<ul>
  <li>All async paths end in success or a recoverable error.</li>
  <li>No unhandled promise rejections in the console.</li>
  <li>Keyboard-only operation works.</li>
  <li>Responsive layout at 320px and 1440px.</li>
  <li>No API keys or tokens in the repository.</li>
  <li>README explains how to run the project and which API it uses.</li>
  <li>A short list of next improvements is documented.</li>
</ul>

<h2 id="ship">Ship it</h2>
<p>Deploy to a static host, test the production URL, and open the site in a private window with a fresh localStorage. A project is portfolio-ready when it works for someone else on a different device and network.</p>
`,
    demo: {
      type: 'javascript',
      title: 'Guard edge cases and report state',
      js: `function normaliseCity(value) {
  return String(value || '').trim().replace(/\\s+/g, ' ');
}

function readLastCity() {
  try {
    return 'London';
  } catch {
    return '';
  }
}

function search(city) {
  const normalised = normaliseCity(city);
  if (!normalised) {
    return { status: 'error', message: 'Enter a city name.' };
  }
  return { status: 'loading', city: normalised };
}

console.log(search('  New   York  '));
console.log(search('   '));
console.log('Last city:', readLastCity());`,
    },
    objectives: [
      'Test edge cases before declaring a project finished.',
      'Review accessibility and async failure paths.',
      'Refactor mixed concerns into smaller functions.',
    ],
    tasks: [
      'Add a test for an empty city and a very long city name.',
      'Make sure the result region announces updates.',
      'Write a README with setup and API notes.',
    ],
    takeaways: [
      'Edge cases reveal more bugs than the happy path.',
      'Accessible status updates make async apps usable with screen readers.',
      'Refactoring into small functions makes final changes safer.',
    ],
    exercise: exerciseFor('js-24', 'project review', [
      choice('Which edge case matters most for a search form?', ['The button colour', 'Empty or whitespace-only input', 'The page title', 'The font size'], 1, 'Empty input should be rejected before making a request.'),
      fill('Announce result updates to screen readers.', '<section id="result" aria-___="polite"></section>', [['live']], 'aria-live="polite" announces changes when the user is idle.'),
      choice('What should every async request path end with?', ['A console log only', 'A success state or a recoverable error state', 'A page reload', 'An empty screen'], 1, 'Both success and failure need a clear, usable result.'),
      choice('Which is a code-review improvement?', ['One giant event handler', 'Separating input handling, loading and rendering', 'More global variables', 'Using innerHTML for user input'], 1, 'Separating concerns makes the app easier to test and maintain.'),
      choice('Where should API keys for a front-end project live?', ['In the public JavaScript', 'In the README', 'On a server or proxy', 'In a CSS comment'], 2, 'Secrets must not be shipped to the browser.'),
    ]),
  },
];

/**
 * A small helper used by the weather project exercise. Keeping it here makes
 * the question read naturally without a large inline object literal.
 */
function codeChoiceTemp() {
  return choice(
    'Which render strategy keeps the weather UI consistent?',
    [
      'Update random DOM nodes from several helpers',
      'Derive the UI from one state object with a render function',
      'Reload the page after every request',
      'Store all values in global variables without rendering',
    ],
    1,
    'A single state object and one render function keep loading, success and error views in sync.'
  );
}
