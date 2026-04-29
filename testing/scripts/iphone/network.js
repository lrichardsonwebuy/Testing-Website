window.runNetworkTest = function () {
  const area = document.getElementById("liveArea");

  area.innerHTML = `
    <h3>🌐 Network Check</h3>

    <div style="margin-top:10px;">
      <p>✔ Check Network 1</p>
      <p>✔ Check Network 2</p>
    </div>

    <p>Confirm if all network features are working.</p>
  `;
};