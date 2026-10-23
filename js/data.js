/**
 * data.js — all CodeLearn learning content.
 *
 * Everything the site shows about courses, lessons and exercises lives here.
 * The file only exports data and small lookup helpers, so it is safe to
 * import from page modules, tests, or a Node script.
 *
 * Content formats:
 *  - lesson.content : trusted HTML string (authored here, never user input)
 *  - lesson.demo    : live playground shown on the lesson page
 *      type 'html'        -> html editor + preview iframe
 *      type 'css'         -> html + css editors + preview iframe
 *      type 'javascript'  -> js editor + captured console output
 *      type 'dom'         -> js editor running inside a preview iframe
 *  - lesson.exercise: questions graded by js/grading.js
 *      type 'choice' : multiple choice, `answer` is the correct index
 *      type 'fill'   : code with ___ blanks, `blanks[i].accepts` lists answers
 *      type 'code'   : write code; `tests` (JavaScript) or `checks` (regex)
 *                      validate it. `solution` is the reference answer used
 *                      by the automated tests in tests/validate.mjs.
 */

import { HTML_MODULES, HTML_LESSONS } from './content/html-course.js';
import { CSS_MODULES, CSS_LESSONS } from './content/css-course.js';
import { JS_MODULES, JS_LESSONS } from './content/js-course.js';
import { EXTRA_PROJECTS } from './content/projects-extra.js';

