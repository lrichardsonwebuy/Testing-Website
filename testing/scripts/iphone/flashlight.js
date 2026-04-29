let stream = null;
let track = null;
let flashOn = false;

function renderFlashUI() {
  const live = document.getElementById("liveArea");

  live.innerHTML = `
    <h3>🔦 Flashlight Test</h3>

    <p id="flashStatus">Initialising...</p>

    <div style="margin-top:10px;">
      <button onclick="toggleFlash()">Toggle Flash</button>
      <button onclick="stopFlash()">Stop</button>
    </div>
  `;
}

window.initFlash = async function () {
  try {
    renderFlashUI();

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    });

    track = stream.getVideoTracks()[0];

    const status = document.getElementById("flashStatus");

    // 🔥 Try auto-enable torch
    try {
      await track.applyConstraints({
        advanced: [{ torch: true }]
      });

      flashOn = true;

      if (status) {
        status.innerText = "🟢 Flashlight AUTO-ON (supported)";
      }

    } catch (err) {
      console.warn("Auto torch failed:", err);

      if (status) {
        status.innerText = "⚠️ Auto flash not supported — use Toggle button";
      }
    }

  } catch (err) {
    console.error("Flashlight init failed:", err);

    const live = document.getElementById("liveArea");
    if (live) {
      live.innerHTML = `
        <h3>🔦 Flashlight Test</h3>
        <p>❌ Flashlight not available or permission denied</p>
      `;
    }
  }
};

window.toggleFlash = async function () {
  if (!track) {
    alert("Flashlight not initialised");
    return;
  }

  try {
    flashOn = !flashOn;

    await track.applyConstraints({
      advanced: [{ torch: flashOn }]
    });

    const status = document.getElementById("flashStatus");

    if (status) {
      status.innerText = flashOn
        ? "🟢 Flashlight ON"
        : "🔴 Flashlight OFF";
    }

  } catch (err) {
    console.error("Torch toggle error:", err);
    alert("Torch not supported on this device/browser");
  }
};

window.stopFlash = function () {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }

  stream = null;
  track = null;
  flashOn = false;

  const live = document.getElementById("liveArea");

  if (live) {
    live.innerHTML = `
      <h3>🔦 Flashlight Test</h3>
      <p>Stopped</p>
    `;
  }
};