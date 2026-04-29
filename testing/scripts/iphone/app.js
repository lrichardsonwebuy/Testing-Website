window.showPage = function(page) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  document.getElementById(page).classList.remove('hidden');
}