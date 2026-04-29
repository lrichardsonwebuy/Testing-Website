window.runNetworkTest = async function () {
  const start = performance.now();

  await fetch("https://www.apple.com", { mode: "no-cors" }).catch(() => {});

  const end = performance.now();

  document.getElementById("liveArea").innerHTML =
    "Latency: " + (end - start).toFixed(2) + "ms";
};