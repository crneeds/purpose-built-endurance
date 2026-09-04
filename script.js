const nav = document.getElementById('site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('.section-anchor')];
const interestField = document.getElementById('interest');
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.plan-cta').forEach(button => {
  button.addEventListener('click', () => {
    if (interestField) interestField.value = button.dataset.interest || '';
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => interestField?.focus({ preventScroll: true }), 550);
  });
});

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] });
sections.forEach(section => observer.observe(section));

form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  statusEl.textContent = 'The form design is ready. We’ll connect it to a live email/form service before launch.';
});

document.getElementById('year').textContent = new Date().getFullYear();
