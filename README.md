# Ioana Petrescu – QA Engineer Portfolio

A professional portfolio website built with semantic HTML, modern CSS, and vanilla JavaScript.

**Live site (after deployment):** <https://ioanadaria.github.io/Portfolio/>

---

## About

Personal portfolio showcasing QA engineering experience, automation projects, skills, and contact information.

## Tech stack

- HTML5 (semantic, accessible markup)
- CSS3 (custom properties, responsive grid, animations)
- JavaScript (ES2019+, no frameworks)

## Projects featured

| Project | Repo |
| --- | --- |
| Selenium Integration Framework (Java + TestNG) | [Selenium-Integration](https://github.com/ioanadaria/Selenium-Integration) |
| Selenium UI Automation Suite (Python & Java) | [Selenium](https://github.com/ioanadaria/Selenium) |
| RecordCollector Web App | [recordcollector_web](https://github.com/ioanadaria/recordcollector_web) |

## Setup

No build step required. Open `index.html` in a browser, use the **VS Code Live Server** extension, or serve with any static file server:

```bash
# Requires Node.js and npm (https://nodejs.org)
npx serve .

# Or Python 3
python3 -m http.server
```

## Contact form

The contact form uses [Formspree](https://formspree.io). To activate it:

1. Sign up at [formspree.io](https://formspree.io) and create a new form.
2. Copy your form ID (e.g. `xpwzabcd`).
3. In `script.js`, replace `YOUR_FORM_ID` in the `FORMSPREE_ENDPOINT` constant.

## CV

Place your CV file at the root as `ioana-petrescu-cv.pdf` to enable the Download CV button. Commit and push the file — it is not included in this repo.

## Favicon

A `favicon.ico` file is referenced in `index.html` but not included in this repo. Add one to the root directory and commit it.

## Deployment

Will be hosted via GitHub Pages. To deploy for the first time:

1. Confirm the repo is on GitHub at `https://github.com/ioanadaria/Portfolio`.
2. Go to **Settings → Pages → Source → Deploy from a branch**.
3. Select `main` branch, `/ (root)`, and click **Save**.

Subsequent deployments trigger automatically on every push to `main`.

## License

MIT
