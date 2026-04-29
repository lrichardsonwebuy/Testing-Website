console.log("app.js loaded");

window.showPage = function (page) {
  document.querySelectorAll('.card').forEach(el => {
    el.classList.add('hidden');
  });

  const target = document.getElementById(page);
  if (target) {
    target.classList.remove('hidden');
  } else {
    console.error("Page not found:", page);
  }
};