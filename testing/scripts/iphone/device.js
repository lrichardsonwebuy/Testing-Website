window.loadInfo = function () {
  document.getElementById("liveArea").innerText = `
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}
Cores: ${navigator.hardwareConcurrency}
Memory: ${navigator.deviceMemory || "unknown"}
`;
};