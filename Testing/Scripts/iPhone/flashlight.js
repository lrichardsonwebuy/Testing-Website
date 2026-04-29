let track;
let flashOn = false;

async function initFlash() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });

  track = stream.getVideoTracks()[0];
}

async function toggleFlash() {
  if (!track) {
    alert("Initialize camera first");
    return;
  }

  try {
    await track.applyConstraints({
      advanced: [{ torch: !flashOn }]
    });

    flashOn = !flashOn;
  } catch (e) {
    alert("Flashlight not supported on this device/browser.");
  }
}