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
    ],
  },
];

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
