let micStream;

async function startMic() {
  micStream = await navigator.mediaDevices.getUserMedia({
    audio: true
  });

  const audio = document.getElementById("audio");
  audio.srcObject = micStream;
}