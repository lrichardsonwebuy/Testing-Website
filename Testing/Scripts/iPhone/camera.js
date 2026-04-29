let stream;
let recorder;
let chunks = [];

async function startCamera() {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  document.getElementById('preview').srcObject = stream;
}

function startRecording() {
  chunks = [];

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    document.getElementById('playback').src = URL.createObjectURL(blob);
  };

  recorder.start();
}

function stopRecording() {
  if (recorder && recorder.state !== "inactive") {
    recorder.stop();
  }
}