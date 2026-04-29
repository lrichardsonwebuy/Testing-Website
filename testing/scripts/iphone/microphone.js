let stream, audioCtx, analyser, dataArray, canvas, ctx, anim;

window.startMic = async function () {
  stream = await navigator.mediaDevices.getUserMedia({ audio:true });

  audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 64;

  source.connect(analyser);

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  const live = document.getElementById("liveArea");

  canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 80;
  ctx = canvas.getContext("2d");

  live.innerHTML = "<h3>🎤 Audio Waveform</h3>";
  live.appendChild(canvas);

  draw();
};

function draw() {
  anim = requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0,0,canvas.width,canvas.height);

  let x = 0;
  for (let i=0;i<dataArray.length;i++) {
    let v = dataArray[i] / 2;
    ctx.fillRect(x, 80-v, 4, v);
    x += 5;
  }
};

window.stopMic = function () {
  if (stream) stream.getTracks().forEach(t=>t.stop());
  cancelAnimationFrame(anim);
};