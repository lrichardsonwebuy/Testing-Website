let testIndex = 0;
let results = [];

const tests = [
  { name:"Camera Back", run:"camera-back" },
  { name:"Camera Front", run:"camera-front" },
  { name:"Flashlight", run:"flash" },
  { name:"Sensors", run:"sensors" },
  { name:"Audio Test", run:"mic" },
  { name:"Network", run:"network" },
  { name:"Device Info", run:"device" }
];

window.startDiagnostics = function () {
  testIndex = 0;
  results = [];
  showStep();
};

window.showStep = function () {
  document.getElementById("diagnostic").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  updateProgress();

  const t = tests[testIndex];

  document.getElementById("stepTitle").innerText = t.name;
  document.getElementById("liveArea").innerHTML = "";

  runTest(t.run);
};

function runTest(type) {
  if (type === "camera-back") startCamera("environment");
  if (type === "camera-front") startCamera("user");
  if (type === "flash") initFlash();
  if (type === "sensors") startSensors();
  if (type === "mic") startMic();
  if (type === "network") runNetworkTest();
  if (type === "device") loadInfo();
}

window.passTest = function () {
  results.push({ test: tests[testIndex].name, result:"PASS" });
  showOverlay("PASS");
  next();
};

window.failTest = function () {
  results.push({ test: tests[testIndex].name, result:"FAIL" });
  showOverlay("FAIL");
  next();
};

function next() {
  setTimeout(() => {
    testIndex++;
    hideOverlay();

    if (testIndex >= tests.length) showResults();
    else showStep();
  }, 600);
}

function updateProgress() {
  document.getElementById("progress").innerText =
    `Step ${testIndex+1} of ${tests.length}`;
}

function showOverlay(type) {
  const o = document.getElementById("overlay");
  o.style.display = "flex";
  o.className = type.toLowerCase();
  o.innerText = type;
}

function hideOverlay() {
  const o = document.getElementById("overlay");
  o.style.display = "none";
}

function showResults() {
  document.getElementById("diagnostic").classList.add("hidden");

  const r = document.getElementById("result");
  r.classList.remove("hidden");

  r.innerHTML =
    "<h2>Results</h2>" +
    results.map(x => `<div>${x.test}: <b>${x.result}</b></div>`).join("");
}