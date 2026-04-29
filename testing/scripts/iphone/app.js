console.log("app.js loaded");

window.showPage = function (page) {
  const pages = document.querySelectorAll('.card');

  pages.forEach(p => p.classList.add('hidden'));

  const target = document.getElementById(page);

  if (target) {
    target.classList.remove('hidden');
  } else {
    console.error("Page not found:", page);
  }
};