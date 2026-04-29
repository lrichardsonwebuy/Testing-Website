let track;
let flashOn = false;

window.initFlash = async function () {
  const s = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });

  track = s.getVideoTracks()[0];
};

window.toggleFlash = async function () {
  if (!track) return;

  try {
    await track.applyConstraints({
      advanced: [{ torch: !flashOn }]
    });

    flashOn = !flashOn;
  } catch {
    alert("Flash not supported");
  }
};