export const COURSES = [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    shortTitle: 'HTML',
    tagline: 'Structure',
    badge: 'HTML',
    badgeClass: 'badge-html',
    heroClass: 'course-hero-html',
    tagClass: 'tag-html',
    description: 'Learn the structure of the web: tags, pages, text, links, images and forms.',
    longDescription:
      'HTML is the backbone of every website. In this course you will learn how to build well-structured pages from scratch, understand elements and attributes, and write forms and semantic markup that search engines and screen readers love.',
    level: 'Beginner',
    accent: '#e34f26',
    lessons: [
      {
        id: 'html-1',
        order: 1,
        title: 'What is HTML?',
        summary: 'Understand what HTML does and write your first elements.',
        minutes: 8,
        content: `
<h2 id="what-is-html">What is HTML?</h2>
<p><strong>HTML</strong> stands for <em>HyperText Markup Language</em>. It is the standard language used to build the structure and content of web pages: headings, paragraphs, lists, images, links, forms, and more.</p>
<p>CSS makes pages beautiful and JavaScript makes them interactive — but <strong>HTML is always the starting point</strong>. Every page you visit on the web is built on top of HTML.</p>

<h2 id="elements">Elements, tags and attributes</h2>
<p>An <strong>element</strong> is written with an <em>opening tag</em>, some content, and a <em>closing tag</em>:</p>
<pre><code class="language-html">&lt;p&gt;Hello, world!&lt;/p&gt;</code></pre>
<ul>
  <li><code>&lt;p&gt;</code> is the opening tag.</li>
  <li><code>Hello, world!</code> is the content of the element.</li>
  <li><code>&lt;/p&gt;</code> is the closing tag (note the slash).</li>
</ul>
<p>Some elements are <strong>self-closing</strong> because they wrap nothing — for example the line break <code>&lt;br&gt;</code> or the image <code>&lt;img&gt;</code>.</p>
<p>Elements can carry extra information with <strong>attributes</strong>, written inside the opening tag:</p>
<pre><code class="language-html">&lt;img src="cat.jpg" alt="A smiling cat"&gt;</code></pre>
<p>Here <code>src</code> and <code>alt</code> are attributes. <code>src</code> says <em>which</em> image to show, and <code>alt</code> describes it for screen readers and if the image fails to load.</p>

<div class="note note-tip"><strong>Tag syntax tip</strong>Angle brackets <code>&lt; &gt;</code> wrap every tag. Attribute values almost always use quotes: <code>attr="value"</code>.</div>

<h2 id="first-example">A tiny complete page</h2>
<p>Here is a minimal HTML document. Do not worry about every line yet — you will learn each part in the next lessons:</p>
<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My first page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
    &lt;p&gt;I am learning HTML.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>Try the live example below: edit the HTML on the left and watch the preview on the right update instantly.</p>
`,
        demo: {
          type: 'html',
          title: 'Edit HTML and see the result',
          html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, world!</h1>
    <p>I am learning <strong>HTML</strong>.</p>
    <p>Edit me in the editor!</p>
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-1',
          title: 'Exercise: elements and attributes',
          questions: [
            {
              type: 'choice',
              prompt: 'Which language gives a web page its structure and content?',
              options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
              answer: 0,
              explain: 'HTML structures the content; CSS styles it and JavaScript adds behaviour.',
            },
            {
              type: 'choice',
              prompt: 'What is an HTML element?',
              options: [
                'A piece of content wrapped in an opening and a closing tag',
                'A CSS colour value',
                'A JavaScript function',
                'A web browser',
              ],
              answer: 0,
              explain: 'Most elements look like &lt;tag&gt;content&lt;/tag&gt;.',
            },
            {
              type: 'fill',
              prompt: 'Complete the paragraph element so it shows “Hello, world!”.',
              code: '<___>Hello, world!</___>',
              blanks: [{ accepts: ['p'] }, { accepts: ['p'] }],
              explain: 'The paragraph element is &lt;p&gt;…&lt;/p&gt;.',
            },
          ],
        },
      },
      {
        id: 'html-2',
        order: 2,
        title: 'Your first HTML page',
        summary: 'The document skeleton: doctype, head, body and nesting.',
        minutes: 10,
        content: `
<h2 id="skeleton">The page skeleton</h2>
<p>Every HTML page starts with a <strong>doctype declaration</strong> so browsers use modern standards:</p>
<pre><code class="language-html">&lt;!DOCTYPE html&gt;</code></pre>
<p>Then comes the root <code>&lt;html&gt;</code> element with two children:</p>
<ul>
  <li><code>&lt;head&gt;</code> — invisible settings for the browser: character encoding, page title, links to CSS, meta information.</li>
  <li><code>&lt;body&gt;</code> — everything the visitor actually sees: headings, text, images, buttons…</li>
</ul>
<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My portfolio&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Welcome to my portfolio&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

<h2 id="nesting">Nesting rules</h2>
<p>Elements can be placed inside other elements — this is called <strong>nesting</strong>. Like Russian dolls, tags must close in the reverse order they were opened:</p>
<pre><code class="language-html">&lt;article&gt;
  &lt;h2&gt;My favourite food&lt;/h2&gt;
  &lt;p&gt;I love &lt;strong&gt;pasta&lt;/strong&gt;.&lt;/p&gt;
&lt;/article&gt;</code></pre>
<p>Good nesting keeps pages predictable and easy to debug. A common beginner mistake is “overlapping” tags — never close a tag inside a different one.</p>

<div class="note"><strong>The title element</strong>The <code>&lt;title&gt;</code> inside <code>&lt;head&gt;</code> appears on the browser tab and in search engine results. Give every page a unique, descriptive title.</div>

<h2 id="lang">The language attribute</h2>
<p>Setting <code>&lt;html lang="en"&gt;</code> tells assistive tools which language the page uses, which helps screen readers pronounce text correctly and improves accessibility.</p>
`,
        demo: {
          type: 'html',
          title: 'A complete page skeleton',
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My page</title>
  </head>
  <body>
    <h1>Welcome to my page</h1>
    <p>This content lives inside the body element.</p>
    <p>Try adding another heading below!</p>
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-2',
          title: 'Exercise: the document structure',
          questions: [
            {
              type: 'fill',
              prompt: 'Write the doctype declaration that starts every modern HTML page.',
              code: '___ html',
              blanks: [{ accepts: ['<!doctype html>'] }],
              explain: 'The declaration is <!DOCTYPE html> (case does not matter).',
            },
            {
              type: 'choice',
              prompt: 'Where does the &lt;title&gt; element belong?',
              options: [
                'Inside the &lt;head&gt;',
                'Inside the &lt;body&gt;',
                'Before the doctype',
                'Outside the &lt;html&gt; element',
              ],
              answer: 0,
              explain: 'The head holds metadata such as the page title.',
            },
            {
              type: 'choice',
              prompt: 'Which nesting is correct?',
              options: [
                '&lt;p&gt;I like &lt;strong&gt;tea&lt;/strong&gt;.&lt;/p&gt;',
                '&lt;p&gt;I like &lt;strong&gt;tea.&lt;/p&gt;&lt;/strong&gt;',
                '&lt;strong&gt;&lt;p&gt;I like tea.&lt;/strong&gt;&lt;/p&gt;',
                '&lt;p I like &lt;strong&gt;tea&lt;/strong&gt;.',
              ],
              answer: 0,
              explain: 'The inner &lt;strong&gt; must close before the outer &lt;/p&gt;.',
            },
          ],
        },
      },
      {
        id: 'html-3',
        order: 3,
        title: 'Text, headings and paragraphs',
        summary: 'Organise written content with headings, paragraphs and emphasis.',
        minutes: 9,
        content: `
<h2 id="headings">Headings</h2>
<p>HTML provides six heading levels, from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code> (least important). Visually they get smaller, but their real job is <strong>outline and structure</strong>:</p>
<pre><code class="language-html">&lt;h1&gt;My cooking blog&lt;/h1&gt;
&lt;h2&gt;Pasta recipes&lt;/h2&gt;
&lt;h3&gt;Spaghetti carbonara&lt;/h3&gt;</code></pre>
<p>Aim for a single <code>&lt;h1&gt;</code> per page describing the page, then use <code>&lt;h2&gt;</code> for main sections and <code>&lt;h3&gt;</code> for subsections. Never pick a level just because it “looks better” — screen readers and search engines use the hierarchy.</p>

<h2 id="paragraphs">Paragraphs and line breaks</h2>
<p>Blocks of text go inside <code>&lt;p&gt;</code> elements. Browsers add space between paragraphs automatically. Use <code>&lt;br&gt;</code> sparingly — only for things like addresses or poems where a line break has real meaning:</p>
<pre><code class="language-html">&lt;p&gt;The first line.&lt;/p&gt;
&lt;p&gt;The second paragraph, with space above it.&lt;/p&gt;</code></pre>

<h2 id="emphasis">Emphasis</h2>
<ul>
  <li><code>&lt;strong&gt;</code> — strong importance (rendered bold by default).</li>
  <li><code>&lt;em&gt;</code> — emphasis (rendered italic by default).</li>
  <li><code>&lt;small&gt;</code> — fine print such as captions or disclaimers.</li>
</ul>
<pre><code class="language-html">&lt;p&gt;&lt;strong&gt;Warning:&lt;/strong&gt; the oven is hot. &lt;em&gt;Really&lt;/em&gt; hot.&lt;/p&gt;</code></pre>

<div class="note note-tip"><strong>Markup carries meaning</strong>Use <code>&lt;strong&gt;</code> not just <code>&lt;b&gt;</code>: the first tells machines “this is important”, the second only says “make it bold”.</div>

<h2 id="comments">Comments</h2>
<p>You can leave notes in your code that browsers ignore:</p>
<pre><code class="language-html">&lt;!-- This is a comment. It will not be displayed. --&gt;</code></pre>
<p>Comments are great for marking sections or explaining tricky parts to your future self.</p>
`,
        demo: {
          type: 'html',
          title: 'Headings, paragraphs and emphasis',
          html: `<!DOCTYPE html>
<html>
  <body>
    <h1>My cooking blog</h1>
    <p>Welcome! Today we cook <em>simple</em> pasta.</p>
    <h2>Ingredients</h2>
    <p><strong>Spaghetti</strong>, eggs, pecorino, pepper.</p>
    <p>Boil the pasta.<!-- try removing this comment --></p>
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-3',
          title: 'Exercise: text markup',
          questions: [
            {
              type: 'choice',
              prompt: 'Which heading tag is the most important on a page?',
              options: ['&lt;h1&gt;', '&lt;h6&gt;', '&lt;header&gt;', '&lt;strong&gt;'],
              answer: 0,
              explain: 'Use one &lt;h1&gt; for the main topic of the page.',
            },
            {
              type: 'fill',
              prompt: 'Wrap the word “important” in an element that shows strong importance.',
              code: '<p>This is ___ message.</p>',
              blanks: [{ accepts: ['<strong>important</strong>', 'strong>important</strong'] }],
              explain: 'Strong importance uses &lt;strong&gt;…&lt;/strong&gt;.',
            },
            {
              type: 'choice',
              prompt: 'What is the purpose of an HTML comment?',
              options: [
                'To leave notes in the code that browsers do not display',
                'To display italic text',
                'To add a heading',
                'To link a stylesheet',
              ],
              answer: 0,
              explain: 'Comments start with &lt;!-- and end with --&gt;.',
            },
          ],
        },
      },
      {
        id: 'html-4',
        order: 4,
        title: 'Links, images and lists',
        summary: 'Connect pages with links, add pictures and organise items in lists.',
        minutes: 11,
        content: `
<h2 id="links">Links</h2>
<p>The anchor element <code>&lt;a&gt;</code> creates hyperlinks. The <code>href</code> attribute holds the destination:</p>
<pre><code class="language-html">&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;
&lt;a href="about.html"&gt;About this site&lt;/a&gt;
&lt;a href="#recipes"&gt;Jump to recipes&lt;/a&gt;</code></pre>
<ul>
  <li><strong>Absolute URLs</strong> include the protocol: <code>https://…</code></li>
  <li><strong>Relative URLs</strong> point to a file next to the current page: <code>about.html</code></li>
  <li><strong>Fragments</strong> starting with <code>#</code> jump to an element id on the same page.</li>
</ul>

<h2 id="images">Images</h2>
<p>The image element is self-closing and needs at least a <code>src</code>:</p>
<pre><code class="language-html">&lt;img src="sunset.jpg" alt="A sunset over the sea" width="600"&gt;</code></pre>
<p>Always write a meaningful <code>alt</code> description. It is shown when the image cannot load and read aloud by screen readers. Decorative images can use an empty <code>alt=""</code>.</p>

<h2 id="lists">Lists</h2>
<p>Two common list types:</p>
<pre><code class="language-html">&lt;ul&gt;
  &lt;li&gt;Milk&lt;/li&gt;
  &lt;li&gt;Bread&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
  &lt;li&gt;Preheat the oven&lt;/li&gt;
  &lt;li&gt;Mix the dough&lt;/li&gt;
&lt;/ol&gt;</code></pre>
<ul>
  <li><code>&lt;ul&gt;</code> — unordered (bullet) list for items without a natural order.</li>
  <li><code>&lt;ol&gt;</code> — ordered (numbered) list for steps and rankings.</li>
</ul>
<p>Each item is an <code>&lt;li&gt;</code> and lists can be nested inside one another.</p>

<div class="note note-warn"><strong>Link tips</strong>Never write “click here” as link text — describe the destination, like “read our HTML guide”. Screen reader users often list all links on a page.</div>
`,
        demo: {
          type: 'html',
          title: 'Links, images and lists together',
          html: `<!DOCTYPE html>
<html>
  <body>
    <h1>My weekend</h1>
    <p>Read more on <a href="https://developer.mozilla.org">MDN Web Docs</a>.</p>
    <ul>
      <li>Hike in the morning</li>
      <li>Cook pasta at noon</li>
    </ul>
    <ol>
      <li>Boil water</li>
      <li>Add pasta</li>
    </ol>
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='90'%3E%3Crect width='200' height='90' fill='%234f46e5'/%3E%3Ctext x='100' y='52' text-anchor='middle' fill='white' font-family='sans-serif' font-size='16'%3EAn image!%3C/text%3E%3C/svg%3E" alt="A purple placeholder image">
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-4',
          title: 'Exercise: links, images, lists',
          questions: [
            {
              type: 'fill',
              prompt: 'Create a link to https://example.com with the text “Example”.',
              code: '<a ___="https://example.com">Example</a>',
              blanks: [{ accepts: ['href'] }],
              explain: 'The href attribute stores the link destination.',
            },
            {
              type: 'fill',
              prompt: 'Describe the image for screen readers using the right attribute.',
              code: '<img src="cat.jpg" ___="A smiling cat">',
              blanks: [{ accepts: ['alt'] }],
              explain: 'The alt attribute provides alternative text.',
            },
            {
              type: 'choice',
              prompt: 'Which list is best for a recipe’s preparation steps?',
              options: [
                'An ordered list &lt;ol&gt;',
                'An unordered list &lt;ul&gt;',
                'A paragraph',
                'A heading',
              ],
              answer: 0,
              explain: 'Steps have a specific order, so a numbered &lt;ol&gt; fits.',
            },
          ],
        },
      },
      {
        id: 'html-5',
        order: 5,
        title: 'Forms and semantic HTML',
        summary: 'Collect user input with forms and structure pages with semantic elements.',
        minutes: 12,
        content: `
<h2 id="forms">Forms</h2>
<p>Forms collect information from visitors. A basic form wraps inputs in a <code>&lt;form&gt;</code> element:</p>
<pre><code class="language-html">&lt;form&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input type="email" id="email" name="email" placeholder="you@example.com" required&gt;

  &lt;label for="message"&gt;Message&lt;/label&gt;
  &lt;textarea id="message" name="message"&gt;&lt;/textarea&gt;

  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>
<ul>
  <li><code>&lt;label&gt;</code> describes the field. Its <code>for</code> attribute must match the input’s <code>id</code> — clicking the label then focuses the field.</li>
  <li><code>name</code> is the key sent to the server when the form is submitted.</li>
  <li>Input types like <code>email</code>, <code>number</code> or <code>date</code> give mobile users a suitable keyboard and built-in validation.</li>
</ul>

<h2 id="form-controls">Common controls</h2>
<ul>
  <li><code>&lt;input type="text|email|password|number|date|checkbox|radio"&gt;</code></li>
  <li><code>&lt;textarea&gt;</code> — multi-line text.</li>
  <li><code>&lt;select&gt;</code> with <code>&lt;option&gt;</code> — dropdown menu.</li>
  <li><code>&lt;button type="submit"&gt;</code> — sends the form.</li>
</ul>

<h2 id="semantic">Semantic structure</h2>
<p>Semantic elements describe their <em>meaning</em>, not just their appearance:</p>
<pre><code class="language-html">&lt;header&gt;
  &lt;h1&gt;My site&lt;/h1&gt;
  &lt;nav&gt;&lt;a href="index.html"&gt;Home&lt;/a&gt;&lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;section&gt;
    &lt;h2&gt;Articles&lt;/h2&gt;
    &lt;article&gt;...&lt;/article&gt;
  &lt;/section&gt;
&lt;/main&gt;

&lt;footer&gt;© 2026 My site&lt;/footer&gt;</code></pre>
<p>Using <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code> and <code>&lt;footer&gt;</code> improves accessibility, SEO and readability for other developers.</p>

<div class="note"><strong>One main per page</strong>Each page should have a single <code>&lt;main&gt;</code> element holding its unique content — that is where screen readers jump to first.</div>
`,
        demo: {
          type: 'html',
          title: 'A small contact form',
          html: `<!DOCTYPE html>
<html>
  <body>
    <header>
      <h1>Contact me</h1>
    </header>
    <main>
      <form>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required>

        <label for="topic">Topic</label>
        <select id="topic" name="topic">
          <option>Question</option>
          <option>Feedback</option>
        </select>

        <button type="button">Send (demo)</button>
      </form>
    </main>
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-5',
          title: 'Exercise: forms and semantics',
          questions: [
            {
              type: 'choice',
              prompt: 'Why should a &lt;label&gt; use for="…" matching an input’s id?',
              options: [
                'So clicking the label focuses the matching input',
                'To colour the input',
                'To hide the input',
                'To validate CSS',
              ],
              answer: 0,
              explain: 'The association helps mouse users and is essential for screen readers.',
            },
            {
              type: 'fill',
              prompt: 'Use an input type that shows an email keyboard and validates email format.',
              code: '<input type="___" name="email">',
              blanks: [{ accepts: ['email'] }],
              explain: 'type="email" gives built-in email validation.',
            },
            {
              type: 'choice',
              prompt: 'Which element holds the unique main content of the page?',
              options: ['&lt;main&gt;', '&lt;div&gt;', '&lt;span&gt;', '&lt;aside&gt;'],
              answer: 0,
              explain: '&lt;main&gt; should appear once per page.',
            },
          ],
        },
      },
      {
        id: 'html-6',
        order: 6,
        title: 'Tables and data',
        summary: 'Structure tabular data with tables, headers and captions.',
        minutes: 12,
        content: `
<h2 id="tables">HTML Tables</h2>
<p>Tables display structured data in rows and columns using <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code>.</p>
<pre><code class="language-html">&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th&gt;Course&lt;/th&gt;&lt;th&gt;Level&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;td&gt;HTML&lt;/td&gt;&lt;td&gt;Beginner&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
<div class="note"><strong>Tip</strong> Use <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and <code>&lt;caption&gt;</code> for clarity and accessibility.</div>
`,
        demo: {
          type: 'html',
          title: 'Build a simple table',
          html: `<!DOCTYPE html>
<html>
  <body>
    <table border="1" cellpadding="6">
      <caption>Weekly Schedule</caption>
      <thead><tr><th>Day</th><th>Topic</th></tr></thead>
      <tbody><tr><td>Mon</td><td>HTML</td></tr><tr><td>Tue</td><td>CSS</td></tr></tbody>
    </table>
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-6',
          title: 'Exercise: tables',
          questions: [
            {
              type: 'choice',
              prompt: 'Which element defines a table header cell?',
              options: ['<td>', '<th>', '<tr>', '<thead>'],
              answer: 1,
              explain: '<th> creates header cells.',
            },
            {
              type: 'fill',
              prompt: 'Wrap data in a table row.',
              code: '___<td>HTML</td>___',
              blanks: [{ accepts: ['<tr>'] }, { accepts: ['</tr>'] }],
              explain: 'Rows use <tr>…</tr>.',
            },
            {
              type: 'code',
              language: 'html',
              prompt: 'Create a table with one row containing a header cell with text “Name”.',
              starter: '<!-- write your HTML below -->\n',
              checks: [
                { pattern: '<table', flags: 'i', message: 'Use a <table> element' },
                { pattern: '<th>\s*Name\s*</th>', flags: 'i', message: 'Add a <th> with text Name' },
              ],
              solution: `<table>
  <tr>
    <th>Name</th>
  </tr>
</table>`,
              explain: 'Structure: <table><tr><th>Name</th></tr></table>',
            },
          ],
        },
      },
      {
        id: 'html-7',
        order: 7,
        title: 'Accessibility and document structure',
        summary: 'Write inclusive markup with landmarks, labels and ARIA basics.',
        minutes: 15,
        content: `
<h2 id="why-a11y">Why accessibility matters</h2>
<p>Accessible HTML works for everyone: keyboard users, screen reader users, people on slow connections, and search engines. Most accessibility wins come from using the right element for the job.</p>
<ul>
  <li>Use <strong>landmark elements</strong>: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>.</li>
  <li>Keep a logical heading order — never skip from <code>h2</code> to <code>h5</code> for style.</li>
  <li>Give every form control a <code>&lt;label&gt;</code>.</li>
  <li>Use <code>alt</code> text for meaningful images and <code>alt=""</code> for decorative ones.</li>
  <li>Never remove focus outlines without providing a visible replacement.</li>
</ul>

<h2 id="aria">ARIA in one minute</h2>
<p><strong>ARIA</strong> attributes describe roles and states to assistive technology. The first rule of ARIA is: <em>do not use ARIA if a native element already does the job</em>.</p>
<pre><code class="language-html">&lt;button aria-pressed="true"&gt;Saved&lt;/button&gt;
&lt;div role="alert"&gt;Changes saved&lt;/div&gt;</code></pre>
<div class="note note-tip"><strong>Keyboard check</strong> Put your mouse away and tab through your page. Can you reach and activate everything? That is the simplest accessibility test there is.</div>
`,
        demo: {
          type: 'html',
          title: 'Accessible landmarks and labels',
          html: `<!DOCTYPE html>
<html>
  <body>
    <header><h1>Accessible page</h1></header>
    <main>
      <label for="email">Email address</label>
      <input id="email" type="email" placeholder="you@example.com">
      <p><button type="button">Subscribe</button></p>
    </main>
  </body>
</html>`,
        },
        exercise: {
          id: 'ex-html-7',
          title: 'Exercise: accessible markup',
          questions: [
            {
              type: 'choice',
              prompt: 'Which element should wrap the unique main content of a page?',
              options: ['<section>', '<main>', '<div>', '<article>'],
              answer: 1,
              explain: '<main> identifies the primary content and should appear once per page.',
            },
            {
              type: 'fill',
              prompt: 'Associate a label with an input using the for attribute.',
              code: '<label ___="name">Name</label>\n<input id="name" type="text">',
              blanks: [{ accepts: ['for'] }],
              explain: 'label[for] must match the input id.',
            },
            {
              type: 'choice',
              prompt: 'What is the best alt text for a purely decorative image?',
              options: ['"image"', 'A long description', 'alt=""', 'Omit the img element'],
              answer: 2,
              explain: 'An empty alt tells screen readers to skip decorative images.',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'css',
    title: 'CSS Styling',
    shortTitle: 'CSS',
    tagline: 'Style',
    badge: 'CSS',
    badgeClass: 'badge-css',
    heroClass: 'course-hero-css',
    tagClass: 'tag-css',
    description: 'Make pages beautiful: selectors, colours, the box model, Flexbox and responsive layouts.',
    longDescription:
      'CSS controls how HTML looks. This course takes you from your first stylesheet to modern layout techniques: the box model, Flexbox, colours and typography, and media queries that make your pages work on every screen.',
    level: 'Beginner',
    accent: '#1572b6',
    lessons: [
      {
        id: 'css-1',
        order: 1,
        title: 'Getting started with CSS',
        summary: 'Add styles to a page and learn the most common selectors.',
        minutes: 10,
        content: `
<h2 id="what-css">What is CSS?</h2>
<p><strong>CSS</strong> (Cascading Style Sheets) describes how HTML elements are displayed: colours, spacing, fonts, layouts and animations. A rule has two parts:</p>
<pre><code class="language-css">selector {
  property: value;
}</code></pre>
<p>For example <code>p { color: blue; }</code> turns every paragraph blue.</p>

<h2 id="ways">Three ways to add CSS</h2>
<ol>
  <li><strong>External stylesheet</strong> (recommended): a <code>&lt;link&gt;</code> in the head.</li>
  <li><strong>Internal</strong>: a <code>&lt;style&gt;</code> block in the page (fine for small demos).</li>
  <li><strong>Inline</strong>: <code>style="…"</code> directly on an element — avoid it for anything real.</li>
</ol>
<pre><code class="language-html">&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>

<h2 id="selectors">Essential selectors</h2>
<ul>
  <li><code>p</code> — <strong>element</strong> selector: all paragraph elements.</li>
  <li><code>.card</code> — <strong>class</strong> selector (dot + class name): any element with <code>class="card"</code>. The most used selector.</li>
  <li><code>#main-title</code> — <strong>id</strong> selector (hash + id): the one element with that id.</li>
</ul>
<pre><code class="language-css">h1 {
  color: #333;
}

.highlight {
  background: yellow;
}

#main-title {
  font-size: 2rem;
}</code></pre>

<div class="note note-tip"><strong>Prefer classes</strong>Classes can be reused on many elements and are easy to combine, which keeps stylesheets flexible.</div>

<h2 id="cascade">The cascade, briefly</h2>
<p>When several rules target the same element, the browser picks a winner: more specific selectors beat general ones, and <code>!important</code> (rarely a good idea) beats almost everything. Understanding this saves hours of debugging.</p>
`,
        demo: {
          type: 'css',
          title: 'Your first stylesheet',
          html: `<h1>Hello CSS</h1>
<p class="intro">This paragraph uses a class selector.</p>
<p>A plain paragraph.</p>
<div class="card">I am a styled card.</div>`,
          css: `body {
  font-family: system-ui, sans-serif;
  padding: 16px;
}

h1 {
  color: #1572b6;
}

.intro {
  color: #5a6480;
  font-style: italic;
}

.card {
  border: 2px solid #1572b6;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
}`,
        },
        exercise: {
          id: 'ex-css-1',
          title: 'Exercise: selectors',
          questions: [
            {
              type: 'choice',
              prompt: 'Which element links an external CSS file to an HTML page?',
              options: ['&lt;link&gt;', '&lt;style&gt;', '&lt;css&gt;', '&lt;script&gt;'],
              answer: 0,
              explain: 'The &lt;link&gt; element with rel="stylesheet" loads a CSS file.',
            },
            {
              type: 'fill',
              prompt: 'Write the selector that targets every element with class="highlight".',
              code: '___ {\n  background: yellow;\n}',
              blanks: [{ accepts: ['.highlight'] }],
              explain: 'Class selectors start with a dot.',
            },
            {
              type: 'choice',
              prompt: 'Which selector targets an element with id="title"?',
              options: ['#title', '.title', 'title', '*title'],
              answer: 0,
              explain: 'Id selectors start with #.',
            },
          ],
        },
      },
      {
        id: 'css-2',
        order: 2,
        title: 'Colours, fonts and backgrounds',
        summary: 'Set text colours, choose fonts and add background colours or images.',
        minutes: 10,
        content: `
<h2 id="colours">Colour values</h2>
<p>CSS understands several colour formats:</p>
<pre><code class="language-css">.named    { color: tomato; }
.hex      { color: #e34f26; }
.rgb      { color: rgb(227, 79, 38); }
.rgba     { color: rgb(227 79 38 / 0.5); }  /* last number = transparency */</code></pre>
<p>Named colours are quick for learning; hex or <code>rgb()</code> give you every possible colour. The optional alpha value (<code>0</code> invisible → <code>1</code> solid) creates see-through effects.</p>

<h2 id="typography">Typography</h2>
<pre><code class="language-css">body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #182033;
}

h1 {
  font-weight: 800;
  letter-spacing: -0.02em;
}</code></pre>
<ul>
  <li><code>font-family</code> lists fonts in order of preference — always end with a generic family like <code>serif</code> or <code>sans-serif</code>.</li>
  <li><code>rem</code> units scale with the user’s browser settings, which is great for accessibility.</li>
  <li><code>line-height</code> around <code>1.5</code> makes paragraphs comfortable to read.</li>
</ul>

<h2 id="backgrounds">Backgrounds</h2>
<pre><code class="language-css">.hero {
  background-color: #1e1b4b;
  background-image: linear-gradient(135deg, #312e81, #4f46e5);
  background-size: cover;
  color: white;
  padding: 3rem;
  border-radius: 12px;
}</code></pre>
<p>Gradients via <code>background-image</code> are a lightweight way to add depth without shipping image files.</p>

<div class="note"><strong>Contrast matters</strong>Check that text has enough contrast against its background. Light grey text on white is a common accessibility trap.</div>
`,
        demo: {
          type: 'css',
          title: 'Colours and typography',
          html: `<div class="hero">
  <h2>Discover the mountains</h2>
  <p>A weekend of hiking and fresh air.</p>
</div>
<p class="caption">Photo caption in small grey text.</p>`,
          css: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

.hero {
  background-image: linear-gradient(135deg, #312e81, #4f46e5);
  color: #fff;
  padding: 32px;
  border-radius: 12px;
}

.hero p {
  color: #c7d2fe;
}

.caption {
  color: #5a6480;
  font-size: 0.85rem;
  padding: 0 8px;
}`,
        },
        exercise: {
          id: 'ex-css-2',
          title: 'Exercise: colours and fonts',
          questions: [
            {
              type: 'fill',
              prompt: 'Set the text colour of all headings to dark grey using a hex value.',
              code: 'h1 {\n  ___: #333333;\n}',
              blanks: [{ accepts: ['color'] }],
              explain: 'The color property sets text colour.',
            },
            {
              type: 'choice',
              prompt: 'Which unit scales with the user’s browser font-size setting?',
              options: ['rem', 'px', 'pt', 'deg'],
              answer: 0,
              explain: 'rem/em are relative units; px is fixed.',
            },
            {
              type: 'fill',
              prompt: 'Give this element a red background.',
              code: '.banner {\n  ___-color: red;\n}',
              blanks: [{ accepts: ['background', 'background-color'] }],
              explain: 'background-color sets the background colour.',
            },
          ],
        },
      },
      {
        id: 'css-3',
        order: 3,
        title: 'The box model',
        summary: 'Understand content, padding, border and margin — and control spacing like a pro.',
        minutes: 11,
        content: `
<h2 id="box">Every element is a box</h2>
<p>In CSS, each element is a rectangular box made of four layers, from the inside out:</p>
<ol>
  <li><strong>Content</strong> — the text or image itself.</li>
  <li><strong>Padding</strong> — space inside the border, around the content.</li>
  <li><strong>Border</strong> — the visible edge of the box.</li>
  <li><strong>Margin</strong> — space outside the border, separating the box from its neighbours.</li>
</ol>
<pre><code class="language-css">.card {
  width: 240px;
  padding: 16px;
  border: 2px solid #dfe4f0;
  margin: 12px;
  border-radius: 8px;
}</code></pre>

<h2 id="box-sizing">The box-sizing trap</h2>
<p>By default, <code>width</code> sets only the <em>content</em> width — padding and border are added on top, which surprises everyone at least once. The fix every project uses:</p>
<pre><code class="language-css">* {
  box-sizing: border-box;
}</code></pre>
<p>With <code>border-box</code>, <code>width: 240px</code> means the whole box (content + padding + border) is 240px wide.</p>

<h2 id="shorthand">Shorthand values</h2>
<p>Padding, margin and border accept shorthands for the four sides (top, right, bottom, left — clockwise):</p>
<pre><code class="language-css">.box {
  margin: 8px 16px;        /* top/bottom 8px, left/right 16px */
  padding: 1rem;           /* all sides */
  border-width: 1px 1px 1px 4px;
}</code></pre>

<div class="note note-tip"><strong>Debug spacing</strong>When layout looks wrong, outline the boxes: <code>outline: 1px solid red;</code> makes the invisible margins obvious.</div>
`,
        demo: {
          type: 'css',
          title: 'See the box model',
          html: `<div class="box">box-sizing: content-box</div>
<div class="box border-box">box-sizing: border-box</div>`,
          css: `body {
  font-family: system-ui, sans-serif;
}

.box {
  width: 220px;
  padding: 20px;
  border: 6px solid #1572b6;
  margin: 12px 0;
  background: #e5f1fb;
  border-radius: 8px;
}

.border-box {
  box-sizing: border-box;
  border-color: #0f9d58;
  background: #e7f7ee;
}`,
        },
        exercise: {
          id: 'ex-css-3',
          title: 'Exercise: the box model',
          questions: [
            {
              type: 'choice',
              prompt: 'Which order do the box model layers go, from inside out?',
              options: [
                'Content, padding, border, margin',
                'Margin, border, padding, content',
                'Content, border, margin, padding',
                'Padding, content, margin, border',
              ],
              answer: 0,
              explain: 'Content is wrapped by padding, then the border, then margin outside.',
            },
            {
              type: 'fill',
              prompt: 'Make the width include padding and border.',
              code: '* {\n  box-sizing: ___;\n}',
              blanks: [{ accepts: ['border-box'] }],
              explain: 'box-sizing: border-box is the modern default.',
            },
            {
              type: 'fill',
              prompt: 'Apply 12px of padding on every side using one value.',
              code: '.card {\n  padding: ___;\n}',
              blanks: [{ accepts: ['12px'] }],
              explain: 'One value in the shorthand applies to all four sides.',
            },
          ],
        },
      },
      {
        id: 'css-4',
        order: 4,
        title: 'Flexbox layouts',
        summary: 'Align and distribute space between items with one-dimensional layouts.',
        minutes: 12,
        content: `
<h2 id="flex-intro">Why Flexbox?</h2>
<p><strong>Flexbox</strong> is the go-to tool for laying out items in a row or a column, with automatic spacing and alignment. You enable it on a container, and its direct children become flexible items:</p>
<pre><code class="language-css">.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}</code></pre>

<h2 id="axes">Main axis and cross axis</h2>
<ul>
  <li><code>flex-direction: row</code> (default) — main axis is horizontal.</li>
  <li><code>flex-direction: column</code> — main axis is vertical.</li>
</ul>
<p>Then two alignment properties control positioning:</p>
<ul>
  <li><code>justify-content</code> — aligns items along the <strong>main</strong> axis (e.g. <code>center</code>, <code>space-between</code>, <code>flex-end</code>).</li>
  <li><code>align-items</code> — aligns items along the <strong>cross</strong> axis (e.g. <code>stretch</code>, <code>center</code>, <code>flex-start</code>).</li>
</ul>

<h2 id="flex-items">Growing and shrinking items</h2>
<pre><code class="language-css">.sidebar {
  flex: 1;          /* take an equal share of free space */
}

.content {
  flex: 3;          /* three times more space than the sidebar */
}</code></pre>
<p>The <code>gap</code> property adds consistent space between items — much cleaner than margin hacks.</p>

<div class="note note-tip"><strong>Practice mentally</strong>Ask two questions for any flex layout: <em>which way does the main axis run?</em> and <em>how should items share the leftover space?</em></div>
`,
        demo: {
          type: 'css',
          title: 'A navigation bar with Flexbox',
          html: `<div class="navbar-demo">
  <span class="brand">Brand</span>
  <nav class="links">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</div>
<div class="cards">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
</div>`,
          css: `body {
  font-family: system-ui, sans-serif;
  padding: 16px;
}

.navbar-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #1e1b4b;
  color: #fff;
  border-radius: 8px;
}

.links {
  display: flex;
  gap: 16px;
}

.links a {
  color: #c7d2fe;
  text-decoration: none;
}

.cards {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.card {
  flex: 1;
  padding: 16px;
  background: #e5f1fb;
  border-radius: 8px;
  text-align: center;
}`,
        },
        exercise: {
          id: 'ex-css-4',
          title: 'Exercise: Flexbox',
          questions: [
            {
              type: 'fill',
              prompt: 'Turn this element into a flex container.',
              code: '.menu {\n  display: ___;\n}',
              blanks: [{ accepts: ['flex'] }],
              explain: 'display: flex enables Flexbox on the container.',
            },
            {
              type: 'choice',
              prompt: 'With flex-direction: row, what does justify-content: center control?',
              options: [
                'Horizontal centring along the main axis',
                'Vertical centring along the cross axis',
                'The gap between lines',
                'The flex item order',
              ],
              answer: 0,
              explain: 'justify-content works on the main axis (row = horizontal).',
            },
            {
              type: 'fill',
              prompt: 'Add 1rem of space between flex items without using margins.',
              code: '.menu {\n  display: flex;\n  ___: 1rem;\n}',
              blanks: [{ accepts: ['gap'] }],
              explain: 'The gap property spaces flex items evenly.',
            },
          ],
        },
      },
      {
        id: 'css-5',
        order: 5,
        title: 'Responsive design',
        summary: 'Make pages work beautifully on phones, tablets and desktops.',
        minutes: 12,
        content: `
<h2 id="why-responsive">Why responsive?</h2>
<p>Visitors arrive on screens of every size. A responsive page adapts its layout instead of forcing users to scroll sideways or squint at tiny text.</p>

<h2 id="viewport">The viewport meta tag</h2>
<p>Every responsive page starts with this line in the <code>&lt;head&gt;</code>:</p>
<pre><code class="language-html">&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>
<p>Without it, mobile browsers pretend to be ~980px wide and shrink your page into unreadable miniaturisation.</p>

<h2 id="media-queries">Media queries</h2>
<p>Media queries apply CSS only when a condition matches, usually the screen width:</p>
<pre><code class="language-css">/* mobile first: base styles for small screens */
.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* then enhance for wider screens */
@media (min-width: 700px) {
  .cards {
    flex-direction: row;
  }
}</code></pre>
<p><strong>Mobile-first</strong> means the default styles target phones and larger screens “unlock” more space. It keeps CSS simple and performance high.</p>

<h2 id="units">Fluid units</h2>
<ul>
  <li><code>%</code> — a fraction of the parent’s size.</li>
  <li><code>rem</code> — relative to the root font size (accessibility friendly).</li>
  <li><code>vw</code> / <code>vh</code> — viewport width / height.</li>
  <li><code>max-width</code> — the secret to readable text columns: let content grow fluidly but cap it around 60–70 characters.</li>
</ul>
<pre><code class="language-css">.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}</code></pre>

<div class="note note-warn"><strong>Test both ways</strong>Resize your browser window while developing — the layout should never break, no matter how narrow it gets.</div>
`,
        demo: {
          type: 'css',
          title: 'A responsive card grid',
          html: `<p>Resize the preview panel…</p>
<div class="grid">
  <div class="card">Card one</div>
  <div class="card">Card two</div>
  <div class="card">Card three</div>
</div>`,
          css: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 12px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 420px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 700px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  padding: 24px;
  background: #4f46e5;
  color: #fff;
  border-radius: 8px;
  text-align: center;
}`,
        },
        exercise: {
          id: 'ex-css-5',
          title: 'Exercise: responsive CSS',
          questions: [
            {
              type: 'choice',
              prompt: 'What does the viewport meta tag do?',
              options: [
                'Makes mobile browsers use the device width instead of a fake wide screen',
                'Increases image resolution',
                'Loads CSS faster',
                'Disables JavaScript on phones',
              ],
              answer: 0,
              explain: 'It is the foundation of mobile-responsive pages.',
            },
            {
              type: 'fill',
              prompt: 'Write a media query that applies styles only on screens up to 600px wide.',
              code: '___ (max-width: 600px) {\n  body { background: #eee; }\n}',
              blanks: [{ accepts: ['@media'] }],
              explain: 'Media queries start with @media.',
            },
            {
              type: 'fill',
              prompt: 'Cap the width of a text column so lines stay readable on huge screens.',
              code: '.article {\n  width: 100%;\n  max-width: ___;\n}',
              blanks: [{ accepts: ['700px', '65ch', '70ch', '60ch'] }],
              explain: 'Any sensible max-width works — 700px is a common choice.',
            },
          ],
        },
      },
      {
        id: 'css-6',
        order: 6,
        title: 'Positioning and transitions',
        summary: 'Control element positioning and add smooth transitions.',
        minutes: 14,
        content: `
<h2 id="position">CSS Positioning</h2>
<p>The <code>position</code> property sets how elements are placed: <code>static</code>, <code>relative</code>, <code>absolute</code>, <code>fixed</code>, and <code>sticky</code>.</p>
<ul>
  <li><strong>relative</strong> — moves relative to its normal position</li>
  <li><strong>absolute</strong> — positioned relative to nearest positioned ancestor</li>
  <li><strong>fixed</strong> — positioned relative to viewport</li>
  <li><strong>sticky</strong> — toggles between relative and fixed</li>
</ul>

<h2 id="transitions">Transitions</h2>
<p>Use <code>transition</code> to animate changes smoothly.</p>
<pre><code class="language-css">.button {
  background: #4f46e5;
  transition: background 0.2s ease, transform 0.2s ease;
}
.button:hover {
  background: #4338ca;
  transform: translateY(-2px);
}</code></pre>
<div class="note"><strong>Tip</strong> Animate only properties that are performant (opacity, transform) when possible.</div>
`,
        demo: {
          type: 'css',
          title: 'Hover transition',
          html: `<button class="btn">Hover me</button>`,
          css: `.btn {
  padding: 0.6rem 1rem;
  background: #39ff14;
  color: #031003;
  border: none;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px -10px #39ff14;
}`,
        },
        exercise: {
          id: 'ex-css-6',
          title: 'Exercise: positioning and transitions',
          questions: [
            {
              type: 'choice',
              prompt: 'Which position value removes an element from normal flow?',
              options: ['static', 'relative', 'absolute', 'inherit'],
              answer: 2,
              explain: 'absolute is taken out of flow and positioned relative to a positioned ancestor.',
            },
            {
              type: 'fill',
              prompt: 'Add a smooth transition for background over 0.2 seconds.',
              code: '.btn { ___: background 0.2s ease; }',
              blanks: [{ accepts: ['transition'] }],
              explain: 'Use the transition property.',
            },
            {
              type: 'code',
              language: 'css',
              prompt: 'Write CSS so that .card moves up by 4px on hover using transform.',
              starter: '/* write your CSS below */\n',
              checks: [
                { pattern: '\\.card\\s*:\\s*hover', flags: 'i', message: 'Target .card:hover' },
                { pattern: 'transform\\s*:.*translateY\\(-4px\\)', flags: 'i', message: 'Use transform: translateY(-4px)' },
              ],
              solution: `.card:hover {
  transform: translateY(-4px);
}`,
              explain: 'Use transform for smooth movement.',
            },
          ],
        },
      },
      {
        id: 'css-7',
        order: 7,
        title: 'CSS Grid layouts',
        summary: 'Build two-dimensional layouts with CSS Grid and named areas.',
        minutes: 16,
        content: `
<h2 id="grid">Grid basics</h2>
<p><strong>CSS Grid</strong> is designed for two-dimensional layouts: rows <em>and</em> columns at the same time.</p>
<pre><code class="language-css">.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}</code></pre>
<p>Use <code>auto-fit</code> and <code>minmax()</code> for responsive cards without media queries:</p>
<pre><code class="language-css">.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}</code></pre>

<h2 id="areas">Named areas</h2>
<p><code>grid-template-areas</code> makes complex page layouts readable:</p>
<pre><code class="language-css">.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 220px 1fr;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }</code></pre>
<div class="note"><strong>Flexbox or Grid?</strong> Use Flexbox for one-dimensional rows or columns and Grid for full page layouts or card galleries.</div>
`,
        demo: {
          type: 'css',
          title: 'Responsive card grid',
          html: `<div class="cards">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
  <div class="card">Four</div>
</div>`,
          css: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}
.card {
  background: #39ff14;
  color: #031003;
  padding: 18px;
  border-radius: 10px;
  font-weight: 700;
}`,
        },
        exercise: {
          id: 'ex-css-7',
          title: 'Exercise: CSS Grid',
          questions: [
            {
              type: 'choice',
              prompt: 'Which property creates responsive columns without media queries?',
              options: ['display: block', 'grid-template-columns: repeat(auto-fit, minmax(...))', 'float: left', 'position: absolute'],
              answer: 1,
              explain: 'auto-fit with minmax lets columns wrap automatically.',
            },
            {
              type: 'fill',
              prompt: 'Make a three-column grid with equal columns.',
              code: '.grid { display: grid; grid-template-columns: ___; }',
              blanks: [{ accepts: ['repeat(3, 1fr)', '1fr 1fr 1fr'] }],
              explain: 'repeat(3, 1fr) creates three equal columns.',
            },
            {
              type: 'code',
              language: 'css',
              prompt: 'Write CSS for a .grid container with two equal columns and a 20px gap.',
              starter: '/* write your CSS below */\n',
              checks: [
                { pattern: '\\.grid\\s*\\{[^}]*display\\s*:\\s*grid', flags: 'is', message: 'Use display: grid' },
                { pattern: '\\.grid\\s*\\{[^}]*grid-template-columns\\s*:\\s*(repeat\\(2,\\s*1fr\\)|1fr\\s+1fr)', flags: 'is', message: 'Use two equal columns' },
                { pattern: '\\.grid\\s*\\{[^}]*gap\\s*:\\s*20px', flags: 'is', message: 'Use gap: 20px' },
              ],
              solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}`,
              explain: 'A two-column grid with 20px gutters.',
            },
          ],
        },
      },
      {
        id: 'css-8',
        order: 8,
        title: 'Custom properties and modern CSS',
        summary: 'Use CSS variables, clamp() and container queries for maintainable styles.',
        minutes: 15,
        content: `
<h2 id="variables">Custom properties</h2>
<p><strong>Custom properties</strong> (CSS variables) let you reuse values and build themes:</p>
<pre><code class="language-css">:root {
  --brand: #39ff14;
  --space: 1rem;
}
.button {
  background: var(--brand);
  padding: var(--space);
}</code></pre>

<h2 id="clamp">Fluid type with clamp()</h2>
<p><code>clamp(min, preferred, max)</code> creates text that scales with the viewport but never gets too small or too large:</p>
<pre><code class="language-css">h1 { font-size: clamp(1.8rem, 4vw, 3rem); }</code></pre>

<h2 id="container">Container queries</h2>
<p>Container queries style a component based on its container width, not the viewport:</p>
<pre><code class="language-css">.card-wrap { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; gap: 1rem; }
}</code></pre>
<div class="note"><strong>Tip</strong> Prefer semantic variables such as <code>--color-accent</code> over raw values sprinkled through your CSS.</div>
`,
        demo: {
          type: 'css',
          title: 'Theme with CSS variables',
          html: `<div class="panel">
  <h2>Neon panel</h2>
  <button>Action</button>
</div>`,
          css: `:root {
  --brand: #39ff14;
  --surface: #0f131a;
}
body { background: #050608; font-family: system-ui, sans-serif; }
.panel {
  background: var(--surface);
  border: 1px solid var(--brand);
  border-radius: 12px;
  padding: 20px;
  color: #e6f1ff;
}
button {
  background: var(--brand);
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
}`,
        },
        exercise: {
          id: 'ex-css-8',
          title: 'Exercise: custom properties',
          questions: [
            {
              type: 'choice',
              prompt: 'How do you read a custom property named --brand?',
              options: ['var(--brand)', 'get(--brand)', '--brand()', 'value(--brand)'],
              answer: 0,
              explain: 'Use var(--name) anywhere a value is expected.',
            },
            {
              type: 'fill',
              prompt: 'Create a custom property for the brand colour.',
              code: ':root { ___ : #39ff14; }',
              blanks: [{ accepts: ['--brand'] }],
              explain: 'Custom properties start with two dashes.',
            },
            {
              type: 'code',
              language: 'css',
              prompt: 'Define --accent as #39ff14 in :root and use it as the color of .link.',
              starter: '/* write your CSS below */\n',
              checks: [
                { pattern: ':root\\s*\\{[^}]*--accent\\s*:\\s*#39ff14', flags: 'is', message: 'Define --accent in :root' },
                { pattern: '\\.link\\s*\\{[^}]*color\\s*:\\s*var\\(--accent\\)', flags: 'is', message: 'Use var(--accent) for .link color' },
              ],
              solution: `:root {\n  --accent: #39ff14;\n}\n.link {\n  color: var(--accent);\n}`,
              explain: 'Define once, reuse with var().',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'js',
    title: 'JavaScript Programming',
    shortTitle: 'JavaScript',
    tagline: 'Interactivity',
    badge: 'JS',
    badgeClass: 'badge-js',
    heroClass: 'course-hero-js',
    tagClass: 'tag-js',
    description: 'Make pages interactive: variables, conditions, loops, functions, arrays and the DOM.',
    longDescription:
      'JavaScript brings pages to life. You will start with the basics — variables, conditions and loops — then move on to functions, arrays and objects, and finally manipulate the page itself with the DOM and events.',
    level: 'Beginner',
    accent: '#b8a103',
    lessons: [
      {
        id: 'js-1',
        order: 1,
        title: 'What is JavaScript?',
        summary: 'See where JavaScript runs and print your first output.',
        minutes: 8,
        content: `
<h2 id="what-js">JavaScript in one minute</h2>
<p><strong>JavaScript</strong> is the programming language of the web. While HTML structures and CSS styles, JavaScript handles <em>behaviour</em>: reacting to clicks, validating forms, fetching data, animating interfaces…</p>
<p>It runs inside the browser next to your page, which means it can read and modify the document you see.</p>

<h2 id="adding-js">Adding JavaScript to a page</h2>
<p>Most often with a <code>&lt;script&gt;</code> tag just before the closing body tag:</p>
<pre><code class="language-html">&lt;script src="app.js"&gt;&lt;/script&gt;
&lt;!-- or write code directly: --&gt;
&lt;script&gt;
  console.log("Hello from the page!");
&lt;/script&gt;</code></pre>
<p>Placing scripts at the end of <code>&lt;body&gt;</code> ensures the HTML above them already exists before the code runs.</p>

<h2 id="console">Your first output: console.log</h2>
<p>The developer console is a programmer’s scratchpad. Print values with:</p>
<pre><code class="language-javascript">console.log("Hello, world!");
console.log(2 + 2);</code></pre>
<p>Open it with <kbd>F12</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> in your browser. Try the live playground below — press <strong>Run</strong> and read the output.</p>

<div class="note note-tip"><strong>Errors are teachers</strong>When something breaks, read the red message in the console. It usually names the file and the line number where things went wrong.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Print to the console',
          js: `console.log("Hello, world!");
console.log(2 + 2);
console.log("JavaScript is running!");`,
        },
        exercise: {
          id: 'ex-js-1',
          title: 'Exercise: JavaScript basics',
          questions: [
            {
              type: 'choice',
              prompt: 'What is JavaScript mainly used for on a web page?',
              options: [
                'Adding interactivity and behaviour',
                'Defining the page structure',
                'Styling colours and layout',
                'Storing the database',
              ],
              answer: 0,
              explain: 'HTML structures, CSS styles, JavaScript behaves.',
            },
            {
              type: 'fill',
              prompt: 'Print the text “debugging” to the developer console.',
              code: 'console.___("debugging");',
              blanks: [{ accepts: ['log'] }],
              explain: 'console.log is the classic output function.',
            },
            {
              type: 'choice',
              prompt: 'Which HTML element loads a JavaScript file?',
              options: ['&lt;script&gt;', '&lt;js&gt;', '&lt;code&gt;', '&lt;link&gt;'],
              answer: 0,
              explain: 'Use &lt;script src="app.js"&gt;&lt;/script&gt;.',
            },
          ],
        },
      },
      {
        id: 'js-2',
        order: 2,
        title: 'Variables and data types',
        summary: 'Store information with let and const and understand the basic types.',
        minutes: 11,
        content: `
<h2 id="variables">Storing values</h2>
<p>Variables are named containers for values. Modern JavaScript uses two keywords:</p>
<pre><code class="language-javascript">let score = 0;        // can change later
score = score + 10;

const playerName = "Ada";  // cannot be reassigned</code></pre>
<p>Use <code>const</code> by default and switch to <code>let</code> only when the value really needs to change. Avoid the old <code>var</code> keyword in new code.</p>

<h2 id="types">Basic data types</h2>
<ul>
  <li><strong>string</strong> — text: <code>"Ada"</code>, <code>'hello'</code>, or a template literal with backticks (see below).</li>
  <li><strong>number</strong> — integers and decimals: <code>42</code>, <code>3.14</code>.</li>
  <li><strong>boolean</strong> — <code>true</code> or <code>false</code>.</li>
  <li><strong>undefined</strong> / <strong>null</strong> — “no value”.</li>
</ul>
<pre><code class="language-javascript">typeof "hello";   // "string"
typeof 42;        // "number"
typeof true;      // "boolean"</code></pre>

<h2 id="templates">Template literals</h2>
<p>Backticks create strings that embed expressions inside <code>\${…}</code>:</p>
<pre><code class="language-javascript">const name = "Ada";
const greeting = \`Hello, \${name}!\`;
console.log(greeting); // "Hello, Ada!"</code></pre>
<p>Template literals beat old-fashioned <code>+</code> concatenation for readability — you will use them constantly.</p>

<div class="note note-warn"><strong>Naming rules</strong>Variable names cannot start with a number, cannot contain spaces, and are case-sensitive: <code>score</code> and <code>Score</code> are different variables.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Variables in action',
          js: `const name = "Ada";
let score = 7;

score = score + 3;

console.log("Name:", name);
console.log("Score:", score);
console.log("Type of name:", typeof name);
console.log(\`Score doubled: \${score * 2}\`);`,
        },
        exercise: {
          id: 'ex-js-2',
          title: 'Exercise: variables and types',
          questions: [
            {
              type: 'fill',
              prompt: 'Declare a constant called PI with the value 3.14.',
              code: '___ PI = 3.14;',
              blanks: [{ accepts: ['const'] }],
              explain: 'const declares a constant that cannot be reassigned.',
            },
            {
              type: 'choice',
              prompt: 'What does typeof 42 return?',
              options: ['"number"', '"string"', '"integer"', '"boolean"'],
              answer: 0,
              explain: 'JavaScript has a single number type for integers and decimals.',
            },
            {
              type: 'choice',
              prompt: 'Which line correctly embeds the value of count in a string?',
              options: [
                '`Total: ${count}`',
                '"Total: ${count}"',
                "'Total: {count}'",
                '"Total: " count',
              ],
              answer: 0,
              explain: 'Only template literals (backticks) evaluate ${…} expressions.',
            },
          ],
        },
      },
      {
        id: 'js-3',
        order: 3,
        title: 'Conditions and comparisons',
        summary: 'Make decisions in your code with if, else and comparison operators.',
        minutes: 10,
        content: `
<h2 id="if">The if statement</h2>
<p>Conditions let your program choose a path:</p>
<pre><code class="language-javascript">const temperature = 30;

if (temperature > 28) {
  console.log("It is hot outside!");
} else if (temperature > 15) {
  console.log("Nice weather.");
} else {
  console.log("Bring a coat.");
}</code></pre>
<p>The code inside the matching block runs; the rest is skipped.</p>

<h2 id="comparisons">Comparison operators</h2>
<ul>
  <li><code>===</code> / <code>!==</code> — strict equality and inequality (use these).</li>
  <li><code>==</code> / <code>!=</code> — loose equality; it converts types behind your back, which causes bugs. Prefer <code>===</code>.</li>
  <li><code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code>, <code>&lt;=</code> — numeric comparisons.</li>
</ul>
<pre><code class="language-javascript">5 === 5;      // true
5 === "5";    // false — different types!</code></pre>

<h2 id="logic">Combining conditions</h2>
<pre><code class="language-javascript">const age = 20;
const hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("Welcome to the film!");
}

if (age < 13 || age > 65) {
  console.log("Discount applies.");
}</code></pre>
<p><code>&&</code> means “both must be true”, <code>||</code> means “at least one”, and <code>!</code> flips a boolean.</p>

<div class="note note-tip"><strong>Truthy and falsy</strong>Values like <code>0</code>, <code>""</code>, <code>null</code> and <code>undefined</code> are falsy; almost everything else is truthy. That is why <code>if (name)</code> checks “has a non-empty name”.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Decide with conditions',
          js: `const score = 82;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Keep practising!");
}

console.log("Strict check 5 === '5':", 5 === "5");`,
        },
        exercise: {
          id: 'ex-js-3',
          title: 'Exercise: conditions',
          questions: [
            {
              type: 'choice',
              prompt: 'Which operator should you prefer for comparing values?',
              options: ['===', '==', '=', '=>'],
              answer: 0,
              explain: '=== checks value AND type, avoiding surprises.',
            },
            {
              type: 'fill',
              prompt: 'Complete the condition so the block runs when age is over 17.',
              code: 'if (age ___ 17) {\n  console.log("Adult ticket");\n}',
              blanks: [{ accepts: ['>', '>='] }],
              explain: 'Both &gt; and &gt;= can express “over 17” with the right value.',
            },
            {
              type: 'choice',
              prompt: 'Given const n = 0, what does if (n) { … } do?',
              options: [
                'Skips the block because 0 is falsy',
                'Runs the block because 0 is a number',
                'Throws an error',
                'Always runs the else block',
              ],
              answer: 0,
              explain: '0 is one of JavaScript’s falsy values.',
            },
          ],
        },
      },
      {
        id: 'js-4',
        order: 4,
        title: 'Loops',
        summary: 'Repeat work with for and while loops without copy-pasting code.',
        minutes: 10,
        content: `
<h2 id="for">The for loop</h2>
<p>Use <code>for</code> when you know how many times to repeat:</p>
<pre><code class="language-javascript">for (let i = 1; i <= 3; i++) {
  console.log("Attempt number " + i);
}</code></pre>
<p>A <code>for</code> loop has three parts: a starting value, a condition that keeps it running, and an update after each pass.</p>

<h2 id="for-of">Looping over arrays</h2>
<p>The <code>for…of</code> loop visits each item of a list directly:</p>
<pre><code class="language-javascript">const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}</code></pre>

<h2 id="while">The while loop</h2>
<p>Use <code>while</code> when the number of iterations is not known in advance:</p>
<pre><code class="language-javascript">let remaining = 3;

while (remaining > 0) {
  console.log(remaining + "…");
  remaining = remaining - 1;
}

console.log("Liftoff!");</code></pre>

<div class="note note-warn"><strong>Infinite loops</strong>If the condition never becomes false — and you forget to update the variable — the browser freezes. Always make sure something inside the loop moves you toward the exit.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Loops of every kind',
          js: `for (let i = 1; i <= 3; i++) {
  console.log("Counting:", i);
}

const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log("Color:", color);
}

let lives = 2;
while (lives > 0) {
  console.log("Lives left:", lives);
  lives--;
}
console.log("Game over");`,
        },
        exercise: {
          id: 'ex-js-4',
          title: 'Exercise: loops',
          questions: [
            {
              type: 'choice',
              prompt: 'Which loop is usually best for visiting every item of an array?',
              options: [
                'for…of',
                'if…else',
                'switch',
                'do…while',
              ],
              answer: 0,
              explain: 'for…of iterates over values of any iterable, including arrays.',
            },
            {
              type: 'fill',
              prompt: 'Write a loop header that repeats exactly 5 times, counting with i.',
              code: 'for (let i = 0; i ___ 5; i++) {}',
              blanks: [{ accepts: ['<', '<='] }],
              explain: '&lt; 5 (starting from 0) or &lt;= 5 (starting from 1) both work.',
            },
            {
              type: 'choice',
              prompt: 'What can cause a browser tab to freeze?',
              options: [
                'A while loop whose condition never becomes false',
                'A for…of over an empty array',
                'Using console.log',
                'Declaring a const',
              ],
              answer: 0,
              explain: 'An infinite loop blocks the main thread forever.',
            },
          ],
        },
      },
      {
        id: 'js-5',
        order: 5,
        title: 'Functions',
        summary: 'Group reusable logic into named functions with parameters and return values.',
        minutes: 12,
        content: `
<h2 id="why-functions">Why functions?</h2>
<p>Functions package logic under a name so you can reuse it and reason about it. Instead of copying a calculation three times, write it once and call it wherever needed.</p>
<pre><code class="language-javascript">function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Ada"));   // "Hello, Ada!"
console.log(greet("Linus")); // "Hello, Linus!"</code></pre>
<ul>
  <li><strong>Parameters</strong> are the inputs listed in the declaration.</li>
  <li><strong>Arguments</strong> are the actual values you pass when calling.</li>
  <li><strong>return</strong> sends a result back to the caller (and ends the function).</li>
</ul>

<h2 id="arrow">Arrow functions</h2>
<p>A shorter syntax for small functions:</p>
<pre><code class="language-javascript">const double = (number) => number * 2;

console.log(double(21)); // 42</code></pre>
<p>For a single expression, the result is returned automatically — no <code>return</code> keyword needed.</p>

<h2 id="scope">Scope in one sentence</h2>
<p>Variables declared inside a function live only inside it:</p>
<pre><code class="language-javascript">function total(price, quantity) {
  const sum = price * quantity; // invisible outside
  return sum;
}</code></pre>

<div class="note note-tip"><strong>One function, one job</strong>Small functions with clear names are easier to test, reuse and debug than one giant script.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Define and call functions',
          js: `function greet(name) {
  return "Hello, " + name + "!";
}

const double = (n) => n * 2;

console.log(greet("Ada"));
console.log(greet("Grace"));
console.log("double(21) =", double(21));

function total(price, quantity) {
  return price * quantity;
}

console.log("Total:", total(9.99, 3));`,
        },
        exercise: {
          id: 'ex-js-5',
          title: 'Exercise: functions',
          questions: [
            {
              type: 'choice',
              prompt: 'What does the return keyword do?',
              options: [
                'Sends a value back to the caller and ends the function',
                'Prints to the console',
                'Restarts the function',
                'Declares a variable outside the function',
              ],
              answer: 0,
              explain: 'The returned value can be stored: const x = myFunc().',
            },
            {
              type: 'fill',
              prompt: 'Declare a function named greet that takes one parameter called name.',
              code: '___ greet(name) {\n  return "Hi " + name;\n}',
              blanks: [{ accepts: ['function'] }],
              explain: 'Function declarations start with the function keyword.',
            },
            {
              type: 'code',
              language: 'javascript',
              prompt: 'Write a function double(n) that returns its input multiplied by 2.',
              starter: `function double(n) {
  // your code here
}`,
              tests: [
                { expression: 'double(4)', expected: 8, label: 'double(4) should be 8' },
                { expression: 'double(0)', expected: 0, label: 'double(0) should be 0' },
                { expression: 'double(-3)', expected: -6, label: 'double(-3) should be -6' },
              ],
              solution: `function double(n) {
  return n * 2;
}`,
              explain: 'Multiply the parameter by 2 and return the result.',
            },
          ],
        },
      },
      {
        id: 'js-6',
        order: 6,
        title: 'Arrays and objects',
        summary: 'Group related data and transform it with map, filter and find.',
        minutes: 13,
        content: `
<h2 id="arrays">Arrays</h2>
<p>An array stores an ordered list of values:</p>
<pre><code class="language-javascript">const scores = [90, 75, 100];
console.log(scores[0]);   // 90 (counting starts at 0)
console.log(scores.length); // 3</code></pre>

<h2 id="methods">Useful array methods</h2>
<pre><code class="language-javascript">const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
// [2, 4, 6, 8, 10]

const big = numbers.filter((n) => n > 3);
// [4, 5]

const found = numbers.find((n) => n > 3);
// 4</code></pre>
<ul>
  <li><code>map</code> — transforms every item, returning a new array of the same length.</li>
  <li><code>filter</code> — keeps only the items that pass a test.</li>
  <li><code>find</code> — returns the first match (or <code>undefined</code>).</li>
</ul>

<h2 id="objects">Objects</h2>
<p>Objects group related values under named properties:</p>
<pre><code class="language-javascript">const user = {
  name: "Ada",
  points: 120,
  active: true,
};

console.log(user.name);      // "Ada"
user.points = user.points + 30;
console.log(user["points"]); // 150</code></pre>
<p>Arrays and objects nest freely — a list of user objects is one of the most common shapes in real programs.</p>

<div class="note note-tip"><strong>Immutability habit</strong>Methods like map and filter create <em>new</em> arrays instead of changing the original, which makes bugs much less likely.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Arrays and objects together',
          js: `const players = [
  { name: "Ada", points: 120 },
  { name: "Linus", points: 95 },
  { name: "Grace", points: 150 },
];

const names = players.map((p) => p.name);
console.log("Names:", names);

const winners = players.filter((p) => p.points >= 100);
console.log("Winners:", winners.map((p) => p.name));

const total = players.reduce((sum, p) => sum + p.points, 0);
console.log("Total points:", total);`,
        },
        exercise: {
          id: 'ex-js-6',
          title: 'Exercise: arrays and objects',
          questions: [
            {
              type: 'choice',
              prompt: 'Which array method returns a NEW array with each item transformed?',
              options: ['map', 'find', 'forEach', 'pop'],
              answer: 0,
              explain: 'map transforms every element and returns a new array.',
            },
            {
              type: 'fill',
              prompt: 'Read the name property of the object stored in user.',
              code: 'const user = { name: "Ada" };\nconsole.log(user.___);',
              blanks: [{ accepts: ['name'] }],
              explain: 'Access properties with dot notation: user.name.',
            },
            {
              type: 'code',
              language: 'javascript',
              prompt: 'Write a function doubleAll(numbers) that returns a new array with every number multiplied by 2.',
              starter: `function doubleAll(numbers) {
  // your code here
}`,
              tests: [
                {
                  expression: 'doubleAll([1, 2, 3])',
                  expected: [2, 4, 6],
                  label: 'doubleAll([1, 2, 3]) should be [2, 4, 6]',
                },
                {
                  expression: 'doubleAll([])',
                  expected: [],
                  label: 'doubleAll([]) should be []',
                },
                {
                  expression: 'doubleAll([-5])',
                  expected: [-10],
                  label: 'doubleAll([-5]) should be [-10]',
                },
              ],
              solution: `function doubleAll(numbers) {
  return numbers.map((n) => n * 2);
}`,
              explain: 'Use numbers.map((n) => n * 2) and return the result.',
            },
          ],
        },
      },
      {
        id: 'js-7',
        order: 7,
        title: 'The DOM and events',
        summary: 'Read and change the page with JavaScript and react to user actions.',
        minutes: 14,
        content: `
<h2 id="dom">What is the DOM?</h2>
<p>When a page loads, the browser builds the <strong>DOM</strong> (Document Object Model): a live tree of objects representing every element. JavaScript can read and modify that tree — add elements, change text, show or hide sections.</p>

<h2 id="selecting">Selecting elements</h2>
<pre><code class="language-javascript">const title = document.querySelector("h1");
const items = document.querySelectorAll(".menu-item");

console.log(title.textContent);
title.textContent = "A brand new title";</code></pre>
<ul>
  <li><code>querySelector</code> — first element matching a CSS selector.</li>
  <li><code>querySelectorAll</code> — all matches (a list you can loop over).</li>
</ul>

<h2 id="changing">Changing content and style</h2>
<pre><code class="language-javascript">const box = document.querySelector(".box");
box.textContent = "Updated!";
box.classList.add("highlight");
box.style.backgroundColor = "#eef0ff";</code></pre>

<h2 id="events">Reacting to events</h2>
<p>Events fire when the user interacts. Register a listener with <code>addEventListener</code>:</p>
<pre><code class="language-javascript">const button = document.querySelector("#buy");
const output = document.querySelector("#status");

button.addEventListener("click", () => {
  output.textContent = "Added to cart!";
});</code></pre>
<p>The function you pass is called a <em>callback</em> — it runs only when the event happens.</p>

<div class="note"><strong>Try it live</strong>The playground below contains a real button. Run the code, then click the button inside the preview.</div>
`,
        demo: {
          type: 'dom',
          title: 'Click a button with JavaScript',
          html: `<h2 id="title">Shopping cart</h2>
<p id="status">Nothing added yet.</p>
<button id="buy">Buy now</button>
<button id="reset">Reset</button>`,
          js: `const status = document.querySelector("#status");

document.querySelector("#buy").addEventListener("click", () => {
  status.textContent = "Added to cart!";
  status.style.color = "#0f9d58";
});

document.querySelector("#reset").addEventListener("click", () => {
  status.textContent = "Nothing added yet.";
  status.style.color = "";
});

console.log("Listeners attached. Try clicking!");`,
        },
        exercise: {
          id: 'ex-js-7',
          title: 'Exercise: DOM and events',
          questions: [
            {
              type: 'choice',
              prompt: 'Which method returns the FIRST element matching a CSS selector?',
              options: [
                'document.querySelector',
                'document.selectAll',
                'document.getElements',
                'document.find',
              ],
              answer: 0,
              explain: 'querySelector uses the same syntax as CSS selectors.',
            },
            {
              type: 'fill',
              prompt: 'Run this function when the button is clicked.',
              code: 'button.addEventListener("___", handleClick);',
              blanks: [{ accepts: ['click'] }],
              explain: 'The event name for a mouse click is "click".',
            },
            {
              type: 'code',
              language: 'html',
              prompt: 'Create a button with the id "buy-btn" whose visible text is “Buy now”.',
              starter: `<!-- write your HTML below -->
`,
              checks: [
                {
                  pattern: 'id=["\']buy-btn["\']',
                  flags: 'i',
                  message: 'The button needs id="buy-btn"',
                },
                {
                  pattern: '<button[^>]*>\\s*Buy now\\s*<\\/button>',
                  flags: 'i',
                  message: 'A <button> element with the text “Buy now” is required',
                },
              ],
              solution: `<button id="buy-btn">Buy now</button>`,
              explain: 'A complete answer looks like: <button id="buy-btn">Buy now</button>',
            },
          ],
        },
      },
      {
        id: 'js-8',
        order: 8,
        title: 'JSON and localStorage',
        summary: 'Store and retrieve data in the browser with JSON and localStorage.',
        minutes: 16,
        content: `
<h2 id="json">JSON</h2>
<p><strong>JSON</strong> (JavaScript Object Notation) is a lightweight format for data exchange. Use <code>JSON.stringify()</code> to convert objects to JSON strings, and <code>JSON.parse()</code> to convert strings back to objects.</p>
<pre><code class="language-javascript">const user = { name: "Alex", age: 20 };
const json = JSON.stringify(user);
const back = JSON.parse(json);</code></pre>

<h2 id="localstorage">localStorage</h2>
<p><code>localStorage</code> lets you save data in the browser that persists across page reloads.</p>
<pre><code class="language-javascript">localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
localStorage.removeItem("theme");</code></pre>
<div class="note"><strong>Note</strong> localStorage only stores strings. Always serialize objects with JSON.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Save and load with localStorage',
          js: `const key = "demo-name";
localStorage.setItem(key, "CodeLearner");
const value = localStorage.getItem(key);
console.log("Saved:", value);
localStorage.removeItem(key);
console.log("After remove:", localStorage.getItem(key));`,
        },
        exercise: {
          id: 'ex-js-8',
          title: 'Exercise: JSON and localStorage',
          questions: [
            {
              type: 'choice',
              prompt: 'Which method converts a JavaScript object to a JSON string?',
              options: ['JSON.parse()', 'JSON.stringify()', 'toString()', 'Object.keys()'],
              answer: 1,
              explain: 'JSON.stringify() serializes objects to JSON.',
            },
            {
              type: 'fill',
              prompt: 'Save a value to localStorage.',
              code: 'localStorage.___("score", "100");',
              blanks: [{ accepts: ['setItem'] }],
              explain: 'Use setItem(key, value).',
            },
            {
              type: 'code',
              language: 'javascript',
              prompt: 'Create an object {name: "Alex"} and store it in localStorage under the key "user".',
              starter: '// write your code below\n',
              tests: [
                { expression: "typeof (typeof localStorage !== 'undefined' && localStorage.getItem('user') || 'string')", expected: 'string' },
                { expression: "JSON.parse((typeof localStorage !== 'undefined' && localStorage.getItem('user')) || '{\"name\":\"Alex\"}').name", expected: 'Alex' },
              ],
              solution: `const user = { name: "Alex" };
if (typeof localStorage !== "undefined") {
  localStorage.setItem("user", JSON.stringify(user));
}`,
              explain: 'Stringify before saving, parse when reading.',
            },
          ],
        },
      },
      {
        id: 'js-9',
        order: 9,
        title: 'Async JavaScript and fetch',
        summary: 'Work with promises, async/await and real network requests.',
        minutes: 18,
        content: `
<h2 id="async">Synchronous vs asynchronous</h2>
<p>JavaScript runs one statement at a time, but some work (network requests, timers) takes time. <strong>Promises</strong> represent a value that will exist later.</p>
<pre><code class="language-javascript">fetch("https://api.example.com/data")
  .then((response) =&gt; response.json())
  .then((data) =&gt; console.log(data))
  .catch((error) =&gt; console.error(error));</code></pre>

<h2 id="await">async / await</h2>
<p><code>async</code> functions always return a promise. <code>await</code> pauses inside the function until the promise settles — without blocking the page.</p>
<pre><code class="language-javascript">async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}</code></pre>
<div class="note"><strong>Important</strong> Always handle errors and check <code>response.ok</code> before reading JSON.</div>
`,
        demo: {
          type: 'javascript',
          title: 'Promises and async functions',
          js: `function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("Loading...");
  await wait(400);
  console.log("Done after 400ms");
}

run();
console.log("This runs first");`,
        },
        exercise: {
          id: 'ex-js-9',
          title: 'Exercise: async JavaScript',
          questions: [
            {
              type: 'choice',
              prompt: 'What does an async function always return?',
              options: ['A string', 'A Promise', 'undefined', 'A callback'],
              answer: 1,
              explain: 'async functions wrap their return value in a Promise.',
            },
            {
              type: 'fill',
              prompt: 'Pause until a promise settles.',
              code: 'const data = ___ getData();',
              blanks: [{ accepts: ['await'] }],
              explain: 'await can be used inside async functions.',
            },
            {
              type: 'code',
              language: 'javascript',
              prompt: 'Write an async function load that awaits Promise.resolve(42) and returns the value.',
              starter: '// write your code below\n',
              tests: [
                { expression: 'typeof load', expected: 'function' },
                { expression: 'load() instanceof Promise', expected: true },
              ],
              solution: `async function load() {\n  const value = await Promise.resolve(42);\n  return value;\n}`,
              explain: 'await unwraps the resolved value; returning it resolves the async function.',
            },
          ],
        },
      },
      {
        id: 'js-10',
        order: 10,
        title: 'Classes, modules and clean code',
        summary: 'Organise larger programs with classes, ES modules and small functions.',
        minutes: 17,
        content: `
<h2 id="classes">Classes</h2>
<p>Classes are templates for creating objects with shared behaviour:</p>
<pre><code class="language-javascript">class Task {
  constructor(title) {
    this.title = title;
    this.done = false;
  }
  toggle() {
    this.done = !this.done;
  }
}

const task = new Task("Learn JavaScript");
task.toggle();</code></pre>

<h2 id="modules">ES modules</h2>
<p>Split code into files with <code>export</code> and <code>import</code>:</p>
<pre><code class="language-javascript">// math.js
export function add(a, b) { return a + b; }

// app.js
import { add } from "./math.js";</code></pre>

<h2 id="clean">Clean code checklist</h2>
<ul>
  <li>Give functions one clear job.</li>
  <li>Use descriptive names (<code>totalPrice</code>, not <code>tp</code>).</li>
  <li>Avoid repeating logic — extract helpers.</li>
  <li>Keep modules focused and export only what is needed.</li>
</ul>
<div class="note note-tip"><strong>Practice</strong> Refactor a long function by extracting small helpers and naming each step.</div>
`,
        demo: {
          type: 'javascript',
          title: 'A small class',
          js: `class Counter {
  constructor() {
    this.value = 0;
  }
  increment() {
    this.value += 1;
    return this.value;
  }
}

const counter = new Counter();
console.log(counter.increment());
console.log(counter.increment());`,
        },
        exercise: {
          id: 'ex-js-10',
          title: 'Exercise: classes and modules',
          questions: [
            {
              type: 'choice',
              prompt: 'Which keyword creates an instance of a class?',
              options: ['new', 'create', 'instance', 'class'],
              answer: 0,
              explain: 'Use new ClassName().',
            },
            {
              type: 'fill',
              prompt: 'Export a function from a module.',
              code: '___ function greet() {}',
              blanks: [{ accepts: ['export'] }],
              explain: 'export makes the function available to importers.',
            },
            {
              type: 'code',
              language: 'javascript',
              prompt: 'Create a class Dog whose constructor stores name and whose bark() returns "Woof".',
              starter: '// write your code below\n',
              tests: [
                { expression: 'new Dog("Rex").name', expected: 'Rex' },
                { expression: 'new Dog("Rex").bark()', expected: 'Woof' },
              ],
              solution: `class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n  bark() {\n    return "Woof";\n  }\n}`,
              explain: 'Classes group state (name) and behaviour (bark).',
            },
          ],
        },
      },
    ],
  },
];



/* ------------------------------------------------------------------ */
/* Lesson guides: objectives, practical tasks and key takeaways.      */
/* Attached below to every lesson so all views share the same data.   */
/* ------------------------------------------------------------------ */
const LESSON_GUIDES = {
  'html-1': {
    objectives: [
      'Explain what HTML is and why every page starts with it.',
      'Identify opening tags, closing tags, content and attributes.',
      'Write a paragraph and an image element correctly.',
    ],
    tasks: [
      'Open the live demo and change the heading and paragraph text.',
      'Add an image element with a meaningful alt attribute.',
      'Explain in one sentence why the alt attribute matters.',
    ],
    takeaways: [
      'HTML describes structure and meaning, not appearance.',
      'Elements are built from tags, content and optional attributes.',
      'Self-closing elements such as img and br do not wrap content.',
    ],
  },
  'html-2': {
    objectives: [
      'Write a complete HTML document skeleton.',
      'Place metadata in the head and visible content in the body.',
      'Nest elements without overlapping tags.',
    ],
    tasks: [
      'Add a unique title and a viewport meta tag to the demo page.',
      'Create a second heading and a paragraph inside the body.',
      'Check the tab title in your browser after editing.',
    ],
    takeaways: [
      'The doctype tells the browser to use modern standards.',
      'The head holds information about the page; the body holds the content.',
      'Nested elements must close in reverse order.',
    ],
  },
  'html-3': {
    objectives: [
      'Use headings to create a logical document outline.',
      'Choose between paragraphs, strong, em and inline elements.',
      'Understand why heading order matters for accessibility.',
    ],
    tasks: [
      'Rewrite a block of text with one h1, two h2 and two paragraphs.',
      'Emphasise a key phrase with strong and a title with em.',
      'Inspect the heading outline of your demo page.',
    ],
    takeaways: [
      'Use headings for structure, not to make text big or bold.',
      'Strong conveys importance; em conveys stress or emphasis.',
      'A logical outline helps screen readers and search engines.',
    ],
  },
  'html-4': {
    objectives: [
      'Create links to pages, anchors and email addresses.',
      'Add images with useful alt text and correct paths.',
      'Build ordered and unordered lists.',
    ],
    tasks: [
      'Add a link to another page and an anchor link within the demo.',
      'Insert an image with descriptive alt text.',
      'Build a nested list of your favourite learning resources.',
    ],
    takeaways: [
      'The href attribute decides where a link goes.',
      'Relative paths point inside your site; absolute URLs point elsewhere.',
      'alt text describes an image for screen readers and failed loads.',
    ],
  },
  'html-5': {
    objectives: [
      'Build accessible forms with labels and input types.',
      'Group related controls with fieldset and legend.',
      'Use semantic landmarks such as nav, main and footer.',
    ],
    tasks: [
      'Add a labelled email input and a submit button.',
      'Group two radio buttons inside a fieldset with a legend.',
      'Replace generic div wrappers with semantic landmark elements.',
    ],
    takeaways: [
      'Every input needs an associated label.',
      'Input type gives browsers validation and the right keyboard.',
      'Semantic elements communicate structure to people and machines.',
    ],
  },
  'html-6': {
    objectives: [
      'Structure tabular data with table, thead, tbody and caption.',
      'Use th for header cells and td for data cells.',
      'Understand when a table is the right choice.',
    ],
    tasks: [
      'Add a caption and a second data row to the demo table.',
      'Convert one data cell into a header cell and observe the change.',
      'List one situation where a table is better than a list.',
    ],
    takeaways: [
      'Tables are for data that has rows and columns.',
      'Header cells make tables understandable for assistive technology.',
      'Never use tables for page layout.',
    ],
  },
  'html-7': {
    objectives: [
      'Use landmarks and heading order to structure a page.',
      'Label every form control and write useful alt text.',
      'Apply ARIA only when native semantics are not enough.',
    ],
    tasks: [
      'Tab through the demo and check that focus is always visible.',
      'Add a label to the input and test it with a screen reader or inspector.',
      'Mark a decorative image with an empty alt attribute.',
    ],
    takeaways: [
      'Accessible markup usually means using the right native element.',
      'Labels and alt text are not optional extras.',
      'Visible focus is essential for keyboard users.',
    ],
  },
  'css-1': {
    objectives: [
      'Connect a stylesheet to an HTML document.',
      'Write selectors, declarations and rules with correct syntax.',
      'Understand the cascade and specificity at a high level.',
    ],
    tasks: [
      'Change the page background and text colour in the demo.',
      'Add a class selector and apply it to an element.',
      'Predict which rule wins when two selectors target the same element.',
    ],
    takeaways: [
      'CSS rules are selector plus declarations inside braces.',
      'The cascade decides which conflicting rule applies.',
      'Classes are reusable; ids are unique and harder to override.',
    ],
  },
  'css-2': {
    objectives: [
      'Apply colours, fonts and backgrounds consistently.',
      'Build a readable type scale and line length.',
      'Use contrast to keep text accessible.',
    ],
    tasks: [
      'Change the demo palette and check text contrast.',
      'Set a font stack and adjust line-height for readability.',
      'Add a subtle gradient or background image.',
    ],
    takeaways: [
      'Readable contrast is a requirement, not a preference.',
      'A small type scale with clear hierarchy beats many sizes.',
      'Backgrounds should support the content, not compete with it.',
    ],
  },
  'css-3': {
    objectives: [
      'Explain content, padding, border and margin.',
      'Use box-sizing: border-box to simplify sizing.',
      'Control spacing with margin and padding deliberately.',
    ],
    tasks: [
      'Add padding and a border to the demo card; observe the size change.',
      'Set box-sizing: border-box on all elements.',
      'Use margin to separate two blocks and explain the result.',
    ],
    takeaways: [
      'Every element is a content box surrounded by padding, border and margin.',
      'border-box makes width include padding and border.',
      'Margins collapse vertically in normal flow — padding does not.',
    ],
  },
  'css-4': {
    objectives: [
      'Build one-dimensional layouts with Flexbox.',
      'Use justify-content, align-items and gap effectively.',
      'Control wrapping and item sizing.',
    ],
    tasks: [
      'Center the demo items horizontally and vertically.',
      'Add gap and make the row wrap on narrow screens.',
      'Change one item’s flex value and explain the result.',
    ],
    takeaways: [
      'Flexbox is ideal for rows and columns of items.',
      'justify-content works on the main axis; align-items on the cross axis.',
      'gap is the modern way to space flex and grid items.',
    ],
  },
  'css-5': {
    objectives: [
      'Write mobile-first media queries.',
      'Use relative units and fluid typography.',
      'Make images and layouts responsive.',
    ],
    tasks: [
      'Add a breakpoint that switches the demo to a two-column layout.',
      'Set max-width: 100% on images and test on a narrow viewport.',
      'Use clamp() for a heading size that scales smoothly.',
    ],
    takeaways: [
      'Start with the smallest screen and enhance upward.',
      'Relative units scale better than fixed pixels for type and spacing.',
      'Test with real device widths, not just the desktop window.',
    ],
  },
  'css-6': {
    objectives: [
      'Choose the right position value for an element.',
      'Understand containing blocks for absolute positioning.',
      'Add performant transitions to interactive elements.',
    ],
    tasks: [
      'Make the demo button lift on hover with a transform transition.',
      'Create a badge positioned absolutely inside a relatively positioned card.',
      'Check that the transition respects reduced-motion preferences.',
    ],
    takeaways: [
      'Absolute positioning is relative to the nearest positioned ancestor.',
      'Fixed elements are positioned against the viewport.',
      'Animate transform and opacity for smooth, cheap effects.',
    ],
  },
  'css-7': {
    objectives: [
      'Create rows and columns with CSS Grid.',
      'Use repeat, minmax and auto-fit for responsive layouts.',
      'Describe layouts with named grid areas.',
    ],
    tasks: [
      'Turn the demo into a three-column grid with a 16px gap.',
      'Use auto-fit and minmax so cards wrap without media queries.',
      'Recreate a header/sidebar/main/footer layout with grid areas.',
    ],
    takeaways: [
      'Grid handles two dimensions at once.',
      'auto-fit with minmax is a powerful responsive pattern.',
      'Named areas make complex layouts easier to read and change.',
    ],
  },
  'css-8': {
    objectives: [
      'Define and reuse custom properties.',
      'Create fluid type and spacing with clamp().',
      'Understand container queries at a conceptual level.',
    ],
    tasks: [
      'Define a brand colour and spacing variable in :root.',
      'Replace three hard-coded values in the demo with variables.',
      'Use clamp() for a heading and test at two window widths.',
    ],
    takeaways: [
      'Custom properties make themes and refactors much easier.',
      'clamp() keeps values bounded while still fluid.',
      'Components can respond to their container, not just the viewport.',
    ],
  },
  'js-1': {
    objectives: [
      'Explain what JavaScript adds to a web page.',
      'Connect a script to HTML and read console output.',
      'Recognise basic statements and expressions.',
    ],
    tasks: [
      'Change the message in the demo and run it again.',
      'Log a second value and observe how the console displays it.',
      'Write a comment explaining what the script does.',
    ],
    takeaways: [
      'JavaScript adds behaviour and interactivity.',
      'The console is your primary debugging tool.',
      'Statements run from top to bottom unless control flow changes that.',
    ],
  },
  'js-2': {
    objectives: [
      'Declare variables with let and const.',
      'Work with strings, numbers, booleans and null.',
      'Use template literals to build text.',
    ],
    tasks: [
      'Create a const for your name and a let for a score.',
      'Change the score and log a sentence with a template literal.',
      'Predict the type of three different values.',
    ],
    takeaways: [
      'Prefer const unless the value must change.',
      'Variables are named references to values.',
      'JavaScript is dynamically typed, but values still have types.',
    ],
  },
  'js-3': {
    objectives: [
      'Write if, else if and else branches.',
      'Compare values with === and !==.',
      'Combine conditions with && and ||.',
    ],
    tasks: [
      'Add a third branch to the demo condition.',
      'Fix a comparison that uses = instead of ===.',
      'Write a condition that checks a score is between two values.',
    ],
    takeaways: [
      'Use strict equality unless you have a specific reason not to.',
      'Conditions return truthy or falsy values.',
      'Logical operators combine boolean expressions.',
    ],
  },
  'js-4': {
    objectives: [
      'Repeat work with for and while loops.',
      'Iterate over arrays and objects safely.',
      'Stop loops with break and skip with continue.',
    ],
    tasks: [
      'Log the numbers from 1 to 5 with a for loop.',
      'Use a while loop to count down from 3.',
      'Break out of a loop when a value is found.',
    ],
    takeaways: [
      'Loops remove repetition and process collections.',
      'Always ensure a while loop can eventually stop.',
      'for…of is usually the clearest way to read array values.',
    ],
  },
  'js-5': {
    objectives: [
      'Define and call functions with parameters and return values.',
      'Understand local scope and closures at a basic level.',
      'Write small functions with one clear responsibility.',
    ],
    tasks: [
      'Write a function that returns the double of a number.',
      'Add a default parameter to a greeting function.',
      'Call the same function with different arguments.',
    ],
    takeaways: [
      'Functions package reusable behaviour.',
      'return sends a value back to the caller.',
      'Small, well-named functions are easier to test and debug.',
    ],
  },
  'js-6': {
    objectives: [
      'Create and update arrays and objects.',
      'Use map, filter and find to transform data.',
      'Read nested data without mutating it accidentally.',
    ],
    tasks: [
      'Map an array of numbers to their squares.',
      'Filter an array of objects by a boolean property.',
      'Find the first item that matches a condition.',
    ],
    takeaways: [
      'map, filter and find return new values instead of changing the original.',
      'Objects group named properties; arrays hold ordered items.',
      'Choose the array method that matches your intent.',
    ],
  },
  'js-7': {
    objectives: [
      'Select elements with querySelector and querySelectorAll.',
      'Change text, classes and attributes safely.',
      'Respond to user events with addEventListener.',
    ],
    tasks: [
      'Select the demo button and change its text.',
      'Toggle a class on click and observe the CSS change.',
      'Add an input listener that logs the current value.',
    ],
    takeaways: [
      'The DOM is a live object model of the page.',
      'Prefer addEventListener over inline event attributes.',
      'Reading and writing DOM properties is how JavaScript updates the UI.',
    ],
  },
  'js-8': {
    objectives: [
      'Convert data with JSON.stringify and JSON.parse.',
      'Save and load values with localStorage.',
      'Handle missing or malformed stored data safely.',
    ],
    tasks: [
      'Save an object under a key and read it back.',
      'Delete the key and confirm it is gone.',
      'Wrap JSON.parse in try/catch and log a friendly fallback.',
    ],
    takeaways: [
      'localStorage stores strings only — serialize objects first.',
      'Always handle parse errors and missing values.',
      'Persisting state makes simple apps survive a refresh.',
    ],
  },
  'js-9': {
    objectives: [
      'Explain synchronous versus asynchronous work.',
      'Consume promises with then/catch and async/await.',
      'Check HTTP responses before reading JSON.',
    ],
    tasks: [
      'Rewrite a then/catch chain using async/await.',
      'Add a try/catch around a failing request.',
      'Log a message after the awaited work completes.',
    ],
    takeaways: [
      'Promises represent future values.',
      'await pauses only the current async function.',
      'Always handle errors and check response.ok.',
    ],
  },
  'js-10': {
    objectives: [
      'Create classes with constructors and methods.',
      'Split code into ES modules with import and export.',
      'Apply naming and structure habits for maintainable code.',
    ],
    tasks: [
      'Add a method to the demo class and call it.',
      'Extract one helper function from a longer block of code.',
      'Name three variables more descriptively than a, b and x.',
    ],
    takeaways: [
      'Classes bundle state and behaviour.',
      'Modules keep related code together and hide what is not needed.',
      'Readable names and small functions prevent most future bugs.',
    ],
  },
};

for (const course of COURSES) {
  for (const lesson of course.lessons) {
    const guide = LESSON_GUIDES[lesson.id];
    if (guide) Object.assign(lesson, guide);
  }
}

/* Extra questions distributed through the existing exercises: code reading,
   debugging and practical challenges. Kept here so course objects stay tidy. */
const EXTRA_QUESTIONS = {
  'ex-html-2': [
    {
      type: 'choice',
      prompt: 'Code reading: what is wrong with this markup?',
      code: '<p>Hello <strong>world</p></strong>',
      options: [
        'The tags overlap instead of closing in order',
        'strong cannot go inside a paragraph',
        'The paragraph needs an id',
        'Nothing is wrong',
      ],
      answer: 0,
      explain: 'Nested tags must close in reverse order: <p>Hello <strong>world</strong></p>.',
    },
  ],
  'ex-html-5': [
    {
      type: 'code',
      language: 'html',
      prompt: 'Debug: write a labelled text input for an email address using id "email".',
      starter: '<!-- write your HTML below -->\n',
      checks: [
        { pattern: '<label[^>]*for=["\']email["\']', flags: 'i', message: 'Add a label with for="email"' },
        { pattern: '<input[^>]*id=["\']email["\'][^>]*type=["\']email["\']|<input[^>]*type=["\']email["\'][^>]*id=["\']email["\']', flags: 'i', message: 'Add an email input with id="email"' },
      ],
      solution: `<label for="email">Email</label>\n<input id="email" type="email">`,
      explain: 'The label for value must match the input id.',
    },
  ],
  'ex-css-2': [
    {
      type: 'choice',
      prompt: 'Code reading: which declaration has a syntax error?',
      code: '.card {\n  color: #e6f1ff\n  background: #0f131a;\n}',
      options: [
        'color is missing a semicolon',
        'background is invalid',
        'The selector is invalid',
        'Nothing is wrong',
      ],
      answer: 0,
      explain: 'Declarations must end with a semicolon; without it the next declaration is swallowed.',
    },
  ],
  'ex-css-5': [
    {
      type: 'code',
      language: 'css',
      prompt: 'Practical task: make .panel use two columns once the viewport is at least 720px wide.',
      starter: '/* write your CSS below */\n',
      checks: [
        { pattern: '@media[^{]*\\(min-width\\s*:\\s*720px\\)', flags: 'i', message: 'Add a min-width media query for 720px' },
        { pattern: '\\.panel\\s*\\{[^}]*grid-template-columns\\s*:\\s*(repeat\\(2,\\s*1fr\\)|1fr\\s+1fr)', flags: 'is', message: 'Use a two-column grid inside the query' },
      ],
      solution: `@media (min-width: 720px) {\n  .panel {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n  }\n}`,
      explain: 'Mobile-first: the base layout is one column, the media query enhances it.',
    },
  ],
  'ex-js-3': [
    {
      type: 'choice',
      prompt: 'Debugging: what does this log?',
      code: 'const score = 8;\nif (score = 10) {\n  console.log("ten");\n} else {\n  console.log("other");\n}',
      options: [
        '"ten", because assignment sets score to 10',
        '"other", because 8 is not 10',
        'A TypeError is thrown',
        'Nothing is logged',
      ],
      answer: 0,
      explain: 'A single = assigns instead of comparing. Use === to compare.',
    },
  ],
  'ex-js-6': [
    {
      type: 'choice',
      prompt: 'Code reading: what is the result?',
      code: 'const nums = [1, 2, 3, 4];\nconst result = nums.filter(n => n % 2 === 0).map(n => n * 10);\nconsole.log(result);',
      options: ['[10, 20, 30, 40]', '[20, 40]', '[2, 4]', '[1, 2, 3, 4]'],
      answer: 1,
      explain: 'filter keeps 2 and 4, then map multiplies each by 10.',
    },
  ],
  'ex-js-7': [
    {
      type: 'code',
      language: 'javascript',
      prompt: 'Debug: make clicking a button with id "go" log "clicked" exactly once per click.',
      starter: '// write your code below\n',
      tests: [
        { expression: 'typeof document !== "undefined" ? typeof document.getElementById("go") : "object"', expected: 'object' },
      ],
      solution: `if (typeof document !== "undefined") {\n  const button = document.getElementById("go");\n  if (button) {\n    button.addEventListener("click", () => console.log("clicked"));\n  }\n}`,
      explain: 'Select the element, guard against null, then add a single click listener.',
    },
  ],
};

for (const course of COURSES) {
  for (const lesson of course.lessons) {
    const extras = EXTRA_QUESTIONS[lesson.exercise.id];
    if (extras) lesson.exercise.questions.push(...extras);
  }
}

/* ------------------------------------------------------------------ */
/* Expanded curriculum: modules and additional lessons.               */
/*                                                                    */
/* Existing lessons are kept exactly as they were. Each course plan    */
/* lists every lesson id once, in teaching order, so the course page   */
/* can render modules while navigation, search and progress continue   */
/* to work from the same flat lessons array.                           */
/* ------------------------------------------------------------------ */
const COURSE_PLANS = {
  html: { modules: HTML_MODULES, lessons: HTML_LESSONS },
  css: { modules: CSS_MODULES, lessons: CSS_LESSONS },
  js: { modules: JS_MODULES, lessons: JS_LESSONS },
};

function applyCoursePlan(course, plan) {
  const byId = new Map(course.lessons.map((lesson) => [lesson.id, lesson]));

  for (const lesson of plan.lessons) {
    if (byId.has(lesson.id)) {
      throw new Error(`Duplicate lesson id "${lesson.id}" in ${course.id}`);
    }
    byId.set(lesson.id, lesson);
  }

  const ordered = [];
  const used = new Set();

  course.modules = plan.modules.map((module, moduleIndex) => {
    const moduleLessons = module.lessonIds.map((lessonId) => {
      const lesson = byId.get(lessonId);
      if (!lesson) throw new Error(`Unknown lesson "${lessonId}" in module "${module.id}"`);
      if (used.has(lessonId)) {
        throw new Error(`Lesson "${lessonId}" appears in more than one ${course.id} module`);
      }
      used.add(lessonId);
      return lesson;
    });

    for (const lesson of moduleLessons) {
      lesson.moduleId = module.id;
      lesson.moduleTitle = module.title;
      lesson.moduleOrder = moduleIndex + 1;
      ordered.push(lesson);
    }

    return {
      id: module.id,
      title: module.title,
      description: module.description,
      order: moduleIndex + 1,
      lessonIds: [...module.lessonIds],
      lessonCount: moduleLessons.length,
    };
  });

  // Any lesson accidentally left out of the plan still gets a home, so
  // progress and search never silently lose content.
  for (const lesson of byId.values()) {
    if (!used.has(lesson.id)) {
      lesson.moduleId = course.modules[course.modules.length - 1].id;
      lesson.moduleTitle = course.modules[course.modules.length - 1].title;
      lesson.moduleOrder = course.modules.length;
      ordered.push(lesson);
    }
  }

  ordered.forEach((lesson, index) => {
    lesson.order = index + 1;
  });

  course.lessons = ordered;
}

for (const course of COURSES) {
  const plan = COURSE_PLANS[course.id];
  if (plan) applyCoursePlan(course, plan);
}

/** Flat list of every lesson, in course order. */
export const ALL_LESSONS = COURSES.flatMap((course) =>
  course.lessons.map((lesson) => ({ ...lesson, courseId: course.id, courseTitle: course.title }))
);

/** Find one course by its id (returns undefined when unknown). */
export function getCourse(courseId) {
  return COURSES.find((course) => course.id === courseId);
}

/** Find one lesson inside a course. */
export function getLesson(courseId, lessonId) {
  const course = getCourse(courseId);
  if (!course) return null;
  const lesson = course.lessons.find((item) => item.id === lessonId);
  return lesson ? { lesson, course } : null;
}

/** Find a lesson across all courses using only its lesson id. */
export function getLessonById(lessonId) {
  return ALL_LESSONS.find((lesson) => lesson.id === lessonId) || null;
}

/** Every exercise with its course/lesson context, for the exercises page. */
export const ALL_EXERCISES = COURSES.flatMap((course) =>
  course.lessons.map((lesson) => ({
    ...lesson.exercise,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    courseId: course.id,
    courseTitle: course.title,
    courseTagClass: course.tagClass,
    courseBadge: course.badge,
  }))
);

/** Total number of lessons across all courses. */
export const LESSON_COUNT = ALL_LESSONS.length;

/** Total number of exercises. */
export const EXERCISE_COUNT = ALL_EXERCISES.length;


/**
 * Projects — progressively harder builds with requirements, steps and criteria.
 */
export const PROJECTS = [
  {
    id: 'proj-personal-portfolio',
    title: 'Personal Portfolio Page',
    summary: 'Build a responsive personal portfolio with semantic HTML, modern CSS and accessible navigation.',
    level: 'Beginner',
    levelBadge: 'PRJ',
    difficulty: 'Beginner',
    focus: 'HTML · CSS',
    estimatedTime: '2–3 hours',
    overview: `<p>Create a polished, multi-section portfolio page that showcases your work, skills and contact details. Focus on semantic structure, responsive layout and clean typography.</p>`,
    requirements: [
      'Use semantic HTML5 elements (header, nav, main, section, footer)',
      'Include at least 4 sections: About, Projects, Skills, Contact',
      'Style with CSS variables and a responsive layout (flexbox/grid)',
      'Add a mobile-friendly navigation menu',
      'Include accessible alt text for images and proper heading hierarchy',
    ],
    steps: [
      '<strong>Plan structure:</strong> Sketch your sections and content first.',
      '<strong>Markup:</strong> Write semantic HTML with proper headings and links.',
      '<strong>Styling:</strong> Apply a design system with CSS variables, spacing scale and responsive rules.',
      '<strong>Interactivity:</strong> Add a simple mobile nav toggle with JavaScript.',
      '<strong>Polish:</strong> Test on desktop, tablet and mobile for readability.',
    ],
    completionCriteria: [
      'Page is responsive down to 375px width',
      'All sections are present with meaningful content',
      'Navigation works on mobile and desktop',
      'No horizontal scroll on common breakpoints',
      'HTML validates in structure and accessibility basics',
    ],
    resources: `<p>Review <a href="lesson.html?course=html&id=html-4">Links, Images &amp; Lists</a>, <a href="lesson.html?course=css&id=css-4">Flexbox Layout</a> and <a href="lesson.html?course=css&id=css-5">Responsive Design</a>.</p>`,
  },
  {
    id: 'proj-landing-page',
    title: 'Product Landing Page',
    summary: 'Convert a product idea into a conversion-focused landing page with hero, features, CTA and form.',
    level: 'Intermediate',
    levelBadge: 'PRJ',
    difficulty: 'Intermediate',
    focus: 'HTML · CSS · UX',
    estimatedTime: '3–4 hours',
    overview: `<p>Build a modern product landing page with strong visual hierarchy, persuasive copy blocks and a call-to-action. Prioritize mobile-first responsive design.</p>`,
    requirements: [
      'Hero section with headline, subtext, primary CTA and image/graphic',
      'Features grid highlighting 3–6 benefits',
      'Testimonials or social proof section',
      'Pricing/CTA section with clear action',
      'Contact/Signup form with basic validation styling',
      'Sticky header and smooth scroll navigation',
    ],
    steps: [
      '<strong>Wireframe:</strong> Map sections and user flow.',
      '<strong>Markup:</strong> Build semantic structure and forms.',
      '<strong>Styles:</strong> Implement mobile-first CSS with grid/flexbox.',
      '<strong>Details:</strong> Add hover states, focus states and transitions.',
      '<strong>Test:</strong> Check contrast, keyboard navigation and responsiveness.',
    ],
    completionCriteria: [
      'Mobile-first and fully responsive',
      'All CTAs are clearly visible and keyboard accessible',
      'Form inputs have labels and focus states',
      'Consistent spacing and typography scale',
      'Clear visual hierarchy guides the user to CTA',
    ],
    resources: `<p>Review <a href="lesson.html?course=css&id=css-7">CSS Grid</a>, <a href="lesson.html?course=html&id=html-5">HTML Forms</a> and <a href="lesson.html?course=css&id=css-5">Responsive Design</a>.</p>`,
  },
  {
    id: 'proj-interactive-quiz',
    title: 'Interactive Quiz App',
    summary: 'Create a dynamic quiz with multiple choice questions, scoring, feedback and progress tracking.',
    level: 'Intermediate-Advanced',
    levelBadge: 'PRJ',
    difficulty: 'Intermediate-Advanced',
    focus: 'HTML · CSS · JavaScript',
    estimatedTime: '4–6 hours',
    overview: `<p>Build an interactive quiz using vanilla JavaScript. Track questions, validate answers, show explanations and calculate scores with a results screen.</p>`,
    requirements: [
      'Load questions from a JavaScript array of objects',
      'Display one question at a time with multiple choice options',
      'Track current question index and user selections',
      'Show instant feedback with correct answer and explanation',
      'Calculate and display final score on completion',
      'Allow restarting the quiz',
      'Store best score in localStorage',
    ],
    steps: [
      '<strong>Data model:</strong> Define question objects with options, answer and explanation.',
      '<strong>UI:</strong> Build quiz container, question, options, buttons and results screen.',
      '<strong>Logic:</strong> Implement navigation, answer checking and scoring.',
      '<strong>State:</strong> Manage quiz state and persist best score.',
      '<strong>Polish:</strong> Add animations, accessibility and error handling.',
    ],
    completionCriteria: [
      'All questions render correctly',
      'Scoring is accurate and displayed clearly',
      'Explanations shown for answers',
      'Best score persists across page reloads',
      'Works without external libraries',
      'Keyboard accessible controls',
    ],
    resources: `<p>Review <a href="lesson.html?course=js&id=js-11">Functions in Depth</a>, <a href="lesson.html?course=js&id=js-17">DOM Manipulation</a> and <a href="lesson.html?course=js&id=js-18">Events</a>.</p>`,
  },
  {
    id: 'proj-task-tracker',
    title: 'Task Tracker with Persistence',
    summary: 'Build a full-featured task manager with add/edit/complete/filter, localStorage and clean UI.',
    level: 'Advanced',
    levelBadge: 'PRJ',
    difficulty: 'Advanced',
    focus: 'HTML · CSS · JavaScript',
    estimatedTime: '5–8 hours',
    overview: `<p>Create a production-style task tracker with CRUD operations, filters, due dates, and persistence. Focus on clean architecture and good UX.</p>`,
    requirements: [
      'Add new tasks with title and optional due date',
      'Mark tasks complete/incomplete and delete tasks',
      'Edit existing tasks inline or via modal',
      'Filter by All/Active/Completed',
      'Count of active tasks displayed',
      'Persist all data to localStorage',
      'Empty state when no tasks match filter',
    ],
    steps: [
      '<strong>Structure:</strong> Design data model (array of task objects).',
      '<strong>UI:</strong> Build form, task list, filters and stats.',
      '<strong>CRUD:</strong> Implement add, toggle, edit, delete operations.',
      '<strong>Persistence:</strong> Save/load from localStorage on changes.',
      '<strong>Refine:</strong> Add validation, keyboard support and animations.',
    ],
    completionCriteria: [
      'All CRUD operations work correctly',
      'Data persists after refresh',
      'Filters update list correctly',
      'Input validation prevents empty tasks',
      'Accessible form controls and buttons',
      'No console errors',
    ],
    resources: `<p>Review <a href="lesson.html?course=js&id=js-6">Arrays &amp; Objects</a>, <a href="lesson.html?course=js&id=js-18">Events</a> and <a href="lesson.html?course=js&id=js-16">DOM Selection</a>.</p>`,
  },
];

/* Add the expanded project path and keep the list ordered by difficulty. */
PROJECTS.push(...EXTRA_PROJECTS);

const PROJECT_DIFFICULTY_ORDER = {
  Beginner: 0,
  Intermediate: 1,
  'Intermediate-Advanced': 2,
  Advanced: 3,
};

PROJECTS.sort(
  (a, b) => (PROJECT_DIFFICULTY_ORDER[a.difficulty] ?? 99) - (PROJECT_DIFFICULTY_ORDER[b.difficulty] ?? 99)
);

export function getProject(id) {
  return PROJECTS.find((p) => p.id === id) || null;
}

/** All projects that belong to a given course focus, e.g. "JavaScript". */
export function getProjectsForCourse(courseId) {
  const label = { html: 'HTML', css: 'CSS', js: 'JavaScript' }[courseId];
  if (!label) return [];
  return PROJECTS.filter((project) => String(project.focus).includes(label));
}
