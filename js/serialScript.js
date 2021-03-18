'use strict';

let port;
let reader;
let inputDone;
let outputDone;
let inputStream;
let outputStream;

const log = document.getElementById('log');
const ledCBs = document.querySelectorAll('input.led');
const divLeftBut = document.getElementById('leftBut');
const divRightBut = document.getElementById('rightBut');
const butConnect = document.getElementById('butConnect');
const sensorReading = document.getElementById('sensor-reading');

const AVERAGE_MAX_COUNT = 5;

let playerData = [];
let rawData = [];

const bufferSize = 5; // how many past entries are averaged
// this value is fairly large because incorrect values are usually 200 units away from real ones
const maxDiff = 50; // maximum difference between a new measurement and the old

document.addEventListener('DOMContentLoaded', () => {
    butConnect.addEventListener('click', clickConnect);
    // Feature detection
    const notSupported = document.getElementById('notSupported');
    notSupported.classList.toggle('hidden', 'serial' in navigator);
});

// Serial connection functions

/**
 * @name connect
 * Opens a Web Serial connection to a port and sets up the input stream.
 */
async function connect() {
    // Request & open port.
    port = await navigator.serial.requestPort();
    // Wait for the port to open.
    await port.open({ baudRate: 9600 });
    // Read the stream
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable
        .pipeThrough(new TransformStream(new LineBreakTransformer()));

    reader = inputStream.getReader();
    readLoop();

    // Setup the output stream
    const encoder = new TextEncoderStream();
    outputDone = encoder.readable.pipeTo(port.writable);
    outputStream = encoder.writable;

    writeToStream('\x03', 'echo(false);');
    butConnect.classList.toggle("notConnected", false);
}


/**
 * @name disconnect
 * Closes the Web Serial connection.
 */
async function disconnect() {
    console.log("disconnecting");
    // Close the input stream (reader).
    if (reader) {
        await reader.cancel();
        await inputDone.catch(() => { });
        reader = null;
        inputDone = null;
    }
    // Close the port
    await port.close();
    port = null;
}


/**
 * @name clickConnect
 * Click handler for the connect/disconnect button.
 */
async function clickConnect() {
    // Disconnect
    if (port) {
        await disconnect();
        toggleUIConnected(false);
        return;
    }

    // Connect
    await connect();
    // CODELAB: Reset the grid on connect here.

    // CODELAB: Initialize micro:bit buttons.

    toggleUIConnected(true);
}

/**
 * @name toggleUIConnected
 * Updates UI depending on if serial is connected or not.
 */
async function toggleUIConnected(connected) {
    // Disconnected
    if (!connected) {
        document.getElementById("butConnect").innerHTML = "Connect";
    } else { // Connected
        document.getElementById("butConnect").innerHTML = "Disconnect";
    }
}


/**
 * @name readLoop
 * Reads data from the input stream and displays it on screen.
 */
async function readLoop() {
    while (true) {
        const { value, done } = await reader.read();
        if (value) {
            log.textContent += value + '\n';
            sensorReading.innerHTML = value;
            processValue(value);
        }
        if (done) {
            console.log('[readLoop] DONE', done);
            reader.releaseLock();
            break;
        }
    }
}

/**
 * @name processValue
 * Takes in an output from the distance sensor and handles it as valid or noise.
 * @param  string value The value outputted by the distance sensor
 */
function processValue(value) {
    let i = 0;
    let sum = 0;
    while (rawData.length - i > 0 && i < AVERAGE_MAX_COUNT) {
        sum = sum + rawData[rawData.length - 1 - i];
        i++;
    }
    const average = sum / (i + 1);
    const lastValue = rawData.length > 0 ? rawData[rawData.length - 1] : null;
    // Value is not greater than 200 and is within maxDiff of the average of the last AVERAGE_MAX_COUNT or the last recorded value
    const validValue = value < 200
        //&& (!lastValue || value < lastValue) // prevents backtracking, but actually not necessary + makes the graph less responsive
        && (!lastValue || Math.abs(average - value) < maxDiff || Math.abs(lastValue - value) < maxDiff);
    // If we've started but the sensor isn't picking up anything, push a data point at the start.
    if (startedReading && !lastValue && !validValue) {
        playerData.push(
            {
                year: lg.ptA.x,
                value: lg.ptA.y
            });
    }
    if (validValue && startedReading) {
        rawData.push(value);
        var startValue = playerData.length > 0 ? rawData[0] : value;
        playerData.push(
            {
                year: remap(Date.now(), [startTime, startTime + (timeLimit * 1000)], yearRange),
                value: remap(value, [startValue, startValue - targetRealDist], [lg.ptA.y, lg.ptB.y])
            });
        updateGraph();
    }
}

/**
 * @name remap
 * Interpolates a value between a range and remaps it to a new range. Used to map real values (time in milliseconds and distance traveled in inches) to graph values (time in years and change in temp)
 * @param  value the raw value
 * @param range the range of the raw value
 * @param targetRange the range of the target value
 */
function remap(value, range, targetRange) {
    return (value - range[0]) / (range[1] - range[0]) * (targetRange[1] - targetRange[0]) + targetRange[0];
}

function startReading() {
    startedReading = true;
}

function stopReading() {
    startedReading = false;
}

function clearPlayerData() {
    playerData = [];
    rawData = [];
}

/**
 * @name writeToStream
 * Gets a writer from the output stream and send the lines to the micro:bit.
 * @param  {...string} lines lines to send to the micro:bit
 */
function writeToStream(...lines) {
    // Write to output stream
    const writer = outputStream.getWriter();
    lines.forEach((line) => {
        console.log('[SEND]', line);
        writer.write(line + '\n');
    });
    writer.releaseLock();
}


/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.container = '';
    }

    transform(chunk, controller) {
        // Handle incoming chunk
        this.container += chunk;
        const lines = this.container.split('\r\n');
        this.container = lines.pop();
        lines.forEach(line => controller.enqueue(line));
    }

    flush(controller) {
        // Flush the stream.
        controller.enqueue(this.container);
    }
}