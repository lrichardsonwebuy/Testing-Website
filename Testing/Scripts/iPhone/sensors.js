function startSensors() {
  window.addEventListener("deviceorientation", handleOrientation);
}

function handleOrientation(event) {
  const el = document.getElementById("sensorData");

  el.innerHTML = `
    <b>Alpha:</b> ${event.alpha?.toFixed(2)}<br>
    <b>Beta:</b> ${event.beta?.toFixed(2)}<br>
    <b>Gamma:</b> ${event.gamma?.toFixed(2)}
  `;
}

// auto-start when loaded
startSensors();