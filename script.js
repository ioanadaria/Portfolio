// SECTION: Helpers
const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// SECTION: Smooth scrolling for nav links
selectAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    event.preventDefault();

    const headerOffset = 70;
    const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });
});

// SECTION: Nav highlight on scroll
const sections = selectAll('main section[id]');
const navLinks = selectAll('.nav-list a');

const highlightNav = () => {
  const scrollPosition = window.scrollY;
  const offset = 120;

  let currentId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - offset;
    if (scrollPosition >= sectionTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.substring(1) : '';

    if (id === currentId) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
};

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);

// SECTION: Mobile nav toggle
const navToggle = select('.nav-toggle');
const navList = select('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('nav-open');
  });
}

// Close mobile nav when clicking a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('nav-open')) {
      navList.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (
    navList &&
    navToggle &&
    navList.classList.contains('nav-open') &&
    !navList.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navList.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// SECTION: Contact form handling (Formspree)
// Sign up at https://formspree.io, create a form, and replace YOUR_FORM_ID below.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const contactForm = select('#contact-form');
const formHelper = select('#form-helper');

if (contactForm && formHelper) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      formHelper.textContent = 'Please fill in all fields before submitting.';
      formHelper.style.color = '#f97373';
      return;
    }

    formHelper.textContent = 'Sending…';
    formHelper.style.color = 'var(--color-text-muted)';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formHelper.textContent = 'Message sent! I\'ll get back to you soon.';
        formHelper.style.color = '#34d399';
        contactForm.reset();
      } else {
        const data = await response.json();
        formHelper.textContent = (data?.errors?.[0]?.message) || 'Something went wrong. Please try again.';
        formHelper.style.color = '#f97373';
      }
    } catch {
      formHelper.textContent = 'Network error. Please try again later.';
      formHelper.style.color = '#f97373';
    }
  });
}

// SECTION: Footer year
const yearSpan = select('#year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}