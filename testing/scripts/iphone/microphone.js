window.startMic = async function () {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audio = document.createElement("audio");
  audio.controls = true;
  audio.autoplay = true;
  audio.srcObject = stream;

  document.getElementById("liveArea").innerHTML = "";
  document.getElementById("liveArea").appendChild(audio);
};