window.startSensors = function () {
  window.addEventListener("deviceorientation", (e) => {
    document.getElementById("liveArea").innerHTML = `
      Alpha: ${e.alpha}<br>
      Beta: ${e.beta}<br>
      Gamma: ${e.gamma}
    `;
  });
};