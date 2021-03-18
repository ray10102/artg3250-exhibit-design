// The goal distance the player should move in inches (really delta distance, since the player's start position is used to calibrate)
let targetRealDist = null;

const INCHES_PER_DEGREE = 80; // 8 inches per .01 degree

// Assumes tempRange has been set
function setTargetDist() {
    targetRealDist = Math.abs(tempRange[1] - tempRange[0]) * INCHES_PER_DEGREE;
}