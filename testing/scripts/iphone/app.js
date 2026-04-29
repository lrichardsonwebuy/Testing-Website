let testIndex = 0;
let results = [];

const tests = [
  {
    name: "Camera Live Test (Back Camera)",
    type: "camera-back"
  },
  {
    name: "Camera Live Test (Front Camera)",
    type: "camera-front"
  },
  {
    name: "Flashlight Test",
    type: "flash"
  },
  {
    name: "Motion Sensors",
    type: "sensors"
  },
  {
    name: "Microphone",
    type: "mic"
  },
  {
    name: "Network",
    type: "network"
  },
  {
    name: "Device Info",
    type: "device"
  }
];

window.startDiagnostics = function () {
  testIndex = 0;
  results = [];
  showStep();
};

window.showStep = function () {
  document.getElementById("diagnostic").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  const step = tests[testIndex];

  document.getElementById("stepTitle").innerText = step.name;

  document.getElementById("stepContent").innerHTML = `
    <p>Check if the feature works correctly.</p>
    <div id="liveArea"></div>
  `;

  runStep(step.type);
};

function runStep(type) {
  if (type === "camera-back") startCamera("environment");
  if (type === "camera-front") startCamera("user");
  if (type === "flash") initFlash();
  if (type === "sensors") startSensors();
  if (type === "mic") startMic();
  if (type === "network") runNetworkTest();
  if (type === "device") loadInfo();
}

window.passTest = function () {
  results.push({ test: tests[testIndex].name, result: "PASS" });
  nextStep();
};

window.failTest = function () {
  results.push({ test: tests[testIndex].name, result: "FAIL" });
  nextStep();
};

function nextStep() {
  testIndex++;

  if (testIndex >= tests.length) {
    showResults();
  } else {
    showStep();
  }
}

function showResults() {
  document.getElementById("diagnostic").classList.add("hidden");

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");

  resultDiv.innerHTML = `
    <h2>📊 Results</h2>
    ${results.map(r => `
      <div>${r.test}: <b>${r.result}</b></div>
    `).join("")}
  `;
}