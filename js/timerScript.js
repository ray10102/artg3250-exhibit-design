const FULL_DASH_ARRAY = 283
const YEARS_PER_SEC = 100;

let timeLimit = null;
let timePassed = 0;
let timeLeft = timeLimit;
let timerInterval = null;
let startedReading = false;

let startTime = null;


// Countdown

function setTimeLimit() {
    let range = yearRange[1] - yearRange[0];
    timeLimit = range / YEARS_PER_SEC;
}

function startTimer() {
    startTime = Date.now();
    timePassed = 0;
    timeLeft = timeLimit;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    document.getElementById('base-timer-path-remaining').classList.toggle('hidden', false);
    document.getElementsByClassName('base-timer')[0].classList.toggle('hidden', false);

    timerInterval = setInterval(() => {

        // The amount of time passed increments by one
        timePassed = (Date.now() - startTime)/1000;
        timeLeft = timeLimit - timePassed;

        if (timeLeft < 0) {
            document.getElementById("base-timer-label").innerHTML = formatTime(0);
            document.getElementById('base-timer-path-remaining').classList.toggle('hidden', true);
            stop();
            clearInterval(timerInterval);
        } else {
            // The time left label is updated
            document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
            setCircleDasharray();
        }
    }, 100);
}

function formatTime(time) {
    let result = Math.round(time * 10) / 10;
    if (result % 1 === 0) {
        return result + ".0";
    } else {
        return result;
    }
}

// Divides time left by the defined time limit.
function calculateTimeFraction() {
    return timeLeft / timeLimit;
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}