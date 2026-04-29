let micStream = null;
let audioElement = null;

window.startMic = async function () {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    audioElement = document.createElement("audio");
    audioElement.autoplay = true;
    audioElement.controls = true;
    audioElement.srcObject = micStream;

    const liveArea = document.getElementById("liveArea");

    liveArea.innerHTML = `
      <h3>🔊 Audio Test (Mic + Speaker)</h3>
      <p>Speak into the microphone. You should hear playback through the speaker.</p>
    `;

    liveArea.appendChild(audioElement);

  } catch (err) {
    console.error("Microphone error:", err);
    alert("Microphone access denied or unavailable.");
  }
};

window.stopMic = function () {
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }

  if (audioElement) {
    audioElement.srcObject = null;
    audioElement.remove();
    audioElement = null;
  }

  const liveArea = document.getElementById("liveArea");

  if (liveArea) {
    liveArea.innerHTML = `
      <h3>🔊 Audio Test (Mic + Speaker)</h3>
      <p>Audio test stopped.</p>
    `;
  }
};