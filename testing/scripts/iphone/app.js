let testIndex = 0;
let results = [];

const tests = [
  { name: "Camera (Back)", run: "camera-back" },
  { name: "Camera (Front)", run: "camera-front" },
  { name: "Flashlight", run: "flash" },
  { name: "Motion Sensors", run: "sensors" },
  { name: "Microphone", run: "mic" },
  { name: "Network", run: "network" },
  { name: "Device Info", run: "device" }
];

window.startDiagnostics = function () {
  testIndex = 0;
  results = [];
  showStep();
};

window.showStep = function () {
  document.getElementById("diagnostic").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  const test = tests[testIndex];

  document.getElementById("stepTitle").innerText = test.name;

  document.getElementById("stepContent").innerHTML = `
    <p>Check this feature and confirm if it works.</p>
    <div id="liveArea"></div>
  `;

  runTest(test.run);
};

function runTest(type) {
  const area = document.getElementById("liveArea");

  if (type === "camera-back") startCamera("environment");
  if (type === "camera-front") startCamera("user");

  if (type === "flash") {
    initFlash();
    area.innerHTML = "Toggle flashlight and check if it works.";
  }

  if (type === "sensors") startSensors();

  if (type === "mic") startMic();

  if (type === "network") runNetworkTest();

  if (type === "device") loadInfo();
}

window.passTest = function () {
  results.push({ test: tests[testIndex].name, result: "PASS" });
  next();
};

window.failTest = function () {
  results.push({ test: tests[testIndex].name, result: "FAIL" });
  next();
};

function next() {
  testIndex++;

  if (testIndex >= tests.length) {
    showResults();
  } else {
    showStep();
  }
}

function showResults() {
  document.getElementById("diagnostic").classList.add("hidden");

  const out = document.getElementById("result");
  out.classList.remove("hidden");

  out.innerHTML = `
    <h2>Diagnostic Complete</h2>
    ${results.map(r => `
      <div>${r.test}: <b>${r.result}</b></div>
    `).join("")}
  `;
}