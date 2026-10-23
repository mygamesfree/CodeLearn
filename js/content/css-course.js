/**
 * css-course.js — expanded CSS curriculum.
 *
 * Existing lessons keep their ids and content. These lessons add the
 * selectors, units, layout, animation and maintainability material needed
 * for a complete beginner-to-intermediate path.
 */

import { choice, fill, cssCode, exerciseFor } from './helpers.js';

export const CSS_MODULES = [
  {
    id: 'css-m1',
    title: 'CSS Syntax, Selectors and the Cascade',
    description: 'Write rules confidently and understand which declaration wins.',
    lessonIds: ['css-1', 'css-9', 'css-10'],
  },
  {
    id: 'css-m2',
    title: 'Colours, Units and Typography',
    description: 'Build readable text, consistent spacing and layered backgrounds.',
    lessonIds: ['css-2', 'css-11', 'css-12'],
  },
  {
    id: 'css-m3',
    title: 'The Box Model and Custom Properties',
    description: 'Control size, spacing and borders, then reuse values with custom properties.',
    lessonIds: ['css-3', 'css-13', 'css-8'],
  },
  {
    id: 'css-m4',
    title: 'Display, Positioning and Overflow',
    description: 'Choose how boxes participate in layout and what happens when content does not fit.',
    lessonIds: ['css-14', 'css-6'],
  },
  {
    id: 'css-m5',
    title: 'Flexbox and Grid',
    description: 'Build one-dimensional rows and two-dimensional page layouts.',
    lessonIds: ['css-4', 'css-7', 'css-15'],
  },
  {
    id: 'css-m6',
    title: 'Responsive Design',
    description: 'Adapt layouts to screens and make media load efficiently.',
    lessonIds: ['css-5', 'css-16'],
  },
  {
    id: 'css-m7',
    title: 'Transitions, Transforms and Animations',
    description: 'Add motion that feels fast, purposeful and accessible.',
    lessonIds: ['css-17', 'css-18'],
  },
  {
    id: 'css-m8',
    title: 'Pseudo-classes and Pseudo-elements',
    description: 'Style states and generated content without extra markup.',
    lessonIds: ['css-19'],
  },
  {
    id: 'css-m9',
    title: 'CSS Organisation and Maintainability',
    description: 'Use naming conventions, layers and a clear file structure to keep styles healthy.',
    lessonIds: ['css-20'],
  },
  {
    id: 'css-m10',
    title: 'Complete Responsive Website Project',
    description: 'Plan, build, test and polish a full responsive marketing site.',
    lessonIds: ['css-21', 'css-22'],
  },
];

