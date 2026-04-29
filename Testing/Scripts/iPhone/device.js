function loadInfo() {
  const info = document.getElementById("info");

  info.textContent = `
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}
Language: ${navigator.language}
Cores: ${navigator.hardwareConcurrency || "unknown"}
Memory: ${navigator.deviceMemory || "unknown"} GB
Touch Support: ${("ontouchstart" in window) ? "Yes" : "No"}
  `.trim();
}