<!DOCTYPE html>
<html>
<head>
<style>
.red-blink { color: red; }
.green-blink { color: green; }
</style>
</head>

<body>

<h2 id="status">Mode: Not Started</h2>

<div>
    <span id="hour">00</span> :
    <span id="min">00</span> :
    <span id="sec">00</span> .
    <span id="ms">000</span>
</div>

<p id="performance">Updates/sec: 0</p>

<button onclick="useDOM()">Use Standard DOM</button>
<button onclick="useVDOM()">Use Virtual DOM</button>

<script>

let vdomState = { h: "00", m: "00", s: "00", ms: "000" };
let intervalId = null;
let renderCount = 0;

// Performance counter
setInterval(() => {
    document.getElementById("performance").innerText =
        "Updates/sec: " + renderCount;
    renderCount = 0;
}, 1000);

function getTime() {
    const now = new Date();
    return {
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: String(now.getSeconds()).padStart(2, '0'),
        ms: String(now.getMilliseconds()).padStart(3, '0')
    };
}

function clearClock() {
    if (intervalId) clearInterval(intervalId);
}

/* =========================
   COMPONENT STYLE FUNCTIONS
========================= */

function updateHour(value) {
    document.getElementById("hour").innerText = value;
}

function updateMin(value) {
    document.getElementById("min").innerText = value;
}

function updateSec(value) {
    const el = document.getElementById("sec");
    el.innerText = value;
    el.classList.add("green-blink");
    setTimeout(() => el.classList.remove("green-blink"), 300);
}

function updateMs(value) {
    document.getElementById("ms").innerText = value;
}

/* =========================
   STANDARD DOM
========================= */

function useDOM() {
    clearClock();

    document.getElementById("status").innerText =
        "Mode: Standard DOM (All updating)";

    intervalId = setInterval(() => {
        const time = getTime();

        updateHour(time.h);
        updateMin(time.m);
        updateSec(time.s);
        updateMs(time.ms);

        // Blink ALL
        document.querySelectorAll("span").forEach(el => {
            el.classList.add("red-blink");
            setTimeout(() => el.classList.remove("red-blink"), 300);
        });

        renderCount++;

    }, 1000);
}

/* =========================
   VIRTUAL DOM
========================= */

function useVDOM() {
    clearClock();

    document.getElementById("status").innerText =
        "Mode: Virtual DOM (Optimized)";

    intervalId = setInterval(() => {
        const time = getTime();

        if (time.h !== vdomState.h) {
            updateHour(time.h);
        }

        if (time.m !== vdomState.m) {
            updateMin(time.m);
        }

        if (time.s !== vdomState.s) {
            updateSec(time.s);
        }

        // Always update milliseconds
        updateMs(time.ms);

        vdomState = time;
        renderCount++;

    }, 10); 
}

</script>

</body>
</html>
