/**
 * html-course.js — expanded HTML curriculum.
 *
 * The modules describe the teaching order. Every existing lesson keeps its
 * content and id; these new lessons fill the gaps between beginner topics and
 * the complete HTML project at the end of the path.
 */

import { choice, fill, htmlCode, exerciseFor } from './helpers.js';

export const HTML_MODULES = [
  {
    id: 'html-m1',
    title: 'The Web and HTML Basics',
    description: 'How browsers and servers talk, plus the elements every document needs.',
    lessonIds: ['html-8', 'html-1', 'html-2'],
  },
  {
    id: 'html-m2',
    title: 'Text, Headings and Lists',
    description: 'Turn raw text into a readable outline and organise content into lists.',
    lessonIds: ['html-3', 'html-9'],
  },
  {
    id: 'html-m3',
    title: 'Links, Images and Media',
    description: 'Connect pages, show images well and embed audio, video and third-party content.',
    lessonIds: ['html-4', 'html-10', 'html-13'],
  },
  {
    id: 'html-m4',
    title: 'Tables, Data and Forms',
    description: 'Present tabular data and collect input that is usable and accessible.',
    lessonIds: ['html-6', 'html-11', 'html-5', 'html-12'],
  },
  {
    id: 'html-m5',
    title: 'Semantic HTML',
    description: 'Choose elements for meaning so browsers, search engines and assistive tools understand the page.',
    lessonIds: ['html-14'],
  },
  {
    id: 'html-m6',
    title: 'Accessibility',
    description: 'Make every interaction work for keyboard and screen-reader users.',
    lessonIds: ['html-7', 'html-15'],
  },
  {
    id: 'html-m7',
    title: 'SEO Fundamentals',
    description: 'Help search engines understand, index and share your pages.',
    lessonIds: ['html-16'],
  },
  {
    id: 'html-m8',
    title: 'Complete HTML Project',
    description: 'Plan, build and review a full multi-section conference page.',
    lessonIds: ['html-17'],
  },
];

