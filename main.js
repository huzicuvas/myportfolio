// main.js
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const years = document.querySelectorAll('#year, #year2, #year3, #year4');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // simple hero slider autoplay
  (function slider(){
    const slider = document.getElementById('hero-slider');
    if(!slider) return;
    const imgs = slider.querySelectorAll('img');
    let i = 0;
    imgs.forEach((img, idx) => img.style.display = idx === 0 ? 'block' : 'none');
    setInterval(()=> {
      imgs[i].style.display = 'none';
      i = (i + 1) % imgs.length;
      imgs[i].style.display = 'block';
    }, 3000);
  })();

  // nav toggle for small screens
  function hookNav(toggleId, navId = 'nav'){
    const t = document.getElementById(toggleId);
    t && t.addEventListener('click', () => {
      const nav = document.getElementById(navId);
      if(nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  hookNav('nav-toggle');
  hookNav('nav-toggle-2');
  hookNav('nav-toggle-3');
  hookNav('nav-toggle-4');

  // theme toggle (dark/light)
  function themeHook(btnId) {
    const btn = document.getElementById(btnId);
    if(!btn) return;
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      // store preference
      if(document.documentElement.classList.contains('light')) localStorage.setItem('theme','light');
      else localStorage.removeItem('theme');
    });
  }
  themeHook('theme-toggle');
  themeHook('theme-toggle-2');
  themeHook('theme-toggle-3');
  themeHook('theme-toggle-4');

  // restore theme
  if(localStorage.getItem('theme') === 'light') document.documentElement.classList.add('light');

  // project filter
  const filters = document.querySelectorAll('.filter-btn');
  const projectsList = document.getElementById('projects-list');
  if(filters.length && projectsList){
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const cards = projectsList.querySelectorAll('.project-card');
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        if(filter === 'all' || tags.includes(filter)) card.style.display = '';
        else card.style.display = 'none';
      });
    }));
  }

  // contact form simple validation
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const msg = document.getElementById('form-msg');
      msg.textContent = '';

      if(!name.value || name.value.trim().length < 2){
        msg.textContent = 'Please enter a valid name (at least 2 characters).';
        name.focus(); return;
      }
      if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){
        msg.textContent = 'Please enter a valid email address.';
        email.focus(); return;
      }
      if(!message.value || message.value.trim().length < 10){
        msg.textContent = 'Message should be at least 10 characters.';
        message.focus(); return;
      }

      // Simulate submission (since static site) — in real project you'd POST to server
      msg.style.color = '';
      msg.textContent = 'Thanks — your message looks good! (In a deployed version this would be submitted to a server.)';
      form.reset();
    });
  }
});
// JS placeholder

function toggleNav() {
  document.getElementById("mainNav").classList.toggle("active");
}
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("active");
  });
});
