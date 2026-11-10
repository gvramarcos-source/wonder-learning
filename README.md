# Wonder Learning and Coaching

Website for Wonder Learning and Coaching, hosted on GitHub Pages.

## How the site is organized

Each tab is its own page, so search engines and AI tools can find and cite it:

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about/index.html` |
| New Manager MVP | `new-manager-mvp/index.html` |
| Enterprise Offerings | `enterprise/index.html` |
| Free Resources (with the quiz) | `resources/index.html` |
| 10 Days to Management Success | `ten-days/index.html` |
| Book a consultation | `book/index.html` |

Shared styles are in `assets/site.css`; the quiz and the copy-email button are in `assets/site.js`.
Each page has its own title, description, and structured data (the `application/ld+json` block in its head).
`sitemap.xml` lists every page; update its dates when content changes.
Pushing to `main` publishes the site.