export const HTML_LESSONS = [
  {
    id: 'html-8',
    title: 'How the Web Works',
    summary: 'Follow a page from URL to browser, and learn the vocabulary behind every website.',
    minutes: 10,
    content: `
<h2 id="request-response">Clients, servers and HTTP</h2>
<p>The web is a conversation between a <strong>client</strong> (usually a browser) and a <strong>server</strong>. When you open a page the browser sends an <strong>HTTP request</strong>; the server answers with an <strong>HTTP response</strong> containing a status code, headers and a body — often HTML.</p>
<ul>
  <li><strong>200</strong> means the request succeeded.</li>
  <li><strong>301/302</strong> redirect you somewhere else.</li>
  <li><strong>404</strong> means the resource does not exist.</li>
  <li><strong>500</strong> means the server failed while handling the request.</li>
</ul>

<h2 id="url">Anatomy of a URL</h2>
<p>A URL such as <code>https://example.com/blog/post?id=3#comments</code> has several parts:</p>
<ul>
  <li><code>https://</code> — the protocol (scheme).</li>
  <li><code>example.com</code> — the domain name.</li>
  <li><code>/blog/post</code> — the path to the resource.</li>
  <li><code>?id=3</code> — the query string, extra data for the server.</li>
  <li><code>#comments</code> — the fragment, handled by the browser (it scrolls to an element).</li>
</ul>

<h2 id="dns">DNS: turning names into addresses</h2>
<p>Computers find each other with IP addresses. <strong>DNS</strong> (Domain Name System) is the phone book that translates <code>example.com</code> into an IP address. Once the address is known, the browser connects to the server and requests the page.</p>

<h2 id="rendering">What the browser does next</h2>
<ol>
  <li>It downloads the HTML, then discovers CSS, images and scripts referenced by the document.</li>
  <li>It parses the HTML into a <strong>DOM</strong> tree and CSS into a style tree.</li>
  <li>It calculates layout, paints pixels and runs JavaScript as the page becomes interactive.</li>
</ol>
<div class="note note-tip"><strong>Use DevTools</strong>Open the browser's developer tools and watch the Network panel while reloading a page. You will see every request, its status code and how long it took.</div>
`,
    demo: {
      type: 'html',
      title: 'The smallest useful web page',
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>How the web works</title>
  </head>
  <body>
    <h1>Hello from a web page</h1>
    <p>This HTML travelled from a server to your browser.</p>
  </body>
</html>`,
    },
    objectives: [
      'Describe the request/response cycle between a browser and a server.',
      'Identify the parts of a URL.',
      'Explain the role of DNS, HTTP status codes and the DOM.',
    ],
    tasks: [
      'Open DevTools → Network, reload this page and find the HTML request.',
      'Write a URL that includes a path, a query string and a fragment.',
      'Explain what a 404 response means to a non-technical friend.',
    ],
    takeaways: [
      'Browsers request resources; servers respond with status codes and content.',
      'DNS maps human-friendly domains to IP addresses.',
      'HTML is parsed into a DOM before the page can be displayed.',
    ],
    exercise: exerciseFor('html-8', 'how the web works', [
      choice('What does a browser send to a server when it opens a page?', ['An HTTP request', 'A CSS file', 'A database query', 'A DNS record'], 0, 'The browser sends an HTTP request and the server sends an HTTP response.'),
      choice('In https://example.com/blog/post?id=3, which part is the path?', ['https', 'example.com', '/blog/post', '?id=3'], 2, 'The path identifies the resource on the server: /blog/post.'),
      fill('Complete the sentence: the part before :// in a URL is called the ___.', 'https://example.com\n___', [['protocol', 'scheme']], 'https is the protocol (also called scheme).'),
      choice('Which status code means the requested page was not found?', ['200', '301', '404', '500'], 2, '404 is the standard "Not Found" response.'),
      choice('What is the main job of DNS?', ['To style HTML', 'To translate domain names into IP addresses', 'To encrypt passwords', 'To compress images'], 1, 'DNS resolves a domain such as example.com to the IP address of a server.'),
      htmlCode('Create a page heading "Welcome" and a paragraph "Hello, web.".', '<!-- write your HTML below -->\n', [
        { pattern: '<h1[^>]*>\\s*Welcome\\s*</h1>', flags: 'i', message: 'Add an h1 containing Welcome' },
        { pattern: '<p[^>]*>\\s*Hello,\\s*web\\.\\s*</p>', flags: 'i', message: 'Add a paragraph containing Hello, web.' },
      ], `<h1>Welcome</h1>\n<p>Hello, web.</p>`, 'Headings describe the page; paragraphs hold the text.'),
    ]),
  },

  {
    id: 'html-9',
    title: 'Lists: Organising Content',
    summary: 'Use unordered, ordered, description and nested lists in the right situations.',
    minutes: 11,
    content: `
<h2 id="why-lists">Why lists matter</h2>
<p>Lists group related items and make their relationship explicit. Screen readers announce how many items a list contains, and search engines understand that the items belong together.</p>

<h2 id="unordered">Unordered lists</h2>
<p>Use <code>&lt;ul&gt;</code> when the order of the items does not matter, such as a navigation menu or a list of features.</p>
<pre><code class="language-html">&lt;ul&gt;
  &lt;li&gt;Semantic HTML&lt;/li&gt;
  &lt;li&gt;Responsive CSS&lt;/li&gt;
  &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<h2 id="ordered">Ordered lists</h2>
<p>Use <code>&lt;ol&gt;</code> when the order carries meaning — instructions, rankings or a recipe. The <code>type</code> attribute changes the marker (for example <code>type="A"</code>) and <code>start="3"</code> changes the first number.</p>

<h2 id="description">Description lists</h2>
<p><code>&lt;dl&gt;</code> pairs a term (<code>dt</code>) with its description (<code>dd</code>). It is ideal for glossaries, metadata and FAQs.</p>
<pre><code class="language-html">&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;The structure of a web page.&lt;/dd&gt;
  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;The visual style of a web page.&lt;/dd&gt;
&lt;/dl&gt;</code></pre>

<h2 id="nested">Nested lists</h2>
<p>Put a complete list inside an <code>&lt;li&gt;</code> — never directly inside another <code>ul</code> or <code>ol</code>. This keeps the hierarchy valid.</p>
<pre><code class="language-html">&lt;ul&gt;
  &lt;li&gt;Front end
    &lt;ul&gt;
      &lt;li&gt;HTML&lt;/li&gt;
      &lt;li&gt;CSS&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
<div class="note"><strong>Common mistake</strong>A <code>&lt;ul&gt;</code> may only contain <code>&lt;li&gt;</code>, <code>&lt;script&gt;</code> and <code>&lt;template&gt;</code> children. Put text and links inside an <code>&lt;li&gt;</code>.</div>
`,
    demo: {
      type: 'html',
      title: 'Three kinds of list',
      html: `<h1>Lists</h1>
<h2>Course steps</h2>
<ol>
  <li>Learn HTML</li>
  <li>Learn CSS</li>
  <li>Learn JavaScript</li>
</ol>
<h2>Tools</h2>
<ul>
  <li>Browser</li>
  <li>Code editor</li>
</ul>
<h2>Glossary</h2>
<dl>
  <dt>HTML</dt>
  <dd>Structure and meaning.</dd>
</dl>`,
    },
    objectives: [
      'Choose between ul, ol and dl for a given content type.',
      'Write valid list items and nested lists.',
      'Use description lists for terms and definitions.',
    ],
    tasks: [
      'Turn a paragraph of features into an unordered list.',
      'Create a numbered recipe with at least four steps.',
      'Add a nested list of two subtopics under one main topic.',
    ],
    takeaways: [
      'Use ul when order is irrelevant and ol when it matters.',
      'dl/dt/dd pairs terms with descriptions.',
      'A nested list belongs inside an li, not directly inside another list.',
    ],
    exercise: exerciseFor('html-9', 'lists', [
      choice('Which element should wrap a list of features where order does not matter?', ['<ol>', '<ul>', '<dl>', '<menu>'], 1, 'Unordered lists are for items whose sequence is not meaningful.'),
      choice('Which structure is correct for a glossary entry?', ['<ul><dt>HTML</dt></ul>', '<dl><dt>HTML</dt><dd>Markup language</dd></dl>', '<ol><li>HTML</li></ol>', '<dl><li>HTML</li></dl>'], 1, 'Description lists pair each dt term with one or more dd descriptions.'),
      fill('Complete the ordered list with two items.', '<___>\n  <li>Plan</li>\n  <li>Build</li>\n</___>', [['ol'], ['ol']], 'An ordered list uses <ol> and </ol>.'),
      choice('Where should a nested <ul> be placed?', ['Directly inside the parent <ul>', 'Inside an <li> of the parent list', 'After the parent </ul>', 'Inside a <p>'], 1, 'Nested lists live inside an li so the parent still contains only valid list items.'),
      htmlCode('Build a navigation list with a ul containing two links to "Home" and "About".', '<!-- write your list below -->\n', [
        { pattern: '<ul[^>]*>', flags: 'i', message: 'Start an unordered list' },
        { pattern: '<li[^>]*>[\\s\\S]*?<a[^>]*>\\s*Home\\s*</a>[\\s\\S]*?</li>', flags: 'i', message: 'Add a list item with a Home link' },
        { pattern: '<li[^>]*>[\\s\\S]*?<a[^>]*>\\s*About\\s*</a>[\\s\\S]*?</li>', flags: 'i', message: 'Add a list item with an About link' },
      ], `<ul>\n  <li><a href="index.html">Home</a></li>\n  <li><a href="about.html">About</a></li>\n</ul>`, 'Navigation is a list of links, usually inside a nav landmark.'),
    ]),
  },

  {
    id: 'html-10',
    title: 'Images and Responsive Images',
    summary: 'Add images with useful alt text, stable dimensions and responsive sources.',
    minutes: 12,
    content: `
<h2 id="img">The image element</h2>
<p><code>&lt;img&gt;</code> is a void element: it has no closing tag. Two attributes are essential:</p>
<pre><code class="language-html">&lt;img src="cat.jpg" alt="A ginger cat sleeping on a laptop"&gt;</code></pre>
<ul>
  <li><code>src</code> points to the image file. Paths can be relative (<code>images/cat.jpg</code>) or absolute URLs.</li>
  <li><code>alt</code> describes the image for screen readers and when the file fails to load. Decorative images use <code>alt=""</code>.</li>
</ul>

<h2 id="dimensions">Prevent layout shift</h2>
<p>Always provide <code>width</code> and <code>height</code> so the browser reserves space before the image downloads. CSS can still make the image flexible:</p>
<pre><code class="language-css">img {
  max-width: 100%;
  height: auto;
}</code></pre>

<h2 id="lazy">Load images efficiently</h2>
<p><code>loading="lazy"</code> tells the browser to defer off-screen images. Add <code>decoding="async"</code> for images that are not critical to the first paint. Do not lazy-load the main hero image — it should appear immediately.</p>

<h2 id="responsive">Responsive and art-directed images</h2>
<p><code>srcset</code> offers several resolutions and <code>sizes</code> tells the browser how wide the image will be displayed. The browser picks the smallest suitable file.</p>
<pre><code class="language-html">&lt;img
  src="photo-640.jpg"
  srcset="photo-640.jpg 640w, photo-1280.jpg 1280w"
  sizes="(min-width: 800px) 50vw, 100vw"
  alt="Mountain lake at sunrise"&gt;</code></pre>
<p>When different crops are needed, use <code>&lt;picture&gt;</code> with <code>&lt;source media="…"&gt;</code>. A <code>&lt;figure&gt;</code> groups an image with a visible <code>&lt;figcaption&gt;</code>.</p>
<div class="note note-warn"><strong>Alt text is not a filename</strong>Write what the image communicates, not "image" or "IMG_2043.jpg". Keep it short and specific.</div>
`,
    demo: {
      type: 'html',
      title: 'Figure, caption and responsive image styles',
      html: `<h1>Image examples</h1>
<figure>
  <img src="https://picsum.photos/seed/codelearn/640/360" alt="A random landscape used as a placeholder" width="640" height="360" loading="lazy">
  <figcaption>A landscape with a caption. Replace the src with your own image.</figcaption>
</figure>
<style>
  img { max-width: 100%; height: auto; border-radius: 12px; }
  figure { margin: 0; }
  figcaption { color: #555; font-size: 0.9rem; margin-top: 0.5rem; }
</style>`,
    },
    objectives: [
      'Write an img element with a useful src and alt description.',
      'Reserve image space with width and height.',
      'Use srcset, sizes and picture for responsive images.',
    ],
    tasks: [
      'Add a meaningful alt attribute to a photo in the demo.',
      'Convert a large image to use max-width: 100% in CSS.',
      'Write a srcset with two widths and a sizes rule.',
    ],
    takeaways: [
      'Every meaningful image needs specific alt text; decorative images use alt="".',
      'Width and height prevent layout shift while the image loads.',
      'srcset, sizes and picture let the browser choose an efficient image.',
    ],
    exercise: exerciseFor('html-10', 'images', [
      choice('What is the main purpose of the alt attribute?', ['To set the image size', 'To describe the image for screen readers and failed loads', 'To choose an image format', 'To add a hover effect'], 1, 'alt provides a text alternative for people and situations where the image cannot be seen.'),
      fill('Complete the image element with descriptive alt text.', '<img src="team.jpg" ___="The CodeLearn team at a conference">', [['alt']], 'The attribute is alt, not description.'),
      choice('Why should width and height be set on an image?', ['To make it load faster', 'To reserve space and prevent layout shift', 'To improve the alt text', 'To enable lazy loading'], 1, 'Aspect-ratio space is reserved before the image arrives, so content does not jump.'),
      choice('What does loading="lazy" do?', ['Compresses the image', 'Defers loading until the image is near the viewport', 'Removes the image on mobile', 'Adds a caption'], 1, 'Lazy loading saves bandwidth for images users may never scroll to.'),
      htmlCode('Create a figure containing an image with src "map.png", alt "Campus map", and a figcaption "Campus map".', '<!-- write your figure below -->\n', [
        { pattern: '<figure[^>]*>', flags: 'i', message: 'Wrap the image in a figure' },
        { pattern: '<img[^>]*src=["\']map\\.png["\'][^>]*alt=["\'][^"\']*Campus map[^"\']*["\']|<img[^>]*alt=["\'][^"\']*Campus map[^"\']*["\'][^>]*src=["\']map\\.png["\']', flags: 'i', message: 'Add the image with src and alt Campus map' },
        { pattern: '<figcaption[^>]*>\\s*Campus map\\s*</figcaption>', flags: 'i', message: 'Add a figcaption containing Campus map' },
      ], `<figure>\n  <img src="map.png" alt="Campus map">\n  <figcaption>Campus map</figcaption>\n</figure>`, 'figure + figcaption gives the image a visible, programmatic caption.'),
      choice('Which attribute set helps the browser choose the best image resolution?', ['src + alt', 'srcset + sizes', 'width + height', 'class + id'], 1, 'srcset lists candidate files and sizes describes the rendered width.'),
    ]),
  },

  {
    id: 'html-11',
    title: 'Tables in Depth',
    summary: 'Build accessible data tables with captions, headers, scopes and grouped rows.',
    minutes: 13,
    content: `
<h2 id="when">When to use a table</h2>
<p>Tables are for <strong>data that needs rows and columns</strong> — timetables, prices, statistics. Never use them to lay out a page; CSS Grid and Flexbox handle layout.</p>

<h2 id="structure">A complete table structure</h2>
<pre><code class="language-html">&lt;table&gt;
  &lt;caption&gt;Course schedule&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Day&lt;/th&gt;
      &lt;th scope="col"&gt;Topic&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Monday&lt;/th&gt;
      &lt;td&gt;HTML&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
<ul>
  <li><code>caption</code> names the table and must be the first child.</li>
  <li><code>thead</code>, <code>tbody</code> and <code>tfoot</code> group rows logically.</li>
  <li><code>th</code> marks header cells; <code>td</code> marks data cells.</li>
  <li><code>scope="col"</code> and <code>scope="row"</code> tell assistive technology which cells a header describes.</li>
</ul>

<h2 id="spanning">Merging cells</h2>
<p><code>colspan</code> merges cells across columns and <code>rowspan</code> merges down rows. Count carefully: a row must still describe the same number of columns as its header.</p>
<pre><code class="language-html">&lt;tr&gt;
  &lt;td colspan="2"&gt;Lunch break&lt;/td&gt;
&lt;/tr&gt;</code></pre>

<h2 id="responsive-tables">Tables on small screens</h2>
<p>Wrap wide tables in a scroll container instead of shrinking text to unreadable sizes:</p>
<pre><code class="language-css">.table-wrap {
  overflow-x: auto;
}</code></pre>
<div class="note note-tip"><strong>Accessibility check</strong>Use a screen reader or the accessibility tree in DevTools. Each data cell should be announced together with its row and column headers.</div>
`,
    demo: {
      type: 'html',
      title: 'Accessible table with caption and scopes',
      html: `<h1>Weekly plan</h1>
<div style="overflow-x:auto">
  <table>
    <caption>Study schedule</caption>
    <thead>
      <tr><th scope="col">Day</th><th scope="col">Topic</th><th scope="col">Minutes</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Monday</th><td>HTML</td><td>45</td></tr>
      <tr><th scope="row">Tuesday</th><td>CSS</td><td>60</td></tr>
    </tbody>
  </table>
</div>
<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #bbb; padding: 8px 12px; text-align: left; }
  caption { text-align: left; font-weight: 700; padding-bottom: 6px; }
</style>`,
    },
    objectives: [
      'Structure a table with caption, thead, tbody and tfoot.',
      'Use th, scope, colspan and rowspan correctly.',
      'Make a wide table usable on small screens.',
    ],
    tasks: [
      'Add a caption and a thead to a table with three columns.',
      'Mark one column header with scope="col".',
      'Wrap a wide table in a horizontally scrollable container.',
    ],
    takeaways: [
      'Tables are for data, not page layout.',
      'Caption names a table; thead/tbody/tfoot group its rows.',
      'Scope attributes tell assistive technology which cells a header describes.',
    ],
    exercise: exerciseFor('html-11', 'tables', [
      choice('Which element gives a table its accessible name?', ['<thead>', '<caption>', '<th>', '<tfoot>'], 1, 'caption is the table title and should be the first child of table.'),
      fill('Make a header cell describe its whole column.', '<th ___="col">Price</th>', [['scope']], 'scope="col" associates a header with a column.'),
      choice('What does colspan="2" do?', ['Merges two rows', 'Merges two columns', 'Adds two captions', 'Creates two tables'], 1, 'colspan makes one cell span two columns.'),
      choice('Why should tables not be used for page layout?', ['They are not supported in HTML5', 'They hurt accessibility and responsive design', 'They cannot contain text', 'They are slower than grids'], 1, 'Tables describe data relationships; CSS layout tools are better for arranging a page.'),
      htmlCode('Create a table with caption "Prices", a head row with Name and Price, and one body row with Tea and 3.', '<!-- write your table below -->\n', [
        { pattern: '<table[^>]*>', flags: 'i', message: 'Add a table element' },
        { pattern: '<caption[^>]*>\\s*Prices\\s*</caption>', flags: 'i', message: 'Add a caption containing Prices' },
        { pattern: '<th[^>]*>\\s*Name\\s*</th>', flags: 'i', message: 'Add a Name header cell' },
        { pattern: '<th[^>]*>\\s*Price\\s*</th>', flags: 'i', message: 'Add a Price header cell' },
        { pattern: '<td[^>]*>\\s*Tea\\s*</td>', flags: 'i', message: 'Add a Tea data cell' },
        { pattern: '<td[^>]*>\\s*3\\s*</td>', flags: 'i', message: 'Add a 3 data cell' },
      ], `<table>\n  <caption>Prices</caption>\n  <thead>\n    <tr><th>Name</th><th>Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Tea</td><td>3</td></tr>\n  </tbody>\n</table>`, 'A caption plus header cells makes the data understandable before it is even read cell by cell.'),
    ]),
  },

  {
    id: 'html-12',
    title: 'Forms in Depth: Validation and Accessibility',
    summary: 'Build robust forms with labels, fieldsets, input types and native validation.',
    minutes: 16,
    content: `
<h2 id="form">The form element</h2>
<pre><code class="language-html">&lt;form action="/subscribe" method="post"&gt;
  …
&lt;/form&gt;</code></pre>
<p><code>action</code> is the server endpoint and <code>method</code> is usually <code>post</code> for changes or <code>get</code> for searches. A submit button triggers the request.</p>

<h2 id="labels">Labels are not optional</h2>
<p>Every control needs a programmatic label. Clicking the label should focus the control, which helps mouse, touch and screen-reader users.</p>
<pre><code class="language-html">&lt;label for="email"&gt;Email address&lt;/label&gt;
&lt;input id="email" name="email" type="email" autocomplete="email" required&gt;</code></pre>
<p>Wrap related radio buttons and checkboxes in <code>&lt;fieldset&gt;</code> with a <code>&lt;legend&gt;</code> so the group has a name.</p>

<h2 id="types">Useful input types</h2>
<ul>
  <li><code>email</code>, <code>url</code>, <code>tel</code> — mobile keyboards adapt.</li>
  <li><code>number</code>, <code>range</code> — numeric input with <code>min</code>, <code>max</code>, <code>step</code>.</li>
  <li><code>date</code>, <code>time</code> — date and time pickers.</li>
  <li><code>password</code> — hides characters; never use it as your only security.</li>
  <li><code>file</code> — lets users upload a file; add <code>accept</code> to narrow the file picker.</li>
</ul>

<h2 id="validation">Native validation</h2>
<p>Attributes such as <code>required</code>, <code>minlength</code>, <code>maxlength</code>, <code>min</code>, <code>max</code> and <code>pattern</code> let the browser validate before submitting. Always validate again on the server: anything in the browser can be bypassed.</p>
<pre><code class="language-html">&lt;input type="text" name="username" minlength="3" maxlength="20" required&gt;
&lt;input type="text" name="code" pattern="[A-Z]{3}-[0-9]{2}" title="Three letters, a dash, two digits"&gt;</code></pre>

<h2 id="help">Helpful errors and hints</h2>
<p>Link a hint or error message with <code>aria-describedby</code>. Do not rely on colour alone, and keep the error text next to the field it belongs to.</p>
<div class="note note-warn"><strong>Placeholder trap</strong>A placeholder disappears as soon as the user types and is not a label. Keep a visible <code>&lt;label&gt;</code> and use the placeholder only for an example.</div>
`,
    demo: {
      type: 'html',
      title: 'A small accessible form',
      html: `<h1>Join the newsletter</h1>
<form>
  <p>
    <label for="name">Name</label><br>
    <input id="name" name="name" type="text" autocomplete="name" required>
  </p>
  <p>
    <label for="email">Email</label><br>
    <input id="email" name="email" type="email" autocomplete="email" required>
  </p>
  <fieldset>
    <legend>Topics</legend>
    <label><input type="checkbox" name="topic" value="html"> HTML</label>
    <label><input type="checkbox" name="topic" value="css"> CSS</label>
  </fieldset>
  <button type="submit">Subscribe</button>
</form>
<style>input, button { font: inherit; } label { display: inline-block; margin: 0.25rem 0; } fieldset { margin: 1rem 0; }</style>`,
    },
    objectives: [
      'Connect labels to inputs with for and id.',
      'Choose suitable input types and autocomplete values.',
      'Use native validation attributes and explain their limits.',
    ],
    tasks: [
      'Add a required email field with a matching label.',
      'Group three checkboxes in a fieldset with a legend.',
      'Create a pattern for a three-letter, two-digit code.',
    ],
    takeaways: [
      'Every control needs a visible, programmatic label.',
      'Input types improve keyboards, pickers and validation.',
      'Native validation is a convenience, not a replacement for server validation.',
    ],
    exercise: exerciseFor('html-12', 'forms', [
      choice('How do you connect a label to an input?', ['Give both the same class', 'Match the label for value to the input id', 'Put the input in a div', 'Use placeholder'], 1, 'The for attribute must equal the input id.'),
      fill('Make the email field mandatory.', '<input type="email" id="email" name="email" ___>', [['required']], 'required makes the browser refuse an empty submission.'),
      choice('Which element names a group of related radio buttons?', ['<label>', '<fieldset> with <legend>', '<select>', '<optgroup> with <option>'], 1, 'fieldset groups controls and legend gives the group a name.'),
      choice('Which input type gives mobile users an email keyboard?', ['text', 'email', 'password', 'search'], 1, 'type="email" requests the email keyboard and adds basic validation.'),
      choice('Why must a server validate form data too?', ['Browsers cannot validate', 'Client-side checks can be bypassed', 'HTML has no validation attributes', 'Only servers can show errors'], 1, 'Users can disable or bypass browser validation, so the server must never trust input.'),
      htmlCode('Build a form with a label "Email" linked to an email input that is required.', '<!-- write your form below -->\n', [
        { pattern: '<form[^>]*>', flags: 'i', message: 'Add a form element' },
        { pattern: '<label[^>]*for=["\']email["\'][^>]*>\\s*Email\\s*</label>', flags: 'i', message: 'Add a label for="email" containing Email' },
        { pattern: '<input[^>]*id=["\']email["\'][^>]*type=["\']email["\'][^>]*required|<input[^>]*type=["\']email["\'][^>]*required[^>]*id=["\']email["\']', flags: 'i', message: 'Add a required email input with id="email"' },
      ], `<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required>\n  <button type="submit">Send</button>\n</form>`, 'The label and input are connected by for/id, and required enables native validation.'),
    ]),
  },

  {
    id: 'html-13',
    title: 'Audio, Video and Embedded Content',
    summary: 'Embed media responsibly with controls, captions, fallbacks and secure iframes.',
    minutes: 14,
    content: `
<h2 id="audio-video">Native media elements</h2>
<p><code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> play media without plugins. Add <code>controls</code> so users can play, pause and change volume.</p>
<pre><code class="language-html">&lt;video controls width="640" poster="preview.jpg"&gt;
  &lt;source src="demo.mp4" type="video/mp4"&gt;
  &lt;source src="demo.webm" type="video/webm"&gt;
  Your browser does not support video. &lt;a href="demo.mp4"&gt;Download it&lt;/a&gt;.
&lt;/video&gt;</code></pre>
<p>The text between the tags is <strong>fallback content</strong> for browsers that cannot play the file. <code>poster</code> shows a preview image before playback.</p>

<h2 id="subtitles">Captions and transcripts</h2>
<p>Use <code>&lt;track kind="captions"&gt;</code> for subtitles that include sound effects. Captions are essential for deaf and hard-of-hearing users, and useful for everyone in a noisy room.</p>
<pre><code class="language-html">&lt;track kind="captions" src="demo-en.vtt" srclang="en" label="English" default&gt;</code></pre>
<p>Autoplay should be avoided; if it is truly necessary, start muted and never play sound unexpectedly. Provide a transcript for long audio.</p>

<h2 id="iframe">Embedding other pages</h2>
<p>An <code>&lt;iframe&gt;</code> loads another document inside yours — maps, videos or forms. Always set a <code>title</code> so screen readers can identify it.</p>
<pre><code class="language-html">&lt;iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="Introduction to HTML video"
  width="560" height="315"
  loading="lazy"
  allowfullscreen&gt;&lt;/iframe&gt;</code></pre>
<p>Use the <code>sandbox</code> attribute to restrict what embedded pages can do. Never embed untrusted content without it, and be aware that third-party embeds can set cookies.</p>

<h2 id="choice">Choosing the right tool</h2>
<ul>
  <li><strong>video/audio</strong> for media you host or control.</li>
  <li><strong>iframe</strong> for interactive third-party content.</li>
  <li>A <strong>link</strong> when the content does not need to appear inline.</li>
</ul>
<div class="note note-tip"><strong>Performance</strong>Load embeds lazily and prefer a lightweight preview image that links to the full embed. Third-party iframes can be surprisingly heavy.</div>
`,
    demo: {
      type: 'html',
      title: 'Audio, video and a safe iframe',
      html: `<h1>Media examples</h1>
<h2>Audio</h2>
<audio controls>
  <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
  Your browser does not support audio.
</audio>
<h2>Video</h2>
<video controls width="420" poster="https://picsum.photos/seed/video/420/236">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support video.
</video>
<h2>Iframe</h2>
<iframe title="Example embedded page" src="https://example.com" width="420" height="180" loading="lazy"></iframe>`,
    },
    objectives: [
      'Embed audio and video with controls, sources and fallback content.',
      'Add captions with a track element.',
      'Use iframes safely with titles, lazy loading and sandboxing.',
    ],
    tasks: [
      'Add a second source format to the video demo.',
      'Write a track element for English captions.',
      'Add a title and loading="lazy" to an iframe.',
    ],
    takeaways: [
      'controls make native media usable without custom JavaScript.',
      'Captions and transcripts make media accessible.',
      'Every iframe needs a title; untrusted embeds need sandboxing.',
    ],
    exercise: exerciseFor('html-13', 'media', [
      choice('Which attribute shows the browser’s play and pause controls?', ['autoplay', 'controls', 'loop', 'muted'], 1, 'controls displays the native media controls.'),
      fill('Complete the video element.', '<___ src="clip.mp4" controls></___>', [['video'], ['video']], 'Video uses the <video> element with a closing tag.'),
      choice('Which track kind provides subtitles including sound effects?', ['descriptions', 'captions', 'metadata', 'chapters'], 1, 'captions include dialogue and non-speech audio information.'),
      choice('What does the sandbox attribute on an iframe do?', ['Makes it load faster', 'Restricts what the embedded page may do', 'Adds a visible border', 'Plays video automatically'], 1, 'sandbox applies restrictions to the embedded document, reducing risk.'),
      htmlCode('Add an audio player with a source "podcast.mp3" and fallback text "Audio not supported".', '<!-- write your media below -->\n', [
        { pattern: '<audio[^>]*controls', flags: 'i', message: 'Add an audio element with controls' },
        { pattern: '<source[^>]*src=["\']podcast\\.mp3["\']', flags: 'i', message: 'Add a source pointing to podcast.mp3' },
        { pattern: 'Audio not supported', flags: 'i', message: 'Add fallback text' },
      ], `<audio controls>\n  <source src="podcast.mp3" type="audio/mpeg">\n  Audio not supported.\n</audio>`, 'Controls plus a source and fallback text make the player usable and resilient.'),
      choice('Why is autoplaying audio a poor default?', ['It uses too much HTML', 'It surprises users and can interfere with screen readers', 'Browsers always block it', 'It cannot be paused'], 1, 'Unexpected sound is disorienting and often blocked; let users choose to play.'),
    ]),
  },

  {
    id: 'html-14',
    title: 'Semantic HTML in Practice',
    summary: 'Pick meaningful elements for page regions, articles, figures and time.',
    minutes: 12,
    content: `
<h2 id="meaning">Semantics communicate meaning</h2>
<p>A <code>&lt;div&gt;</code> says nothing about its purpose. A <code>&lt;nav&gt;</code> says "this is navigation". Semantic elements give browsers, search engines and assistive technology useful structure before any CSS is applied.</p>

<h2 id="landmarks">Page landmarks</h2>
<ul>
  <li><code>&lt;header&gt;</code> — introductory content for the page or a section.</li>
  <li><code>&lt;nav&gt;</code> — major navigation links.</li>
  <li><code>&lt;main&gt;</code> — the unique main content; use it once per page.</li>
  <li><code>&lt;footer&gt;</code> — closing information, often site-wide.</li>
  <li><code>&lt;aside&gt;</code> — content related to but separate from the main flow.</li>
</ul>

<h2 id="article-section">article versus section</h2>
<p>An <code>&lt;article&gt;</code> should make sense on its own — a blog post, product card or forum comment. A <code>&lt;section&gt;</code> groups related content and normally has a heading. If a block has no heading and no standalone meaning, a <code>&lt;div&gt;</code> may be the honest choice.</p>
<pre><code class="language-html">&lt;main&gt;
  &lt;article&gt;
    &lt;header&gt;&lt;h2&gt;Why semantics matter&lt;/h2&gt;&lt;/header&gt;
    &lt;p&gt;…&lt;/p&gt;
  &lt;/article&gt;
  &lt;aside aria-label="Related links"&gt;…&lt;/aside&gt;
&lt;/main&gt;</code></pre>

<h2 id="inline-semantics">Inline semantics</h2>
<p>Use <code>&lt;strong&gt;</code> for importance, <code>&lt;em&gt;</code> for stress, <code>&lt;time datetime="2026-10-23"&gt;</code> for machine-readable dates, <code>&lt;address&gt;</code> for contact details and <code>&lt;mark&gt;</code> for highlighted relevance.</p>

<h2 id="div-span">When div and span are right</h2>
<p><code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> are generic containers for styling or scripting. They are fine when no semantic element describes the content. Do not replace a button with a clickable div — that loses keyboard support and semantics.</p>
<div class="note note-warn"><strong>Heading outline</strong>Give each section a heading. Avoid choosing heading levels just because of their default size; use CSS for appearance.</div>
`,
    demo: {
      type: 'html',
      title: 'A semantic page outline',
      html: `<header>
  <h1>CodeLearn magazine</h1>
  <nav aria-label="Main">
    <a href="#articles">Articles</a> |
    <a href="#about">About</a>
  </nav>
</header>
<main>
  <section id="articles">
    <h2>Latest articles</h2>
    <article>
      <h3>Semantic HTML</h3>
      <p>Structure communicates meaning.</p>
    </article>
  </section>
  <aside aria-label="Tip">
    <h2>Tip</h2>
    <p>Use landmarks to make pages easy to navigate.</p>
  </aside>
</main>
<footer id="about"><p>Contact: team@example.com</p></footer>`,
    },
    objectives: [
      'Choose semantic elements for page landmarks and content blocks.',
      'Distinguish article, section and div.',
      'Use time, address, strong and em correctly.',
    ],
    tasks: [
      'Rewrite a div-only layout using header, nav, main and footer.',
      'Decide whether a product card should be an article or a section.',
      'Mark up a date with a machine-readable datetime attribute.',
    ],
    takeaways: [
      'Semantic elements describe purpose, not appearance.',
      'main appears once; article stands alone; section groups related content.',
      'Use div/span only when no meaningful element fits.',
    ],
    exercise: exerciseFor('html-14', 'semantic HTML', [
      choice('Which element should wrap the unique content of a page?', ['<section>', '<main>', '<div>', '<article>'], 1, 'main identifies the primary content and should appear once per page.'),
      choice('When is <article> the best choice?', ['For any visual box', 'For content that makes sense on its own', 'Only for images', 'For the whole site header'], 1, 'An article is independently meaningful, such as a post or comment.'),
      fill('Wrap the contact details in the correct semantic element.', '<___>Email: hello@example.com</___>', [['address'], ['address']], '<address> is for contact information for the nearest article or page.'),
      choice('Which statement about <main> is true?', ['It may be used many times per page', 'It should contain the unique main content', 'It replaces <body>', 'It is only for navigation'], 1, 'There should be one visible main landmark per page.'),
      htmlCode('Build a semantic page with header, main and footer. Put a heading in the header and a paragraph in main.', '<!-- write the page regions below -->\n', [
        { pattern: '<header[^>]*>[\\s\\S]*?<h1[^>]*>', flags: 'i', message: 'Add a header containing an h1' },
        { pattern: '<main[^>]*>[\\s\\S]*?<p[^>]*>', flags: 'i', message: 'Add a main containing a paragraph' },
        { pattern: '<footer[^>]*>', flags: 'i', message: 'Add a footer' },
      ], `<header>\n  <h1>My site</h1>\n</header>\n<main>\n  <p>Welcome to my site.</p>\n</main>\n<footer>\n  <p>© 2026</p>\n</footer>`, 'The three landmarks give the page a clear, accessible structure.'),
      choice('Which element is best for a clickable action?', ['<div onclick="…">', '<span>', '<button>', '<p>'], 2, 'button provides keyboard support, focus and the correct role automatically.'),
    ]),
  },

  {
    id: 'html-15',
    title: 'Accessibility Testing and ARIA',
    summary: 'Test with a keyboard and screen reader, and use ARIA only when native HTML cannot help.',
    minutes: 15,
    content: `
<h2 id="pour">The four WCAG principles</h2>
<p>WCAG groups accessibility into four principles:</p>
<ul>
  <li><strong>Perceivable</strong> — information must be available to the senses (alt text, captions, contrast).</li>
  <li><strong>Operable</strong> — every control must work with a keyboard and other input methods.</li>
  <li><strong>Understandable</strong> — labels, errors and navigation should be predictable.</li>
  <li><strong>Robust</strong> — markup should work with current and future assistive technology.</li>
</ul>

<h2 id="keyboard">Test with the keyboard</h2>
<p>Put the mouse away. Press <kbd>Tab</kbd> through the page and check that:</p>
<ol>
  <li>Every interactive element is reachable.</li>
  <li>Focus is always visible.</li>
  <li><kbd>Enter</kbd> and <kbd>Space</kbd> activate controls.</li>
  <li>The focus order matches the visual order.</li>
</ol>
<p>Never remove focus outlines without replacing them with a stronger custom style.</p>

<h2 id="aria">ARIA: the rules</h2>
<p>ARIA adds roles, states and properties to markup. The first rule of ARIA is: <strong>use native HTML if it already does the job</strong>. A <code>&lt;button&gt;</code> is better than <code>&lt;div role="button"&gt;</code> because the native element gives keyboard behaviour for free.</p>
<pre><code class="language-html">&lt;button aria-pressed="true"&gt;Saved&lt;/button&gt;
&lt;div role="status" aria-live="polite"&gt;Changes saved&lt;/div&gt;</code></pre>
<p>Use <code>aria-label</code> only when there is no visible label, and <code>aria-describedby</code> to connect hints or errors. Live regions announce dynamic changes without moving focus.</p>

<h2 id="testing">A practical test routine</h2>
<ul>
  <li>Zoom to 200% and check that nothing is cut off.</li>
  <li>Run an automated checker such as axe, then verify its warnings manually.</li>
  <li>Navigate landmarks and headings with a screen reader.</li>
  <li>Check colour contrast with a contrast tool.</li>
  <li>Test forms with errors and keyboard-only submission.</li>
</ul>
<div class="note note-tip"><strong>Accessible names</strong>Every link, button and form control needs a name that makes sense out of context. "Read more" alone is rarely enough; "Read more about accessibility" is better.</div>
`,
    demo: {
      type: 'html',
      title: 'Focus styles and ARIA states',
      html: `<h1>Accessibility playground</h1>
<p><a href="#details">Skip to details</a></p>
<button type="button" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">Toggle saved</button>
<p id="details">Tab to the button, press Space, and inspect its aria-pressed state.</p>
<style>
  :focus-visible { outline: 3px solid #2563eb; outline-offset: 3px; }
  button { font: inherit; padding: 0.5rem 0.8rem; }
</style>`,
    },
    objectives: [
      'Explain the four WCAG principles in plain language.',
      'Test a page with keyboard navigation and a screen reader.',
      'Use ARIA attributes only when native HTML is insufficient.',
    ],
    tasks: [
      'Tab through the demo and note where focus goes.',
      'Add aria-pressed to a toggle button and test both states.',
      'Find one low-contrast colour on a page and improve it.',
    ],
    takeaways: [
      'Keyboard access and visible focus are non-negotiable.',
      'Native elements provide behaviour and semantics that ARIA alone cannot.',
      'Automated checks help, but human testing is still required.',
    ],
    exercise: exerciseFor('html-15', 'accessibility', [
      choice('Which WCAG principle covers keyboard access?', ['Perceivable', 'Operable', 'Understandable', 'Robust'], 1, 'Operable means users can operate the interface with keyboard, touch or assistive input.'),
      choice('What is the first rule of ARIA?', ['Add ARIA to every element', 'Use native HTML when it already works', 'Only use ARIA on divs', 'ARIA replaces alt text'], 1, 'Native elements already provide semantics and behaviour; prefer them.'),
      fill('Give the toggle its pressed state.', '<button aria-___="true">Saved</button>', [['pressed']], 'aria-pressed communicates the on/off state of a toggle button.'),
      choice('Why is removing focus outlines harmful?', ['It changes the font', 'Keyboard users lose track of where they are', 'It slows the page', 'It breaks mobile layouts'], 1, 'A visible focus indicator is essential for keyboard navigation.'),
      choice('Which element is the best accessible button?', ['<div role="button">', '<span tabindex="0">', '<button type="button">', '<a href="#">'], 2, 'button has native keyboard behaviour, focus and semantics.'),
      htmlCode('Create a button with the visible text "Save" and an aria-label "Save changes".', '<!-- write your button below -->\n', [
        { pattern: '<button[^>]*aria-label=["\']Save changes["\'][^>]*>\\s*Save\\s*</button>|<button[^>]*>\\s*Save\\s*</button>', flags: 'i', message: 'Add a Save button with aria-label Save changes' },
        { pattern: 'aria-label=["\']Save changes["\']', flags: 'i', message: 'Include the aria-label attribute' },
      ], `<button type="button" aria-label="Save changes">Save</button>`, 'The visible label stays short while aria-label gives the full action.'),
    ]),
  },

  {
    id: 'html-16',
    title: 'SEO Fundamentals',
    summary: 'Write metadata, structure and content that search engines can understand and share.',
    minutes: 14,
    content: `
<h2 id="crawling">How search engines see a page</h2>
<p>Search engines <strong>crawl</strong> links, <strong>index</strong> the pages they find and then <strong>rank</strong> results for queries. Your job is to make the page easy to crawl and unambiguous to understand.</p>

<h2 id="title-description">Title and meta description</h2>
<pre><code class="language-html">&lt;title&gt;Beginner HTML Course — CodeLearn&lt;/title&gt;
&lt;meta name="description" content="Learn HTML from scratch with short lessons, exercises and projects."&gt;</code></pre>
<p>The <code>&lt;title&gt;</code> is a strong ranking signal and appears in the browser tab and search results. The meta description does not directly rank the page, but a clear, specific description improves click-through rate. Keep titles unique and descriptions roughly 120–160 characters.</p>

<h2 id="headings">One clear topic per page</h2>
<p>Use a single <code>&lt;h1&gt;</code> that states the page topic, then a logical hierarchy of <code>h2</code> and <code>h3</code> sections. Headings should describe content, not be chosen for font size.</p>

<h2 id="links-images">Links and images</h2>
<ul>
  <li>Write descriptive link text: "HTML forms guide", not "click here".</li>
  <li>Use <code>alt</code> text that explains the image in context.</li>
  <li>Keep URLs short and readable when you control them.</li>
  <li>Link to related pages on your own site so crawlers can discover them.</li>
</ul>

<h2 id="technical">Technical essentials</h2>
<ul>
  <li><code>&lt;html lang="en"&gt;</code> declares the page language.</li>
  <li><code>&lt;link rel="canonical" href="…"&gt;</code> prevents duplicate-URL confusion.</li>
  <li><code>&lt;meta name="viewport"&gt;</code> makes the page mobile-friendly.</li>
  <li>Open Graph tags control how links look when shared.</li>
  <li>Fast pages and stable layouts rank better and convert better.</li>
</ul>
<pre><code class="language-html">&lt;meta property="og:title" content="Beginner HTML Course"&gt;
&lt;meta property="og:description" content="Short lessons and practical projects."&gt;
&lt;meta property="og:image" content="https://example.com/course-cover.jpg"&gt;</code></pre>
<div class="note note-warn"><strong>No tricks</strong>Do not stuff keywords, hide text or buy links. Helpful, well-structured content is the strategy that keeps working.</div>
`,
    demo: {
      type: 'html',
      title: 'A search-friendly document head',
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beginner CSS Layouts — CodeLearn</title>
    <meta name="description" content="Learn Flexbox, Grid and responsive design with short lessons and hands-on projects.">
    <meta property="og:title" content="Beginner CSS Layouts">
    <meta property="og:description" content="Flexbox, Grid and responsive design made practical.">
  </head>
  <body>
    <h1>Beginner CSS Layouts</h1>
    <p>This page has one clear topic and descriptive metadata.</p>
  </body>
</html>`,
    },
    objectives: [
      'Write a unique title and useful meta description.',
      'Structure headings and links for search engines and users.',
      'Explain canonical URLs, Open Graph and the limits of metadata.',
    ],
    tasks: [
      'Write a title and meta description for a recipe page.',
      'Replace three vague link labels with descriptive ones.',
      'Add canonical and Open Graph title tags to the demo head.',
    ],
    takeaways: [
      'Search engines crawl links and index clear, well-structured pages.',
      'Titles are important; descriptions influence clicks rather than ranking directly.',
      'Helpful content and semantic HTML beat keyword tricks.',
    ],
    exercise: exerciseFor('html-16', 'SEO', [
      choice('Which element is the strongest on-page title signal?', ['<h2>', '<title>', '<meta description>', '<footer>'], 1, 'The document title is a strong ranking signal and is shown in results.'),
      fill('Add a meta description.', '<meta name="___" content="Learn HTML with practical projects.">', [['description']], 'The name attribute is description.'),
      choice('How many <h1> elements should a typical page have?', ['Zero', 'One', 'At least five', 'As many as possible'], 1, 'One h1 states the page topic; other sections use h2 and h3.'),
      choice('Which link text is best for SEO and accessibility?', ['Click here', 'Read more', 'Learn HTML forms step by step', 'Link'], 2, 'Descriptive link text explains the destination out of context.'),
      choice('What does a canonical link do?', ['Styles the page', 'Tells search engines the preferred URL for duplicate content', 'Compresses images', 'Adds a caption'], 1, 'Canonical points crawlers at the preferred version of a page.'),
      htmlCode('Add a descriptive title and meta description to an HTML head.', '<head>\n  <!-- add metadata -->\n</head>', [
        { pattern: '<title>[^<]{10,}</title>', flags: 'i', message: 'Add a descriptive title of at least 10 characters' },
        { pattern: '<meta[^>]*name=["\']description["\'][^>]*content=["\'][^"\']{20,}["\']', flags: 'i', message: 'Add a meta description with meaningful content' },
      ], `<head>\n  <title>Learn HTML Forms — CodeLearn</title>\n  <meta name="description" content="Build accessible HTML forms with labels, validation and helpful errors.">\n</head>`, 'A specific title and a human-readable description tell both people and search engines what the page offers.'),
    ]),
  },

  {
    id: 'html-17',
    title: 'HTML Project: Build a Conference Page',
    summary: 'Plan and build a complete, accessible conference page from a content brief.',
    minutes: 25,
    content: `
<h2 id="brief">The brief</h2>
<p>Build a single-page site for <strong>Frontend Together</strong>, a one-day conference. The page must help visitors understand the event, browse the schedule, meet the speakers and register.</p>
<p><strong>Requirements</strong></p>
<ul>
  <li>A header with the event name and navigation.</li>
  <li>A hero section with date, venue and a primary call to action.</li>
  <li>An about section explaining who the event is for.</li>
  <li>A schedule table with times, talks and speakers.</li>
  <li>A speaker list using articles and images.</li>
  <li>A registration form with name, email and ticket type.</li>
  <li>A footer with contact details and social links.</li>
  <li>Semantic landmarks, one h1, logical heading levels and visible labels.</li>
</ul>

<h2 id="milestones">Milestones</h2>
<ol>
  <li><strong>Content first.</strong> Write all headings and text before styling anything.</li>
  <li><strong>Skeleton.</strong> Add header, nav, main, sections and footer.</li>
  <li><strong>Schedule.</strong> Build a table with caption, thead, tbody and scoped headers.</li>
  <li><strong>Speakers.</strong> Use article, figure, img with alt and figcaption.</li>
  <li><strong>Form.</strong> Add labels, input types, required fields and a submit button.</li>
  <li><strong>Accessibility review.</strong> Tab through the page, check headings and run an automated checker.</li>
</ol>

<h2 id="starter">Starter skeleton</h2>
<pre><code class="language-html">&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;Frontend Together&lt;/h1&gt;
    &lt;nav aria-label="Main"&gt;…&lt;/nav&gt;
  &lt;/header&gt;
  &lt;main&gt;
    &lt;section id="about"&gt;…&lt;/section&gt;
    &lt;section id="schedule"&gt;…&lt;/section&gt;
    &lt;section id="speakers"&gt;…&lt;/section&gt;
    &lt;section id="register"&gt;…&lt;/section&gt;
  &lt;/main&gt;
  &lt;footer&gt;…&lt;/footer&gt;
&lt;/body&gt;</code></pre>

<h2 id="checklist">Completion checklist</h2>
<ul>
  <li>Every section has a heading and meaningful content.</li>
  <li>The schedule uses a proper table, not divs.</li>
  <li>Every image has appropriate alt text.</li>
  <li>The form can be completed with a keyboard only.</li>
  <li>Links have descriptive text and work.</li>
  <li>The page remains readable at 320px width and at 200% zoom.</li>
</ul>

<h2 id="extend">Challenge yourself</h2>
<p>Add a FAQ with a description list, a "travel" section with an embedded map iframe, and Open Graph metadata. Then validate the HTML and run a screen-reader smoke test.</p>
`,
    demo: {
      type: 'html',
      title: 'Conference page starter',
      html: `<header>
  <h1>Frontend Together</h1>
  <nav aria-label="Main">
    <a href="#about">About</a> |
    <a href="#schedule">Schedule</a> |
    <a href="#register">Register</a>
  </nav>
</header>
<main>
  <section id="about">
    <h2>About</h2>
    <p>A one-day conference for people who build for the web.</p>
  </section>
  <section id="schedule">
    <h2>Schedule</h2>
    <table>
      <caption>Conference programme</caption>
      <thead><tr><th scope="col">Time</th><th scope="col">Talk</th></tr></thead>
      <tbody><tr><th scope="row">09:00</th><td>Opening keynote</td></tr></tbody>
    </table>
  </section>
  <section id="register">
    <h2>Register</h2>
    <form>
      <label for="attendee">Name</label>
      <input id="attendee" name="attendee" required>
      <button type="submit">Reserve a place</button>
    </form>
  </section>
</main>
<footer><p>Contact: hello@frontendtogether.example</p></footer>
<style>body{font-family:system-ui,sans-serif;margin:0;padding:16px;line-height:1.5}table{border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 10px;text-align:left}label{display:block;margin-top:8px}</style>`,
    },
    objectives: [
      'Turn a content brief into a semantic HTML document.',
      'Combine headings, navigation, tables, figures and forms in one page.',
      'Review the finished page against an accessibility checklist.',
    ],
    tasks: [
      'Complete all sections from the brief in the demo.',
      'Build the schedule as an accessible table with a caption.',
      'Test the registration form using only the keyboard.',
    ],
    takeaways: [
      'Start with content and structure before styling.',
      'Reusing the right semantic element is faster than fixing a div soup later.',
      'A project is finished only after an accessibility and responsive review.',
    ],
    exercise: exerciseFor('html-17', 'the conference project', [
      choice('What should be written before styling the project?', ['JavaScript', 'Content and structure', 'Animations', 'Deployment settings'], 1, 'Content-first makes the structure and headings meaningful.'),
      fill('Give the schedule section a stable id for the navigation link.', '<section ___="schedule">', [['id']], 'Links use the id: href="#schedule".'),
      choice('Which element is best for each speaker profile?', ['<div>', '<article>', '<span>', '<table>'], 1, 'A speaker profile is independently meaningful content, so article fits.'),
      htmlCode('Write the registration form: a form with a labelled required name field and a submit button.', '<!-- write the registration form below -->\n', [
        { pattern: '<form[^>]*>', flags: 'i', message: 'Add a form' },
        { pattern: '<label[^>]*for=["\']name["\'][^>]*>\\s*Name\\s*</label>', flags: 'i', message: 'Add a label for="name" containing Name' },
        { pattern: '<input[^>]*id=["\']name["\'][^>]*required|<input[^>]*required[^>]*id=["\']name["\']', flags: 'i', message: 'Add a required input with id="name"' },
        { pattern: '<button[^>]*type=["\']submit["\']', flags: 'i', message: 'Add a submit button' },
      ], `<form>\n  <label for="name">Name</label>\n  <input id="name" name="name" required>\n  <button type="submit">Reserve a place</button>\n</form>`, 'The form is keyboard-friendly and has a matching label and input.'),
      htmlCode('Build the schedule as a table with a caption, a header row and one data row.', '<!-- write the schedule table below -->\n', [
        { pattern: '<table[^>]*>', flags: 'i', message: 'Add a table' },
        { pattern: '<caption[^>]*>[^<]+</caption>', flags: 'i', message: 'Add a caption' },
        { pattern: '<th[^>]*>[^<]+</th>', flags: 'i', message: 'Add header cells' },
        { pattern: '<td[^>]*>[^<]+</td>', flags: 'i', message: 'Add at least one data cell' },
      ], `<table>\n  <caption>Conference programme</caption>\n  <thead><tr><th scope="col">Time</th><th scope="col">Talk</th></tr></thead>\n  <tbody><tr><td>09:00</td><td>Opening keynote</td></tr></tbody>\n</table>`, 'A caption and header cells make the schedule understandable to everyone.'),
      choice('Which item belongs on the final review checklist?', ['Adding more colours', 'Testing keyboard navigation and zoom', 'Removing all images', 'Using only divs'], 1, 'Keyboard and zoom checks catch the accessibility problems that are easiest to miss.'),
    ]),
  },
];
