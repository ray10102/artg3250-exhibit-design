const selector1 = document.getElementById('selector1');
const selector2 = document.getElementById('selector2');
const selector3 = document.getElementById('selector3');
const selector4 = document.getElementById('selector4');
const tryAgain = document.getElementById('tryAgain');
const backToMain = document.getElementById('backToMain');

const selectionKeys = ['A', 'B', 'C', 'D', 'X'];
let readyTimeout;

// Button handlers
document.addEventListener('DOMContentLoaded', () => {
    // TODO put in a loop for cleaner code
    selector1.addEventListener('click', getHandlerForSelection(0));
    selector2.addEventListener('click', getHandlerForSelection(1));
    selector3.addEventListener('click', getHandlerForSelection(2));
    selector4.addEventListener('click', getHandlerForSelection(3));
    tryAgain.addEventListener('click', tryAgainHandler);
    backToMain.addEventListener('click', backToMainHandler);
});

function getHandlerForSelection(i) {
    return () => {
        selectOption(i);
    }
}

function tryAgainHandler() {
    selectOption(selectedIndex);
    readyTimeout && clearTimeout(readyTimeout) && document.getElementById("ready").classList.toggle("hidden", true);
    writeToStream(selectionKeys[4]);
}

function backToMainHandler() {
    document.getElementById('exhibitInfo').classList.toggle('hidden', false);
    readyTimeout && clearTimeout(readyTimeout) && document.getElementById("ready").classList.toggle("hidden", true);
    writeToStream(selectionKeys[4]);
}

function selectOption(i) {
    document.getElementById('exhibitInfo').classList.toggle('hidden', true);
    writeToStream(selectionKeys[i]);
    clearPlayerData();
    selectCSV(i);
    initGraph();
}

function ready() {
    document.getElementById("ready").innerHTML = `You need to travel ${Math.round(targetRealDist)} inches in ${formatTime(timeLimit)} seconds.\nReady?`;
    document.getElementById("ready").classList.toggle("hidden", false);
    readyTimeout = setTimeout(() => {
        document.getElementById("ready").innerHTML = "Start!";
        startReading();
        startTimer();
        readyTimeout = setTimeout(() => {
            document.getElementById("ready").classList.toggle("hidden", true);
        }, 750);
    }, 4000);
}

function stop() {
    // update UI here

    stopReading();
}

function showMainPage() {
    document.getElementById('exhibitInfo').classList.toggle('hidden', false);
    initExampleGraph();
    startExampleAnimation();
}