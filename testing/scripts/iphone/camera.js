let stream;

window.startCamera = async function (facing = "environment") {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: facing },
    audio: false
  });

  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  video.style.width = "100%";
  video.style.borderRadius = "10px";

  video.srcObject = stream;

  const liveArea = document.getElementById("liveArea");
  liveArea.innerHTML = "";
  liveArea.appendChild(video);
};