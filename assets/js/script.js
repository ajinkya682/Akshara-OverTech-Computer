document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });

  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const mobilePanel = document.getElementById('mobile-panel');
  const mobileClose = document.getElementById('mobile-close');

  mobileToggle?.addEventListener('click', () => mobilePanel.classList.toggle('hidden'));
  mobileClose?.addEventListener('click', () => mobilePanel.classList.add('hidden'));

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        mobilePanel?.classList.add('hidden');
      }
    }),
  );

  const form = document.getElementById('contact-form');
  const resultElem = document.getElementById('contact-result');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    resultElem.textContent = '';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        resultElem.textContent = 'Thank you! We will contact you soon.';
        resultElem.style.color = 'green';
      } else {
        resultElem.textContent = 'Submission failed. Please try again.';
        resultElem.style.color = 'crimson';
      }
    } catch {
      resultElem.textContent = 'Error occurred. Please try again later.';
      resultElem.style.color = 'crimson';
    }
  });

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    alert('Language toggle clicked — implement translations in assets/js/lang.js');
  });
});