export const CSS_LESSONS = [
  {
    id: 'css-9',
    title: 'Selectors and Specificity',
    summary: 'Target exactly the elements you want and predict which rule wins.',
    minutes: 14,
    content: `
<h2 id="selector-types">A selector toolbox</h2>
<p>Selectors decide which elements a rule affects. Start simple and combine only when necessary.</p>
<pre><code class="language-css">p { color: #334155; }                  /* element */
.card { padding: 1rem; }               /* class */
#site-title { font-size: 2rem; }       /* id */
a:hover { text-decoration: underline; } /* state */
input[type="email"] { border-color: #2563eb; } /* attribute */
.nav > li { margin-inline: 0.5rem; }    /* direct child */
h2 + p { margin-top: 0; }              /* adjacent sibling */
</code></pre>
<ul>
  <li><code>.a.b</code> means an element with both classes.</li>
  <li><code>.a .b</code> means a descendant with class b inside class a.</li>
  <li><code>.a, .b</code> applies the same rule to both selectors.</li>
  <li><code>:is()</code> and <code>:where()</code> group selectors without repeating declarations.</li>
</ul>

<h2 id="specificity">Specificity in one table</h2>
<p>When two rules target the same element, the browser compares specificity:</p>
<ol>
  <li>Inline style: <strong>1-0-0-0</strong> (avoid it).</li>
  <li>IDs: <strong>0-1-0-0</strong>.</li>
  <li>Classes, attributes and pseudo-classes: <strong>0-0-1-0</strong>.</li>
  <li>Elements and pseudo-elements: <strong>0-0-0-1</strong>.</li>
</ol>
<p><code>.card .title</code> (0-0-2-0) beats <code>.title</code> (0-0-1-0). If specificity is equal, the later rule wins.</p>

<h2 id="low-specificity">Keep specificity low</h2>
<p>Prefer single classes and shallow selectors. High-specificity chains become impossible to override and usually signal that the HTML needs a clearer class name. Reserve IDs for links and JavaScript hooks, not styling.</p>
<div class="note note-tip"><strong>Debug faster</strong>Use the browser's Elements panel to see which rule won, which declarations are crossed out, and where each rule comes from.</div>
`,
    demo: {
      type: 'css',
      title: 'Compare selectors and specificity',
      html: `<h1 id="title" class="headline">Selector demo</h1>
<p class="note">This paragraph has the class note.</p>
<p>This paragraph does not.</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>`,
      css: `body { font-family: system-ui, sans-serif; padding: 1rem; }
#title { color: #1d4ed8; }
.headline { color: #be123c; }
.note { background: #fef3c7; padding: 0.5rem; }
li:first-child { font-weight: 700; }`,
    },
    objectives: [
      'Combine element, class, attribute and combinator selectors.',
      'Calculate specificity well enough to predict the winning rule.',
      'Write low-specificity CSS that is easy to override.',
    ],
    tasks: [
      'Change the demo so the class rule wins over the ID rule without deleting either.',
      'Write a selector for an email input only.',
      'Style the second list item with :nth-child(2).',
    ],
    takeaways: [
      'Classes are reusable; IDs are unique and should not be used for styling.',
      'Specificity is compared before source order.',
      'Shallow class selectors are easier to maintain than long descendant chains.',
    ],
    exercise: exerciseFor('css-9', 'selectors and specificity', [
      choice('Which selector has the highest specificity?', ['.card', '#main', 'article p', 'p:hover'], 1, 'An ID selector outranks classes and elements.'),
      choice('What does .nav > a select?', ['Every link inside .nav at any depth', 'Only direct child links of .nav', 'The first link in .nav', 'Links next to .nav'], 1, 'The child combinator > selects only direct children.'),
      fill('Select every email input by attribute.', 'input[___="email"] { border-color: teal; }', [['type']], 'Attribute selectors use [attribute="value"].'),
      choice('Two equal-specificity rules set different colours. Which wins?', ['The first one', 'The last one in source order', 'The shorter selector', 'The one with !important always'], 1, 'With equal specificity, later declarations win.'),
      choice('Why should IDs generally not be used for styling?', ['IDs are deprecated', 'They have very high specificity and are hard to override', 'They cannot be selected in CSS', 'They only work in HTML5'], 1, 'ID rules are difficult to override without more IDs or !important.'),
      cssCode('Style only elements with class "alert" so their text is red.', '/* write your CSS below */\n', [
        { pattern: '\\.alert\\s*\\{[^}]*color\\s*:\\s*(red|#f00|#ff0000|rgb\\(255,\\s*0,\\s*0\\))', flags: 'is', message: 'Use .alert and set color to red' },
      ], `.alert {\n  color: red;\n}`, 'A class selector keeps the rule reusable and low-specificity.'),
    ]),
  },

  {
    id: 'css-10',
    title: 'The Cascade, Inheritance and Debugging',
    summary: 'Understand origin, importance, inheritance and the tools that reveal why styles apply.',
    minutes: 13,
    content: `
<h2 id="cascade">The cascade</h2>
<p>The "C" in CSS stands for cascade. When declarations conflict, the browser considers:</p>
<ol>
  <li><strong>Origin and importance</strong> — browser styles, author styles, then user styles, with <code>!important</code> changing the order.</li>
  <li><strong>Specificity</strong> — the more specific selector wins.</li>
  <li><strong>Source order</strong> — the later rule wins when everything else is equal.</li>
</ol>

<h2 id="inheritance">Inheritance</h2>
<p>Some properties inherit to child elements: <code>color</code>, <code>font-family</code>, <code>font-size</code>, <code>line-height</code> and <code>visibility</code>. Box properties such as margin, padding, border and background do not.</p>
<pre><code class="language-css">body {
  font-family: system-ui, sans-serif;
  color: #1f2937;
  line-height: 1.6;
}

button {
  font: inherit;
}</code></pre>
<p><code>font: inherit</code> is a useful reset because form controls often ignore the page font by default.</p>

<h2 id="initial">initial, inherit, unset and revert</h2>
<ul>
  <li><code>inherit</code> takes the parent's value.</li>
  <li><code>initial</code> restores the property's initial value.</li>
  <li><code>unset</code> inherits if the property naturally inherits, otherwise resets.</li>
  <li><code>revert</code> rolls back to the browser's default style.</li>
</ul>

<h2 id="debug">Debugging like a professional</h2>
<ol>
  <li>Inspect the element and read the Styles pane from top to bottom.</li>
  <li>Look for crossed-out declarations — something more specific is winning.</li>
  <li>Toggle declarations on and off instead of guessing.</li>
  <li>Use the Computed pane to see the final value and where it came from.</li>
  <li>Check the Box Model diagram for unexpected margin and padding.</li>
</ol>
<div class="note note-warn"><strong>!important is a smell</strong>Use it for rare overrides of third-party CSS, not as a routine fix. It makes future changes harder and can harm accessibility overrides.</div>
`,
    demo: {
      type: 'css',
      title: 'Inheritance and source order',
      html: `<div class="panel">
  <h1>Inherited colour</h1>
  <p>This text inherits font, colour and line height.</p>
  <button>Form controls need font: inherit</button>
</div>`,
      css: `body { font-family: Georgia, serif; color: #0f172a; line-height: 1.7; padding: 1rem; }
.panel { border: 1px solid #94a3b8; padding: 1rem; }
.panel p { color: #475569; }
button { font: inherit; padding: 0.4rem 0.8rem; }`,
    },
    objectives: [
      'Order cascade decisions by origin, specificity and source order.',
      'Identify which properties inherit and which do not.',
      'Debug conflicting declarations using browser DevTools.',
    ],
    tasks: [
      'Set the body font and inherit it inside a button.',
      'Use DevTools to find a crossed-out declaration in the demo.',
      'Replace an unnecessary !important with a better selector.',
    ],
    takeaways: [
      'The cascade resolves conflicts using origin, specificity and source order.',
      'Text properties inherit; box properties do not.',
      'DevTools shows the final value and the winning rule; use it before guessing.',
    ],
    exercise: exerciseFor('css-10', 'the cascade', [
      choice('Which property inherits by default?', ['margin', 'padding', 'color', 'border'], 2, 'Colour is inherited; box properties are not.'),
      choice('What does font: inherit do on a button?', ['Resets all button styles', 'Uses the parent font settings', 'Makes text bold', 'Prevents clicking'], 1, 'The button takes font family, size and related settings from its parent.'),
      fill('Make the box inherit its text colour.', '.card { color: ___; }', [['inherit']], 'inherit explicitly takes the parent value.'),
      choice('Which tool shows why a declaration is crossed out?', ['The Network panel', 'The Elements Styles pane', 'The Console only', 'A CSS linter only'], 1, 'The Styles pane lists competing rules and marks overridden declarations.'),
      choice('Why is !important a maintenance problem?', ['It only works in Chrome', 'It raises specificity and makes later overrides harder', 'It disables inheritance', 'It cannot be used with colors'], 1, 'Overusing !important creates an escalating specificity war.'),
    ]),
  },

  {
    id: 'css-11',
    title: 'Units, Typography and Web Fonts',
    summary: 'Build readable type scales with rem, em, line-height and sensible font loading.',
    minutes: 15,
    content: `
<h2 id="units">Units you will actually use</h2>
<ul>
  <li><code>px</code> — fixed pixels; useful for borders and fine details.</li>
  <li><code>rem</code> — relative to the root font size; ideal for spacing and font sizes.</li>
  <li><code>em</code> — relative to the element's own font size; useful for component-relative spacing.</li>
  <li><code>%</code> — relative to a parent dimension.</li>
  <li><code>vw</code>/<code>vh</code> — viewport width/height; use with care on mobile.</li>
  <li><code>ch</code> — width of the "0" character; excellent for readable line lengths.</li>
  <li><code>clamp(min, preferred, max)</code> — fluid sizing with guard rails.</li>
</ul>
<pre><code class="language-css">:root { font-size: 100%; }

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
p  { max-width: 65ch; line-height: 1.6; }</code></pre>

<h2 id="typography">A small type system</h2>
<p>Pick a limited scale, for example 0.875rem, 1rem, 1.25rem, 1.5rem, 2rem and 3rem. Use font weight and colour to create hierarchy instead of adding more sizes.</p>
<pre><code class="language-css">body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h2 {
  font-size: 1.75rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}</code></pre>

<h2 id="fonts">Web fonts without the pain</h2>
<p>System fonts are the fastest choice. If you need a custom font, self-host WOFF2 files and use <code>font-display: swap</code> so text remains visible while the font loads. Limit yourself to one or two families and avoid loading every weight.</p>
<pre><code class="language-css">@font-face {
  font-family: "Inter";
  src: url("inter.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
}</code></pre>
<div class="note note-tip"><strong>Readability first</strong>Keep body text around 16–20px, line height between 1.4 and 1.7, and line length near 45–75 characters.</div>
`,
    demo: {
      type: 'css',
      title: 'Fluid type and readable line length',
      html: `<article class="prose">
  <h1>A readable article</h1>
  <p class="lead">Good typography is mostly invisible. It lets readers focus on the words instead of the layout.</p>
  <h2>Line length</h2>
  <p>Long lines are tiring to read. Using the ch unit keeps a comfortable measure even when the viewport grows. Resize the preview to see the heading scale change.</p>
</article>`,
      css: `body { margin: 0; padding: 1.5rem; background: #f8fafc; color: #0f172a; }
.prose { font-family: Georgia, serif; font-size: 1.05rem; line-height: 1.65; }
.prose h1 { font-size: clamp(1.8rem, 5vw, 3rem); line-height: 1.1; margin: 0 0 1rem; }
.prose h2 { font-size: 1.4rem; margin-top: 2rem; }
.prose p { max-width: 62ch; }
.lead { font-size: 1.2rem; color: #334155; }`,
    },
    objectives: [
      'Choose rem, em, ch and clamp for the right jobs.',
      'Create a small, consistent typographic scale.',
      'Load web fonts without blocking text or wasting bandwidth.',
    ],
    tasks: [
      'Change the article heading to use clamp().',
      'Limit paragraph width to 60ch.',
      'Add a second heading level with a smaller size.',
    ],
    takeaways: [
      'rem is predictable for global sizing; em is useful inside components.',
      'A small type scale creates hierarchy without chaos.',
      'font-display: swap keeps text visible while custom fonts load.',
    ],
    exercise: exerciseFor('css-11', 'units and typography', [
      choice('Which unit is relative to the root element font size?', ['px', 'em', 'rem', 'vh'], 2, 'rem is relative to the root html font size.'),
      choice('Which property improves the readability of long paragraphs?', ['letter-spacing: 4px', 'max-width: 65ch', 'text-transform: uppercase', 'font-weight: 900'], 1, 'Limiting the measure to roughly 45–75 characters prevents overly long lines.'),
      fill('Set a fluid heading size between 2rem and 3.5rem.', 'h1 { font-size: clamp(2rem, 5vw, ___) }', [['3.5rem']], 'clamp(min, preferred, max) caps the size at 3.5rem.'),
      choice('What does font-display: swap do?', ['Hides text until the font loads', 'Shows fallback text immediately, then swaps', 'Downloads every font weight', 'Prevents font loading'], 1, 'swap avoids invisible text by using a fallback first.'),
      choice('Why prefer system fonts for body text?', ['They look identical everywhere', 'They load instantly and avoid network requests', 'They are the only accessible fonts', 'They support more weights'], 1, 'System fonts need no download, which improves speed and resilience.'),
      cssCode('Set the page base font size to 18px and paragraph line height to 1.6.', '/* write your CSS below */\n', [
        { pattern: '(html|body|:root)\\s*\\{[^}]*font-size\\s*:\\s*18px', flags: 'is', message: 'Set font-size: 18px on html, body or :root' },
        { pattern: 'p\\s*\\{[^}]*line-height\\s*:\\s*1\\.6', flags: 'is', message: 'Set line-height: 1.6 on paragraphs' },
      ], `html {\n  font-size: 18px;\n}\n\np {\n  line-height: 1.6;\n}`, 'A root font size and a readable line height are the foundation of a type system.'),
    ]),
  },

  {
    id: 'css-12',
    title: 'Backgrounds, Gradients and Images',
    summary: 'Layer colours, gradients and images, and control how they fill their boxes.',
    minutes: 13,
    content: `
<h2 id="background">The background shorthand</h2>
<p>Backgrounds can combine a colour, image, position, size and repeat behaviour:</p>
<pre><code class="language-css">.hero {
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 64, 175, 0.65)),
    url("hero.jpg") center / cover no-repeat;
  color: white;
}</code></pre>
<ul>
  <li><code>center / cover</code> positions the image in the centre and scales it to cover the box.</li>
  <li><code>contain</code> fits the whole image inside the box, possibly leaving gaps.</li>
  <li><code>no-repeat</code> prevents tiling.</li>
  <li>The gradient is listed first, so it paints above the photo.</li>
</ul>

<h2 id="gradients">Gradients</h2>
<p>Gradients are generated images, not colours. Use them to add depth without extra files.</p>
<pre><code class="language-css">background: radial-gradient(circle at 20% 20%, #38bdf8, transparent 60%);
background: repeating-linear-gradient(45deg, #111 0 10px, #222 10px 20px);</code></pre>
<p>Use <code>color-mix()</code> or semi-transparent colours to blend with the page palette instead of hard-coding unrelated shades.</p>

<h2 id="images">Images as CSS backgrounds</h2>
<p>Decorative images belong in CSS. Images that carry meaning should stay in HTML with <code>alt</code> text. For responsive backgrounds, provide a suitable compressed file and avoid hiding important content inside a background image.</p>

<h2 id="accessibility">Contrast and text over images</h2>
<p>Text over an image needs a contrast overlay. A dark gradient or a solid translucent layer is more reliable than hoping the photo is dark enough.</p>
<pre><code class="language-css">.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
}

.hero > * { position: relative; }</code></pre>
<div class="note note-warn"><strong>Performance</strong>A full-width background image can be the largest download on the page. Compress it, serve an appropriate size and consider a solid colour or gradient instead.</div>
`,
    demo: {
      type: 'css',
      title: 'Layered gradient hero',
      html: `<section class="hero">
  <h1>Build for the web</h1>
  <p>Layered backgrounds create depth without extra markup.</p>
</section>
<section class="cards">
  <div class="card">One</div>
  <div class="card">Two</div>
</section>`,
      css: `body { margin: 0; font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 1rem; }
.hero { padding: 3rem 1.5rem; border-radius: 14px; background: linear-gradient(135deg, rgba(56,189,248,0.35), rgba(168,85,247,0.3)), #111827; }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 6vw, 3rem); }
.cards { display: flex; gap: 1rem; margin-top: 1rem; }
.card { flex: 1; padding: 1rem; border-radius: 10px; background: radial-gradient(circle at top left, #1e293b, #0b1120); border: 1px solid #334155; }`,
    },
    objectives: [
      'Layer gradients and images with the background shorthand.',
      'Control background size, position and repetition.',
      'Keep text readable over decorative imagery.',
    ],
    tasks: [
      'Add a gradient overlay to a hero background.',
      'Change cover to contain and observe the difference.',
      'Add a repeating gradient stripe pattern to a card.',
    ],
    takeaways: [
      'Gradients are images and can be layered above background photos.',
      'Cover fills the box; contain fits the whole image.',
      'Meaningful images belong in HTML with alt text, not CSS backgrounds.',
    ],
    exercise: exerciseFor('css-12', 'backgrounds', [
      choice('What does background-size: cover do?', ['Shows the whole image with gaps', 'Scales the image to fill the box, cropping if needed', 'Tiles the image', 'Removes the image'], 1, 'cover fills the box while preserving aspect ratio, cropping overflow.'),
      fill('Make the background image cover the element.', 'background: url("hero.jpg") center / ___ no-repeat;', [['cover']], 'The size keyword is cover.'),
      choice('Why list a gradient before a background image?', ['It loads faster', 'It paints on top of the image', 'It disables the image', 'It fixes contrast automatically'], 1, 'Earlier background layers paint above later layers.'),
      choice('When should an image be added in HTML instead of CSS?', ['When it is purely decorative', 'When it conveys meaning and needs alt text', 'When it is large', 'When it is a gradient'], 1, 'Content images need alt text and belong in the document.'),
      choice('What is a reliable way to keep text readable over a photo?', ['Use a bright font', 'Add a contrast overlay or gradient', 'Make the text larger only', 'Remove the photo alt text'], 1, 'An overlay controls contrast regardless of the underlying image.'),
      cssCode('Give .hero a linear-gradient background.', '/* write your CSS below */\n', [
        { pattern: '\\.hero\\s*\\{[^}]*background\\s*:\\s*linear-gradient\\(', flags: 'is', message: 'Use a linear-gradient in .hero' },
      ], `.hero {\n  background: linear-gradient(135deg, #0ea5e9, #1e293b);\n}`, 'linear-gradient() generates a smooth colour transition without an image file.'),
    ]),
  },

  {
    id: 'css-13',
    title: 'Borders, Shadows and the Box Model in Practice',
    summary: 'Use border, radius and shadow without breaking layout or accessibility.',
    minutes: 12,
    content: `
<h2 id="box">The four layers of a box</h2>
<p>Every element has a content box, padding, border and margin. With <code>box-sizing: border-box</code>, width includes padding and border, which makes layouts far easier to predict.</p>
<pre><code class="language-css">*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 1rem;
  border: 1px solid #334155;
  border-radius: 12px;
}</code></pre>

<h2 id="borders">Borders and radii</h2>
<pre><code class="language-css">.pill {
  border: 2px solid #22c55e;
  border-radius: 999px;
}

.avatar {
  border-radius: 50%;
  overflow: hidden;
}</code></pre>
<p>Use <code>border-radius: 50%</code> for circles and a large radius for pills. Remember that <code>overflow: hidden</code> clips child content to the rounded shape.</p>

<h2 id="shadows">Shadows with restraint</h2>
<pre><code class="language-css">.card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08),
              0 12px 30px -12px rgba(0, 0, 0, 0.35);
}</code></pre>
<p>A shadow is made of horizontal offset, vertical offset, blur, spread and colour. Layering two subtle shadows usually looks more natural than one heavy shadow. <code>inset</code> moves the shadow inside the box.</p>

<h2 id="outline">Focus outlines are different</h2>
<p>Outlines do not take up space and can follow a border radius. Use <code>:focus-visible</code> with an outline to give keyboard users a clear, non-layout-shifting indicator.</p>
<div class="note note-tip"><strong>Spacing scale</strong>Use a small set of spacing values (4, 8, 12, 16, 24, 32, 48px) instead of inventing a new margin for every component.</div>
`,
    demo: {
      type: 'css',
      title: 'Borders, radii and layered shadows',
      html: `<div class="card">
  <img class="avatar" src="https://picsum.photos/seed/avatar/96/96" alt="Placeholder portrait" width="96" height="96">
  <h2>Layered card</h2>
  <p>Padding, border, radius and shadow working together.</p>
  <span class="pill">New</span>
</div>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #e2e8f0; padding: 2rem; }
.card { max-width: 320px; padding: 1.25rem; background: white; border: 1px solid #cbd5e1; border-radius: 14px; box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 14px 32px -16px rgba(0,0,0,.35); }
.avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; }
.pill { display: inline-block; padding: .15rem .7rem; border: 2px solid #16a34a; border-radius: 999px; color: #166534; font-weight: 700; font-size: .8rem; }`,
    },
    objectives: [
      'Apply border-box sizing and a consistent spacing scale.',
      'Use borders, radii and layered shadows intentionally.',
      'Keep focus indicators visible without shifting layout.',
    ],
    tasks: [
      'Add a two-layer box shadow to the demo card.',
      'Turn an avatar into a circle with border-radius and object-fit.',
      'Add a :focus-visible outline to the pill when it becomes a link.',
    ],
    takeaways: [
      'border-box makes width include padding and border.',
      'Two subtle shadows often look better than one heavy shadow.',
      'Outlines signal focus without changing layout; never remove them without a replacement.',
    ],
    exercise: exerciseFor('css-13', 'borders and shadows', [
      choice('With box-sizing: border-box, what does width include?', ['Content only', 'Content plus padding and border', 'Margin only', 'The whole viewport'], 1, 'border-box includes padding and border in the specified width.'),
      fill('Make a perfectly round avatar.', '.avatar { border-radius: ___; }', [['50%']], 'A 50% radius on a square element creates a circle.'),
      choice('Which shadow is inset?', ['box-shadow: 0 4px 10px black', 'box-shadow: inset 0 2px 6px black', 'text-shadow: 0 2px 4px black', 'filter: drop-shadow(0 2px 4px black)'], 1, 'The inset keyword draws the shadow inside the box.'),
      choice('Why use :focus-visible instead of removing outlines?', ['It hides focus from keyboard users', 'It keeps a clear focus indicator for keyboard users', 'It changes the border colour', 'It makes elements clickable'], 1, ':focus-visible preserves accessibility while avoiding outlines on mouse clicks.'),
      choice('Which is a good spacing scale?', ['3px, 7px, 13px, 27px', '4, 8, 12, 16, 24, 32px', 'Random values per component', 'Only 100px margins'], 1, 'A limited scale creates rhythm and speeds up decisions.'),
    ]),
  },

  {
    id: 'css-14',
    title: 'Display, Visibility and Overflow',
    summary: 'Understand block, inline, flex, grid, none and how overflow behaves.',
    minutes: 14,
    content: `
<h2 id="display">The display property</h2>
<ul>
  <li><code>block</code> — starts on a new line and fills the available width (div, p, h1).</li>
  <li><code>inline</code> — flows with text and ignores width/height (span, a).</li>
  <li><code>inline-block</code> — flows inline but accepts width, height and vertical margins.</li>
  <li><code>flex</code> and <code>grid</code> — turn the element into a layout container.</li>
  <li><code>none</code> — removes the element and its children from layout and the accessibility tree.</li>
</ul>
<pre><code class="language-css">.badge { display: inline-block; padding: 0.1rem 0.5rem; }
.layout { display: grid; grid-template-columns: 240px 1fr; }</code></pre>

<h2 id="visibility">visibility and opacity</h2>
<p><code>visibility: hidden</code> hides an element but keeps its space; it is not announced to screen readers. <code>opacity: 0</code> keeps the element in layout and can still receive focus. Do not use either as a substitute for <code>display: none</code> when content should truly disappear.</p>

<h2 id="overflow">Overflow</h2>
<pre><code class="language-css">.card { overflow: hidden; }       /* clip content to the rounded box */
.table-wrap { overflow-x: auto; } /* scroll a wide table */
.text { overflow-wrap: anywhere; }/* break very long words */
</code></pre>
<ul>
  <li><code>visible</code> — content spills out (default).</li>
  <li><code>hidden</code> — content is clipped with no scrollbar.</li>
  <li><code>auto</code> — scrollbars appear only when needed.</li>
  <li><code>scroll</code> — scrollbars are always reserved.</li>
</ul>

<h2 id="debug-overflow">Finding accidental horizontal scroll</h2>
<p>A common mobile bug is content wider than the viewport. Check fixed widths, large images, long unbroken strings, negative margins and absolutely positioned decorations. Use <code>max-width: 100%</code> on media and <code>min-width: 0</code> on flex children that should be allowed to shrink.</p>
<div class="note note-warn"><strong>Do not hide the problem</strong>Setting <code>overflow-x: hidden</code> on the body often hides a layout bug instead of fixing it. Find the element that is too wide.</div>
`,
    demo: {
      type: 'css',
      title: 'Display and overflow playground',
      html: `<div class="row">
  <div class="box">Block</div>
  <span class="badge">Inline badge</span>
  <span class="badge">Second badge</span>
</div>
<div class="clip">
  <p>This long unbreakable word can overflow: Pneumonoultramicroscopicsilicovolcanoconiosis</p>
</div>
<div class="scroll">
  <div class="wide">Wide content that scrolls horizontally</div>
</div>`,
      css: `body { font-family: system-ui, sans-serif; padding: 1rem; }
.box { display: block; background: #dbeafe; padding: .5rem; }
.badge { display: inline-block; background: #dcfce7; padding: .2rem .6rem; margin-right: .25rem; }
.clip { overflow: hidden; border: 1px solid #f59e0b; margin-top: 1rem; }
.clip p { overflow-wrap: anywhere; }
.scroll { overflow-x: auto; border: 1px solid #94a3b8; margin-top: 1rem; }
.wide { width: 700px; background: #e2e8f0; padding: .5rem; }`,
    },
    objectives: [
      'Choose display values based on how an element should participate in layout.',
      'Distinguish display: none, visibility: hidden and opacity: 0.',
      'Use overflow to clip, scroll or wrap content deliberately.',
    ],
    tasks: [
      'Make a span accept width and height using inline-block.',
      'Add a scrollable wrapper around a wide table.',
      'Find the element causing horizontal scroll in the demo.',
    ],
    takeaways: [
      'display controls layout participation; visibility and opacity do not remove space.',
      'overflow: auto is the usual choice for scrollable content.',
      'Fix the cause of overflow instead of hiding it on the body.',
    ],
    exercise: exerciseFor('css-14', 'display and overflow', [
      choice('Which display value removes an element from layout?', ['inline', 'block', 'none', 'inline-block'], 2, 'display: none removes the element and its box from layout.'),
      choice('What is the difference between visibility: hidden and display: none?', ['Nothing', 'visibility keeps the element space; display none removes it', 'display none keeps the space', 'visibility removes the element from the DOM'], 1, 'visibility: hidden leaves an empty space; display: none collapses it.'),
      fill('Make the wide table wrapper scroll horizontally only when needed.', '.table-wrap { overflow-x: ___; }', [['auto']], 'auto shows a scrollbar only when content overflows.'),
      choice('Why is overflow-x: hidden on body a poor default fix?', ['It is invalid CSS', 'It hides layout bugs instead of fixing them', 'It breaks all media queries', 'It disables scrolling entirely'], 1, 'The real cause is usually a too-wide child; hiding it masks the bug.'),
      choice('Which property lets a flex item shrink below its content width?', ['flex: none', 'min-width: 0', 'display: block', 'white-space: nowrap'], 1, 'min-width: 0 lets a flex child shrink and allows text to wrap or truncate.'),
      cssCode('Make .badge display inline-block and give it padding of 4px 8px.', '/* write your CSS below */\n', [
        { pattern: '\\.badge\\s*\\{[^}]*display\\s*:\\s*inline-block', flags: 'is', message: 'Set display: inline-block' },
        { pattern: '\\.badge\\s*\\{[^}]*padding\\s*:\\s*4px\\s+8px', flags: 'is', message: 'Set padding: 4px 8px' },
      ], `.badge {\n  display: inline-block;\n  padding: 4px 8px;\n}`, 'inline-block keeps the badge in the text flow while allowing padding and size.'),
    ]),
  },

  {
    id: 'css-15',
    title: 'Advanced Flexbox and Grid Patterns',
    summary: 'Build card rows, sticky sidebars, holy-grail layouts and responsive grids.',
    minutes: 16,
    content: `
<h2 id="flex-patterns">Useful Flexbox patterns</h2>
<p>Flexbox is ideal for one-dimensional layout. These three patterns cover many interfaces:</p>
<pre><code class="language-css">/* Centring */
.center { display: flex; align-items: center; justify-content: center; }

/* Push the last item to the right */
.toolbar { display: flex; align-items: center; gap: 0.75rem; }
.toolbar .spacer { margin-left: auto; }

/* Cards that share space and wrap */
.cards { display: flex; flex-wrap: wrap; gap: 1rem; }
.cards > * { flex: 1 1 16rem; }</code></pre>
<p><code>flex: 1 1 16rem</code> means grow, shrink, and start from a 16rem basis. Combined with wrapping it creates a responsive card row without media queries.</p>

<h2 id="grid-patterns">Useful Grid patterns</h2>
<pre><code class="language-css">/* Auto-fit responsive cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}

/* Page shell with named areas */
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.page > header { grid-area: header; }
.page > aside  { grid-area: sidebar; }
.page > main   { grid-area: main; }
.page > footer { grid-area: footer; }</code></pre>

<h2 id="choosing">Flex or Grid?</h2>
<ul>
  <li>Use <strong>Flexbox</strong> for a row of buttons, a navbar or distributing space along one axis.</li>
  <li>Use <strong>Grid</strong> for page structure, card galleries and anything with rows and columns.</li>
  <li>They compose: a Grid layout can contain Flexbox components.</li>
</ul>

<h2 id="alignment">Alignment quick reference</h2>
<p>In Flexbox, <code>justify-content</code> works on the main axis and <code>align-items</code> on the cross axis. In Grid, <code>justify-items</code> and <code>align-items</code> work on the inline and block axes. <code>place-items: center</code> is shorthand for both.</p>
<div class="note note-tip"><strong>Prefer gap</strong>Use <code>gap</code> instead of margins between flex/grid children. It avoids edge margins and keeps spacing consistent.</div>
`,
    demo: {
      type: 'css',
      title: 'Responsive grid and flex toolbar',
      html: `<div class="toolbar">
  <strong>Dashboard</strong>
  <button>New</button>
  <button>Filter</button>
  <span class="spacer"></span>
  <button>Profile</button>
</div>
<div class="cards">
  <article>Card one</article>
  <article>Card two</article>
  <article>Card three</article>
</div>`,
      css: `body { font-family: system-ui, sans-serif; padding: 1rem; background: #f1f5f9; }
.toolbar { display: flex; align-items: center; gap: .5rem; background: white; padding: .75rem; border-radius: 10px; }
.spacer { margin-left: auto; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: .75rem; margin-top: 1rem; }
.cards article { background: #0f172a; color: white; padding: 1rem; border-radius: 10px; }`,
    },
    objectives: [
      'Apply common Flexbox alignment and wrapping patterns.',
      'Build responsive card grids with auto-fit and minmax.',
      'Choose between Flexbox and Grid for a layout problem.',
    ],
    tasks: [
      'Add a spacer to push a toolbar item to the right.',
      'Change the card grid minimum width and observe wrapping.',
      'Sketch a page shell with grid-template-areas.',
    ],
    takeaways: [
      'Flexbox is for one axis; Grid is for rows and columns.',
      'auto-fit + minmax creates responsive grids without media queries.',
      'gap replaces margin hacks between layout children.',
    ],
    exercise: exerciseFor('css-15', 'advanced layouts', [
      choice('Which declaration creates responsive cards without media queries?', ['grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))', 'display: block', 'position: absolute', 'float: left'], 0, 'auto-fit and minmax let the grid create as many columns as fit.'),
      choice('In Flexbox, which property aligns items along the main axis?', ['align-items', 'justify-content', 'place-items', 'gap'], 1, 'justify-content distributes items along the main axis.'),
      fill('Push the last flex item to the right.', '.toolbar .spacer { margin-left: ___; }', [['auto']], 'An auto left margin absorbs the remaining space.'),
      choice('When is Grid a better fit than Flexbox?', ['A single row of buttons', 'A two-dimensional page layout', 'Centring one icon', 'A sentence of text'], 1, 'Grid is designed for rows and columns simultaneously.'),
      choice('What does grid-area: header do?', ['Adds a header element', 'Places the item in the named header area', 'Creates a new row', 'Removes the item from the grid'], 1, 'The item is assigned to the grid area named header.'),
      cssCode('Create a three-column grid with a 1rem gap inside .gallery.', '/* write your CSS below */\n', [
        { pattern: '\\.gallery\\s*\\{[^}]*display\\s*:\\s*grid', flags: 'is', message: 'Set display: grid on .gallery' },
        { pattern: 'grid-template-columns\\s*:\\s*repeat\\(3,\\s*1fr\\)|grid-template-columns\\s*:\\s*1fr\\s+1fr\\s+1fr', flags: 'is', message: 'Use three equal columns' },
        { pattern: 'gap\\s*:\\s*1rem', flags: 'i', message: 'Set gap: 1rem' },
      ], `.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}`, 'display: grid plus three equal columns and gap creates the gallery.'),
    ]),
  },

  {
    id: 'css-16',
    title: 'Responsive Images and Modern Units',
    summary: 'Serve the right image size and size components with modern CSS units.',
    minutes: 13,
    content: `
<h2 id="fluid">Fluid media</h2>
<p>The classic responsive rule still matters:</p>
<pre><code class="language-css">img, video {
  max-width: 100%;
  height: auto;
}</code></pre>
<p>Pair it with width/height attributes in HTML so the browser can reserve space and avoid layout shift.</p>

<h2 id="art-direction">Art direction with picture</h2>
<p>Use <code>&lt;picture&gt;</code> when the crop should change, not just the resolution:</p>
<pre><code class="language-html">&lt;picture&gt;
  &lt;source media="(min-width: 800px)" srcset="wide.avif" type="image/avif"&gt;
  &lt;source media="(min-width: 800px)" srcset="wide.webp" type="image/webp"&gt;
  &lt;img src="narrow.jpg" alt="Workshop attendees building a project"&gt;
&lt;/picture&gt;</code></pre>

<h2 id="units">Modern sizing units</h2>
<ul>
  <li><code>min()</code>, <code>max()</code>, <code>clamp()</code> create fluid but bounded sizes.</li>
  <li><code>dvh</code> accounts for mobile browser chrome better than <code>vh</code>.</li>
  <li><code>cqi</code> reacts to a container's width when container queries are used.</li>
  <li><code>aspect-ratio</code> reserves the right shape before media loads.</li>
</ul>
<pre><code class="language-css">.card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}</code></pre>

<h2 id="container">Container queries</h2>
<p>Media queries respond to the viewport; container queries respond to a component's container. This lets one card adapt in a narrow sidebar and a wide main column without knowing the page layout.</p>
<pre><code class="language-css">.card-wrap { container-type: inline-size; }

@container (min-width: 30rem) {
  .card { display: grid; grid-template-columns: 12rem 1fr; }
}</code></pre>
<div class="note note-tip"><strong>Serve less data</strong>Responsive layout is only half the job. Compress images, use modern formats and let srcset deliver smaller files to small screens.</div>
`,
    demo: {
      type: 'css',
      title: 'Fluid image cards',
      html: `<div class="gallery">
  <article class="card">
    <img src="https://picsum.photos/seed/one/640/360" alt="Abstract placeholder one" width="640" height="360" loading="lazy">
    <div class="body"><h2>Fluid card</h2><p>The image keeps its aspect ratio while the card resizes.</p></div>
  </article>
  <article class="card">
    <img src="https://picsum.photos/seed/two/640/360" alt="Abstract placeholder two" width="640" height="360" loading="lazy">
    <div class="body"><h2>Same rules</h2><p>No fixed pixel width is required.</p></div>
  </article>
</div>`,
      css: `body { font-family: system-ui, sans-serif; padding: 1rem; background: #0f172a; color: #e2e8f0; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.card { overflow: hidden; border: 1px solid #334155; border-radius: 12px; background: #111827; }
.card img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
.body { padding: .75rem 1rem 1rem; }
h2 { margin: 0 0 .35rem; font-size: 1.1rem; }
p { margin: 0; color: #94a3b8; }`,
    },
    objectives: [
      'Make images and videos fluid without distortion.',
      'Use aspect-ratio and object-fit for stable media boxes.',
      'Write a container query for a reusable component.',
    ],
    tasks: [
      'Change the card image aspect ratio to 4 / 3.',
      'Add a picture element with two source formats.',
      'Write a container query that switches a card to two columns.',
    ],
    takeaways: [
      'max-width: 100% prevents images from breaking their container.',
      'aspect-ratio and object-fit keep media boxes stable and attractive.',
      'Container queries make components respond to their own space.',
    ],
    exercise: exerciseFor('css-16', 'responsive media', [
      choice('Which rule prevents an image from overflowing its container?', ['width: 1000px', 'max-width: 100%', 'position: fixed', 'overflow: hidden on img'], 1, 'max-width: 100% caps the rendered width to the container.'),
      fill('Keep the card image’s shape stable before it loads.', '.card img { aspect-___: 16 / 9; }', [['ratio']], 'aspect-ratio defines the preferred width-to-height ratio.'),
      choice('What does object-fit: cover do?', ['Stretches the image', 'Fills the box while cropping overflow', 'Shows the whole image with gaps', 'Removes the image'], 1, 'cover fills the box and crops the parts that do not fit.'),
      choice('What do container queries respond to?', ['The viewport only', 'The size of a designated container', 'The user’s keyboard', 'The colour scheme'], 1, 'Container queries let a component respond to its parent container size.'),
      choice('Which unit is often safer than vh in mobile browsers?', ['px', 'svh or dvh', 'cm', 'pt'], 1, 'Small/dynamic viewport units account for mobile browser chrome.'),
    ]),
  },

  {
    id: 'css-17',
    title: 'Transitions, Transforms and Animations',
    summary: 'Animate properties smoothly and build motion with keyframes.',
    minutes: 15,
    content: `
<h2 id="transitions">Transitions</h2>
<p>A transition animates a property between two states. It needs a start state, an end state and a trigger such as hover, focus or a class change.</p>
<pre><code class="language-css">.button {
  background: #1d4ed8;
  transition: background-color 180ms ease, transform 180ms ease;
}

.button:hover {
  background: #2563eb;
  transform: translateY(-2px);
}</code></pre>
<p>Use <code>transition-property</code>, <code>duration</code>, <code>timing-function</code> and <code>delay</code>. Prefer specific properties over <code>all</code>, which can animate expensive or unintended changes.</p>

<h2 id="transforms">Transforms</h2>
<p>Transforms move, scale, rotate and skew elements without affecting the layout of siblings.</p>
<pre><code class="language-css">.card:hover { transform: translateY(-4px) scale(1.01); }
.rotate { transform: rotate(3deg); }
.flip { transform: scaleX(-1); }
.origin { transform-origin: top left; }</code></pre>

<h2 id="keyframes">Keyframe animations</h2>
<pre><code class="language-css">@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero {
  animation: fade-up 500ms ease-out both;
}</code></pre>
<p><code>both</code> applies the first keyframe before the animation starts and keeps the final state afterwards. Animation properties include duration, delay, iteration count, direction and fill mode.</p>

<h2 id="performance">Performance</h2>
<p>Animating <code>transform</code> and <code>opacity</code> is usually smooth because the browser can composite layers without recalculating layout. Animating width, height, top or left can trigger expensive layout work on every frame.</p>
<div class="note note-tip"><strong>Motion accessibility</strong>Respect <code>prefers-reduced-motion</code> and avoid flashing content. Motion should clarify an interaction, not delay it.</div>
`,
    demo: {
      type: 'css',
      title: 'Hover motion and a keyframe entrance',
      html: `<section class="hero">
  <h1>Motion demo</h1>
  <p>Hover over the button and the card.</p>
  <button class="button">Hover me</button>
</section>
<div class="card">I lift on hover.</div>`,
      css: `@keyframes fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
body { font-family: system-ui, sans-serif; padding: 1rem; background: #0b1120; color: #e2e8f0; }
.hero { animation: fade-up 500ms ease-out both; }
.button { background: #1d4ed8; color: white; border: 0; padding: .6rem 1rem; border-radius: 8px; transition: background-color 180ms ease, transform 180ms ease; }
.button:hover { background: #2563eb; transform: translateY(-2px); }
.card { margin-top: 1rem; padding: 1rem; border: 1px solid #334155; border-radius: 10px; transition: transform 180ms ease, border-color 180ms ease; }
.card:hover { transform: translateY(-4px) scale(1.01); border-color: #38bdf8; }`,
    },
    objectives: [
      'Write transitions with sensible properties and durations.',
      'Use translate, scale and rotate for motion that does not break layout.',
      'Create a keyframe animation with fill mode.',
    ],
    tasks: [
      'Add a colour transition to a link.',
      'Lift a card with translateY on hover.',
      'Create a fade-in animation for a heading.',
    ],
    takeaways: [
      'Transitions need a trigger and two states.',
      'Transform and opacity are the cheapest properties to animate.',
      'Motion should be short, purposeful and respectful of user preferences.',
    ],
    exercise: exerciseFor('css-17', 'transitions and animations', [
      choice('Which CSS property defines the intermediate states of an animation?', ['transition', 'transform', '@keyframes', 'animation-delay'], 2, '@keyframes defines the frames an animation moves through.'),
      fill('Animate a button’s background over 180ms.', '.button { transition: background-color ___ ease; }', [['180ms', '0.18s']], 'The duration can be written as 180ms or 0.18s.'),
      choice('Which transform moves an element upward by 4px?', ['translateX(4px)', 'translateY(-4px)', 'scaleY(4)', 'rotate(4deg)'], 1, 'Negative Y moves upward in CSS coordinates.'),
      choice('Which pair is usually cheapest to animate?', ['width and height', 'top and left', 'transform and opacity', 'margin and padding'], 2, 'transform and opacity can be composited without layout recalculation.'),
      choice('What does animation-fill-mode: both do?', ['Repeats forever', 'Applies start and end frame styles outside the animation', 'Reverses direction', 'Removes the animation'], 1, 'both fills backwards before the start and forwards after the end.'),
    ]),
  },

  {
    id: 'css-18',
    title: 'Motion, Accessibility and Performance',
    summary: 'Respect reduced-motion preferences and keep animation smooth on real devices.',
    minutes: 11,
    content: `
<h2 id="reduced-motion">Respect prefers-reduced-motion</h2>
<p>Some users experience dizziness, nausea or vestibular symptoms from motion. Others simply prefer less distraction. Use the media query to reduce or remove non-essential motion.</p>
<pre><code class="language-css">@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}</code></pre>
<p>The goal is not to ban all motion. A short fade may be fine; large parallax, spinning and bouncing effects usually are not.</p>

<h2 id="performance">Performance checklist</h2>
<ul>
  <li>Animate <code>transform</code> and <code>opacity</code> where possible.</li>
  <li>Use <code>will-change</code> sparingly and remove it when the animation ends.</li>
  <li>Avoid animating filters, box shadows and large blurred layers continuously.</li>
  <li>Test on a mid-range phone, not only a fast desktop.</li>
  <li>Use the browser Performance panel to find long frames.</li>
</ul>

<h2 id="purpose">Motion with purpose</h2>
<ul>
  <li>Show cause and effect: a menu slides from the button that opened it.</li>
  <li>Guide attention to a change without hijacking it.</li>
  <li>Keep durations short: 150–250ms for UI feedback, 300–500ms for larger transitions.</li>
  <li>Make sure content is usable when animation is disabled.</li>
</ul>
<div class="note note-warn"><strong>No flashing</strong>Avoid rapid flashing, especially more than three flashes per second. It can trigger seizures and is a serious accessibility failure.</div>
`,
    demo: {
      type: 'css',
      title: 'Reduced motion friendly animation',
      html: `<div class="box">Animated safely</div>
<p>This demo disables the movement when your system requests reduced motion.</p>`,
      css: `@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
body { font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: #e2e8f0; }
.box { width: 220px; padding: 2rem 1rem; text-align: center; background: #1d4ed8; border-radius: 14px; animation: float 2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .box { animation: none; }
}
p { color: #94a3b8; }`,
    },
    objectives: [
      'Apply prefers-reduced-motion to non-essential animation.',
      'Identify animation properties that cause expensive repaints.',
      'Use motion to communicate rather than decorate.',
    ],
    tasks: [
      'Add a reduced-motion block to the demo.',
      'Replace an animated width with a transform-based effect.',
      'Explain why autoplaying looping motion can be distracting.',
    ],
    takeaways: [
      'Respect reduced-motion preferences in every animated interface.',
      'Transform and opacity are the best default animation properties.',
      'Short, purposeful motion improves usability; excessive motion harms it.',
    ],
    exercise: exerciseFor('css-18', 'motion accessibility', [
      choice('Which media query detects a reduced-motion preference?', ['(prefers-color-scheme: dark)', '(prefers-reduced-motion: reduce)', '(hover: none)', '(min-width: 600px)'], 1, 'prefers-reduced-motion exposes the user’s motion preference.'),
      choice('Which property is generally cheapest to animate?', ['width', 'height', 'transform', 'box-shadow'], 2, 'transform can be handled by the compositor without layout.'),
      fill('Disable the animation when reduced motion is requested.', '@media (prefers-reduced-motion: reduce) { .box { animation: ___; } }', [['none']], 'animation: none removes the animation entirely.'),
      choice('What is a safe UI feedback duration?', ['2 seconds', '150–250ms', '5 seconds', '10 seconds'], 1, 'Short feedback feels responsive without delaying the user.'),
      choice('Why is flashing content dangerous?', ['It uses too much CSS', 'It can trigger seizures', 'It breaks dark mode', 'It stops animations'], 1, 'Rapid flashes can trigger photosensitive seizures.'),
    ]),
  },

  {
    id: 'css-19',
    title: 'Pseudo-classes and Pseudo-elements',
    summary: 'Style hover, focus, validation and structural states, and generate decorative content.',
    minutes: 14,
    content: `
<h2 id="pseudo-classes">Pseudo-classes select a state</h2>
<p>A pseudo-class starts with a single colon and matches an element in a particular state or position.</p>
<pre><code class="language-css">a:hover { text-decoration-thickness: 2px; }
a:focus-visible { outline: 3px solid #2563eb; }
li:first-child { font-weight: 700; }
li:nth-child(even) { background: #f1f5f9; }
input:invalid:not(:placeholder-shown) { border-color: #dc2626; }
input:valid { border-color: #16a34a; }
:is(h1, h2, h3) { line-height: 1.2; }
</code></pre>
<p>Common ones: <code>:hover</code>, <code>:focus</code>, <code>:focus-visible</code>, <code>:active</code>, <code>:checked</code>, <code>:disabled</code>, <code>:required</code>, <code>:invalid</code>, <code>:first-child</code>, <code>:last-child</code>, <code>:nth-child()</code>, <code>:not()</code> and <code>:has()</code>.</p>

<h2 id="pseudo-elements">Pseudo-elements create a part</h2>
<p>A pseudo-element starts with a double colon and targets a generated or specific part of an element.</p>
<pre><code class="language-css">.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgba(0,0,0,.6));
}

.card { position: relative; }

blockquote::before { content: "“"; font-size: 2rem; }
::selection { background: #fde68a; }
</code></pre>
<p><code>::before</code> and <code>::after</code> require a <code>content</code> value. They are decorative by default and are not reliable for important text because screen readers may ignore generated content.</p>

<h2 id="has">The parent selector :has()</h2>
<pre><code class="language-css">.card:has(img) { padding-top: 0; }
form:has(input:invalid) button { opacity: 0.6; }</code></pre>
<p><code>:has()</code> lets a parent react to its children, solving layout problems that previously needed JavaScript.</p>

<h2 id="order">State order matters</h2>
<p>Write link states in a consistent order: <code>:link</code>, <code>:visited</code>, <code>:hover</code>, <code>:focus</code>, <code>:active</code>. Otherwise a later rule may hide a state you intended to show.</p>
<div class="note note-tip"><strong>Never remove focus</strong>Style <code>:focus-visible</code> to be stronger, not invisible. Keyboard users depend on it.</div>
`,
    demo: {
      type: 'css',
      title: 'States and generated content',
      html: `<form>
  <label for="email">Email</label>
  <input id="email" type="email" placeholder=" " required>
  <button type="submit">Send</button>
</form>
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
<blockquote>Good design is obvious. Great design is transparent.</blockquote>`,
      css: `body { font-family: system-ui, sans-serif; padding: 1rem; }
input { display: block; margin: .4rem 0; padding: .5rem; border: 2px solid #cbd5e1; border-radius: 8px; }
input:valid { border-color: #16a34a; }
input:invalid:not(:placeholder-shown) { border-color: #dc2626; }
input:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
li:nth-child(even) { background: #e2e8f0; }
li::marker { color: #2563eb; font-weight: 700; }
blockquote { position: relative; padding-left: 1.5rem; font-style: italic; }
blockquote::before { content: "“"; position: absolute; left: 0; top: -0.2rem; font-size: 2rem; color: #2563eb; }`,
    },
    objectives: [
      'Style interactive, validation and structural states with pseudo-classes.',
      'Add decorative content with ::before and ::after.',
      'Use :has() to style a parent based on its children.',
    ],
    tasks: [
      'Style every even list item with a background colour.',
      'Show a red border only after an invalid input has content.',
      'Add a decorative quote mark with ::before.',
    ],
    takeaways: [
      'Pseudo-classes match state or position; pseudo-elements create a part.',
      '::before and ::after require content and are decorative.',
      ':has() can replace some JavaScript parent-selection hacks.',
    ],
    exercise: exerciseFor('css-19', 'pseudo-classes and elements', [
      choice('Which selector matches every even list item?', ['li:even', 'li:nth-child(even)', 'li:last-child', 'li:nth-of-type(odd)'], 1, 'nth-child(even) matches the 2nd, 4th, 6th… children.'),
      choice('What is required for ::before to render?', ['A width', 'The content property', 'position: absolute', 'A class name'], 1, 'Generated content needs a content value, even an empty string.'),
      fill('Show a focus ring for keyboard users.', 'a:focus-___ { outline: 3px solid teal; }', [['visible']], ':focus-visible targets keyboard focus without affecting every mouse click.'),
      choice('Which pseudo-class styles an input only while it is being edited?', [':valid', ':focus', ':checked', ':disabled'], 1, ':focus applies while the control has focus.'),
      choice('What does :has() allow?', ['Selecting a parent based on its children', 'Creating new HTML elements', 'Animating layout', 'Replacing media queries'], 1, ':has() matches an element if its subtree contains a matching element.'),
    ]),
  },

  {
    id: 'css-20',
    title: 'CSS Organisation, Naming and Maintainability',
    summary: 'Structure stylesheets, name classes clearly and keep a growing codebase predictable.',
    minutes: 15,
    content: `
<h2 id="structure">A stylesheet structure that scales</h2>
<p>A predictable file order makes debugging easier and prevents accidental overrides:</p>
<ol>
  <li><strong>Reset and base</strong> — box-sizing, typography, media defaults.</li>
  <li><strong>Tokens</strong> — custom properties for colour, spacing, radius and shadows.</li>
  <li><strong>Layout</strong> — page shells, containers, grids.</li>
  <li><strong>Components</strong> — buttons, cards, forms.</li>
  <li><strong>Utilities</strong> — small single-purpose helpers.</li>
  <li><strong>Media queries and reduced motion</strong> — near the relevant rules.</li>
</ol>
<p>For larger projects, split files by concern and import them in a defined order, or use native CSS layers:</p>
<pre><code class="language-css">@layer reset, base, layout, components, utilities;

@layer components {
  .button { … }
}</code></pre>

<h2 id="naming">Naming classes</h2>
<p>Prefer names that describe purpose, not appearance: <code>.card</code>, <code>.site-header</code>, <code>.button-primary</code>. Avoid <code>.red</code> or <code>.big</code> because they become wrong when the design changes.</p>
<p>A lightweight BEM-like convention helps:</p>
<pre><code class="language-css">.card { }
.card__title { }
.card--featured { }
</code></pre>
<p>Keep selectors shallow. If you need four levels of descendant selectors, add a class to the element instead.</p>

<h2 id="tokens">Design tokens</h2>
<pre><code class="language-css">:root {
  --color-bg: #0f172a;
  --color-text: #e2e8f0;
  --color-accent: #38bdf8;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --radius-md: 10px;
}</code></pre>
<p>Tokens are not only colours. Spacing, radius, shadows, font sizes and transitions all benefit from a small shared vocabulary.</p>

<h2 id="cleanup">Keeping CSS clean</h2>
<ul>
  <li>Delete unused rules, but check for JavaScript-applied classes first.</li>
  <li>Avoid <code>!important</code>; fix specificity instead.</li>
  <li>Do not use inline styles for anything that should be themed.</li>
  <li>Document non-obvious hacks with a short comment.</li>
  <li>Run a formatter so diffs stay readable.</li>
</ul>
<div class="note note-tip"><strong>One change, one place</strong>If changing a brand colour requires editing ten rules, the stylesheet is missing tokens.</div>
`,
    demo: {
      type: 'css',
      title: 'Tokens and component names',
      html: `<header class="site-header">
  <h1>Design tokens</h1>
  <button class="button button--primary">Primary</button>
  <button class="button button--ghost">Ghost</button>
</header>
<article class="card card--featured">
  <h2 class="card__title">A named card</h2>
  <p class="card__text">Classes describe purpose, not colour.</p>
</article>`,
      css: `:root { --bg: #0b1120; --surface: #111827; --text: #e2e8f0; --muted: #94a3b8; --accent: #38bdf8; --space: 1rem; --radius: 10px; }
* { box-sizing: border-box; }
body { margin: 0; padding: var(--space); background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; }
.site-header { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.site-header h1 { flex: 1 1 100%; font-size: 1.5rem; }
.button { font: inherit; padding: .5rem .9rem; border-radius: var(--radius); border: 1px solid var(--accent); background: transparent; color: var(--text); }
.button--primary { background: var(--accent); color: #04111f; font-weight: 700; }
.card { margin-top: var(--space); padding: var(--space); background: var(--surface); border: 1px solid #1f2937; border-radius: var(--radius); }
.card--featured { border-color: var(--accent); }
.card__title { margin: 0 0 .5rem; }
.card__text { margin: 0; color: var(--muted); }`,
    },
    objectives: [
      'Organise styles into base, tokens, layout and components.',
      'Name classes by purpose and use a consistent convention.',
      'Replace repeated values with custom properties.',
    ],
    tasks: [
      'Add one spacing token and use it in two rules.',
      'Rename a vague class such as .blue-box to a purpose-based name.',
      'Move component styles into an @layer components block.',
    ],
    takeaways: [
      'A predictable stylesheet order prevents accidental overrides.',
      'Purpose-based class names survive redesigns.',
      'Tokens make global changes fast and consistent.',
    ],
    exercise: exerciseFor('css-20', 'CSS organisation', [
      choice('Which class name is most maintainable?', ['.red', '.big-text', '.button-primary', '.style2'], 2, 'Purpose-based names stay meaningful when the visual design changes.'),
      choice('Where should reusable colours and spacing live?', ['Inline styles', 'Custom properties on :root', 'HTML attributes', 'JavaScript strings'], 1, 'Design tokens in :root centralise shared values.'),
      fill('Create a spacing token of 1rem.', ':root { --space-3: ___; }', [['1rem']], 'Custom properties store the value under a reusable name.'),
      choice('What do CSS cascade layers help with?', ['Image compression', 'Controlling the order of style groups', 'Writing HTML', 'Fetching data'], 1, '@layer establishes an explicit order between groups of rules.'),
      choice('Why avoid deep descendant selectors?', ['They are invalid', 'They are brittle and hard to reuse', 'They disable media queries', 'They break dark mode'], 1, 'Deep chains depend on DOM structure and are easily broken by markup changes.'),
    ]),
  },

  {
    id: 'css-21',
    title: 'CSS Project: Build a Responsive Marketing Site',
    summary: 'Plan and build a complete responsive product landing page from a brief.',
    minutes: 28,
    content: `
<h2 id="brief">The brief</h2>
<p>Build a landing page for <strong>FocusFlow</strong>, a fictional focus timer. The page should explain the product, show its features, display pricing and invite visitors to start a free trial.</p>
<p><strong>Required sections</strong></p>
<ul>
  <li>Sticky header with logo, navigation and a primary CTA.</li>
  <li>Hero with headline, supporting text, CTA and product visual.</li>
  <li>Feature grid with at least three benefits.</li>
  <li>Testimonial or social-proof section.</li>
  <li>Pricing cards with one highlighted plan.</li>
  <li>Signup form with visible labels and focus states.</li>
  <li>Footer with links and contact information.</li>
</ul>

<h2 id="design-system">Start with a design system</h2>
<pre><code class="language-css">:root {
  --bg: #0b1120;
  --surface: #111827;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --accent: #38bdf8;
  --radius: 14px;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
}</code></pre>
<p>Define tokens, then build mobile-first. Use Flexbox for rows and Grid for the feature/pricing sections.</p>

<h2 id="milestones">Milestones</h2>
<ol>
  <li><strong>Content and wireframe.</strong> Write the headline, features and pricing copy.</li>
  <li><strong>Semantic HTML.</strong> Use header, nav, main, sections and footer.</li>
  <li><strong>Base styles.</strong> Tokens, reset, typography and spacing.</li>
  <li><strong>Layout.</strong> Build each section mobile-first.</li>
  <li><strong>Responsive enhancement.</strong> Add breakpoints for tablet and desktop.</li>
  <li><strong>Interaction.</strong> Add hover, focus and a mobile navigation toggle.</li>
  <li><strong>Review.</strong> Check contrast, keyboard use, reduced motion and 320px width.</li>
</ol>

<h2 id="checklist">Completion checklist</h2>
<ul>
  <li>No horizontal scroll at 320px, 768px or 1440px.</li>
  <li>Every CTA is clearly visible and keyboard accessible.</li>
  <li>Form inputs have labels and visible focus states.</li>
  <li>Heading levels are logical.</li>
  <li>Colour contrast passes for body text and buttons.</li>
  <li>Images have alt text and stable dimensions.</li>
  <li>Animations respect prefers-reduced-motion.</li>
</ul>

<h2 id="stretch">Stretch goals</h2>
<p>Add a dark/light theme toggle with custom properties, a testimonial carousel with accessible controls, or a pricing comparison table. Keep the HTML semantic and the CSS organised as the page grows.</p>
`,
    demo: {
      type: 'css',
      title: 'Landing page starter',
      html: `<header class="site-header">
  <strong>FocusFlow</strong>
  <nav aria-label="Main"><a href="#features">Features</a><a href="#pricing">Pricing</a></nav>
  <a class="cta" href="#signup">Start free</a>
</header>
<main>
  <section class="hero">
    <h1>Protect your deep work</h1>
    <p>A calm timer that helps you focus for 25 minutes and rest properly.</p>
    <a class="cta" href="#signup">Try it free</a>
  </section>
  <section id="features" class="features">
    <article><h2>Simple</h2><p>One button, no setup.</p></article>
    <article><h2>Calm</h2><p>Quiet visuals and gentle sounds.</p></article>
    <article><h2>Private</h2><p>Your sessions stay on your device.</p></article>
  </section>
  <section id="pricing" class="pricing">
    <article class="plan"><h2>Free</h2><p>€0</p></article>
    <article class="plan featured"><h2>Pro</h2><p>€4 / month</p></article>
  </section>
</main>`,
      css: `:root { --bg:#0b1120; --surface:#111827; --text:#e2e8f0; --muted:#94a3b8; --accent:#38bdf8; --space:1rem; --radius:14px; }
* { box-sizing: border-box; }
body { margin:0; font-family:system-ui,sans-serif; background:var(--bg); color:var(--text); }
.site-header { position:sticky; top:0; display:flex; flex-wrap:wrap; gap:var(--space); align-items:center; padding:1rem; background:rgba(11,17,32,.92); border-bottom:1px solid #1f2937; }
.site-header nav { display:flex; gap:1rem; }
.site-header a { color:var(--text); }
.cta { display:inline-block; background:var(--accent); color:#04111f; padding:.6rem 1rem; border-radius:999px; font-weight:700; text-decoration:none; }
.hero { padding:clamp(2rem,8vw,5rem) 1rem; max-width:60rem; margin:auto; }
.hero h1 { font-size:clamp(2rem,6vw,4rem); margin:0 0 1rem; }
.hero p { color:var(--muted); max-width:55ch; margin-bottom:1.5rem; }
.features, .pricing { display:grid; gap:1rem; padding:1rem; max-width:60rem; margin:auto; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); }
.features article, .plan { background:var(--surface); padding:1.25rem; border-radius:var(--radius); border:1px solid #1f2937; }
.plan.featured { border-color:var(--accent); }`,
    },
    objectives: [
      'Turn a marketing brief into a semantic, responsive page.',
      'Build a small design system and use it consistently.',
      'Test responsiveness, keyboard access and contrast.',
    ],
    tasks: [
      'Complete the missing testimonial and signup sections.',
      'Add two breakpoints and test at 320px, 768px and 1440px.',
      'Add focus-visible styles to every link and button.',
    ],
    takeaways: [
      'A design system makes a multi-section page consistent.',
      'Mobile-first CSS plus breakpoints handles the widest range of screens.',
      'A landing page is not done until it is keyboard accessible and responsive.',
    ],
    exercise: exerciseFor('css-21', 'the landing page project', [
      choice('Which approach should come first?', ['Desktop layout', 'Content and mobile-first structure', 'Animations', 'Dark mode'], 1, 'Content and mobile-first structure reduce rework later.'),
      fill('Define a reusable accent colour token.', ':root { --color-accent: ___; }', [['#38bdf8']], 'Tokens store shared values such as the accent colour.'),
      choice('Which CSS creates responsive feature cards?', ['float: left', 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))', 'position: absolute', 'display: inline'], 1, 'auto-fit + minmax adapts the number of columns to available space.'),
      choice('Which item is part of the completion checklist?', ['More than five fonts', 'No horizontal scroll at common widths', 'Every section uses a div', 'Autoplaying video'], 1, 'Responsive review includes checking common widths for overflow.'),
      cssCode('Make .site-header sticky at the top of the page.', '/* write your CSS below */\n', [
        { pattern: '\\.site-header\\s*\\{[^}]*position\\s*:\\s*(sticky|fixed)', flags: 'is', message: 'Set position: sticky or fixed on .site-header' },
        { pattern: 'top\\s*:\\s*0', flags: 'i', message: 'Set top: 0' },
      ], `.site-header {\n  position: sticky;\n  top: 0;\n}`, 'Sticky positioning keeps the header visible while the page scrolls.'),
    ]),
  },

  {
    id: 'css-22',
    title: 'Project: Responsive Review and Polish',
    summary: 'Audit the marketing site across breakpoints, keyboard, motion and performance.',
    minutes: 18,
    content: `
<h2 id="why-review">A build is not finished when it looks good</h2>
<p>The last 20% of a front-end project is review: small screens, keyboard navigation, zoom, slow networks and edge-case content. This lesson gives you a repeatable checklist.</p>

<h2 id="responsive">Responsive review</h2>
<ol>
  <li>Test at 320px, 375px, 768px, 1024px and 1440px.</li>
  <li>Look for horizontal scrolling and elements that escape their containers.</li>
  <li>Check long headings, long email addresses and empty states.</li>
  <li>Zoom to 200% and re-check the layout.</li>
  <li>Rotate a phone to landscape.</li>
</ol>
<p>Use <code>min-width</code> media queries and keep the base styles mobile-first. Prefer intrinsic layout with Grid/Flexbox over a breakpoint for every component.</p>

<h2 id="accessibility">Accessibility review</h2>
<ul>
  <li>Tab through the page: visible focus on every control.</li>
  <li>Use a screen reader for headings, landmarks and forms.</li>
  <li>Check contrast for text, buttons and focus rings.</li>
  <li>Add <code>prefers-reduced-motion</code> support.</li>
  <li>Make sure images have useful alt text and links have descriptive names.</li>
</ul>

<h2 id="performance">Performance review</h2>
<ul>
  <li>Compress images and serve appropriate sizes.</li>
  <li>Limit font weights and use <code>font-display: swap</code>.</li>
  <li>Avoid layout thrash by animating transform/opacity.</li>
  <li>Check that the page is usable before JavaScript loads.</li>
  <li>Look for unused CSS and remove it carefully.</li>
</ul>

<h2 id="polish">Final polish</h2>
<pre><code class="language-css">:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}</code></pre>
<p>Small details — consistent spacing, a visible focus ring, a readable line length — make a page feel professional far more than extra decoration.</p>
<div class="note note-tip"><strong>Ship a checklist</strong>Write the review steps into the project README so the next change gets the same quality bar.</div>
`,
    demo: {
      type: 'css',
      title: 'Polished focus and reduced motion',
      html: `<div class="wrap">
  <h1>Review checklist</h1>
  <a class="cta" href="#done">Primary action</a>
  <button class="cta secondary">Secondary</button>
  <p class="note">Use Tab to see the focus ring.</p>
</div>`,
      css: `body { margin:0; font-family:system-ui,sans-serif; background:#0b1120; color:#e2e8f0; }
.wrap { max-width:42rem; margin:auto; padding:2rem 1rem; }
.cta { display:inline-block; background:#38bdf8; color:#04111f; font:inherit; font-weight:700; padding:.7rem 1.1rem; border:0; border-radius:999px; text-decoration:none; cursor:pointer; transition:transform 150ms ease; }
.cta:hover { transform:translateY(-2px); }
.cta.secondary { background:transparent; color:#e2e8f0; border:1px solid #38bdf8; }
:focus-visible { outline:3px solid #facc15; outline-offset:3px; }
.note { color:#94a3b8; }
@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.01ms !important; } }`,
    },
    objectives: [
      'Audit a page at multiple widths and zoom levels.',
      'Check keyboard navigation, focus and contrast.',
      'Apply a final performance and motion pass.',
    ],
    tasks: [
      'Test the landing page at 320px and fix any overflow.',
      'Add a visible focus-visible style to all interactive elements.',
      'Write a short review checklist in the project README.',
    ],
    takeaways: [
      'Responsive review is a set of concrete checks, not a feeling.',
      'Keyboard and screen-reader testing catch issues automated tools miss.',
      'Performance and motion polish are part of a finished front end.',
    ],
    exercise: exerciseFor('css-22', 'the project review', [
      choice('Which width is a useful minimum mobile test?', ['1440px', '320px', '2560px', 'Only desktop'], 1, '320px is a common narrow-phone width and exposes overflow issues.'),
      choice('What should every interactive element have?', ['A unique ID', 'A visible focus state', 'An inline style', 'A tooltip'], 1, 'Keyboard users must be able to see where focus is.'),
      fill('Respect reduced motion in the global review block.', '@media (prefers-reduced-motion: ___) { ... }', [['reduce']], 'The media feature value is reduce.'),
      choice('Which is a performance review action?', ['Adding more fonts', 'Compressing images and using appropriate sizes', 'Increasing animation duration', 'Adding unused CSS'], 1, 'Image optimisation is one of the highest-impact performance fixes.'),
      choice('Why test at 200% zoom?', ['To check font licensing', 'To ensure content remains usable when enlarged', 'To trigger dark mode', 'To enable reduced motion'], 1, 'Zoom reveals clipping and layout assumptions that fail for low-vision users.'),
    ]),
  },
];
