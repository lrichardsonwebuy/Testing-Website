async function runTest() {
  const output = document.getElementById("net");

  const start = performance.now();

  try {
    await fetch("https://www.apple.com", { mode: "no-cors" });
  } catch (e) {
    // ignore CORS issues, we just measure timing attempt
  }

  const end = performance.now();

  output.innerHTML = `
    <b>Latency Test:</b> ${(end - start).toFixed(2)} ms<br>
    <small>(Note: approximate due to CORS limitations)</small>
  `;
}