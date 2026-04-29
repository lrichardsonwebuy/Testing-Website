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
    liveArea.innerHTML = "<p>🎤 Microphone active</p>";
    liveArea.appendChild(audioElement);

  } catch (err) {
    console.error("Mic error:", err);
    alert("Microphone access denied or not available.");
  }
};

window.stopMic = function () {
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }

  if (audioElement) {
    audioElement.srcObject = null;
  }

  const liveArea = document.getElementById("liveArea");
  if (liveArea) {
    liveArea.innerHTML = "<p>🎤 Microphone stopped</p>";
  }
};