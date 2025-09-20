(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toast = document.getElementById('toast');
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 2400);
  }

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Subscribe form (demo)
  const form = document.getElementById('subscribeForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = (document.getElementById('name') || {}).value?.trim();
      const email = (document.getElementById('email') || {}).value?.trim();
      const msgEl = document.getElementById('formMessage');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
      if(!emailOk){
        msgEl.textContent = 'Please use a valid email.';
        msgEl.style.color = '#b44b28';
        return;
      }
      const key = 'lfts_waitlist';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ name: name || null, email, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
      msgEl.textContent = 'You’re on the list. See you on launch day.';
      msgEl.style.color = 'green';
      form.reset();
      showToast('Added to dispatch ✉️');
    });
  }

  const inlineBtn = document.querySelector('[data-inline-submit]');
  if(inlineBtn){ inlineBtn.addEventListener('click', ()=> showToast('Added to dispatch ✉️ (demo)')); }
})();