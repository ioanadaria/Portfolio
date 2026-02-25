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

// SECTION: Contact form handling stub
const contactForm = select('#contact-form');
const formHelper = select('#form-helper');

if (contactForm && formHelper) {
  contactForm.addEventListener('submit', (event) => {
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

    // Simulate successful submit – replace with your own integration
    formHelper.textContent = 'Thanks for reaching out! This demo form doesn\'t send yet, but your UI is ready.';
    formHelper.style.color = '#9ca3af';

    contactForm.reset();
  });
}

// SECTION: Footer year
const yearSpan = select('#year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}