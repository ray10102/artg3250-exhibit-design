/*
  ARTG3250 Ambient Display

  Streams distance sensor data over serial and controls a set of LEDs based on serial input.
*/

const int trigPin = 11;           //connects to the trigger pin on the distance sensor
const int echoPin = 12;           //connects to the echo pin on the distance sensor

int led[] = {4, 5, 6, 7}; //red is led[0], yellow is led[1], green is led[2], blue is led[3]

float distance = 0;               //stores the distance measured by the distance sensor
char incomingChar = 0;            // for incoming serial data

void setup()
{
  Serial.begin (9600);        //set up a serial connection with the computer

  pinMode(trigPin, OUTPUT);   //the trigger pin will output pulses of electricity
  pinMode(echoPin, INPUT);    //the echo pin will measure the duration of pulses coming back from the distance sensor

  //set all of the LED pins to output
  pinMode(led[0], OUTPUT);
  pinMode(led[1], OUTPUT);
  pinMode(led[2], OUTPUT);
  pinMode(led[3], OUTPUT);
}

void loop() {
  distance = getDistance();   //variable to store the distance measured by the sensor

  Serial.print(distance);     //print the distance that was measured
  Serial.println("");      //print units and add new line                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingChar = Serial.read();
    updateLEDs();

    // For debugging:
    // Serial.print("I received: ");
    // Serial.println(incomingChar);
  }

  delay(50);      //delay 50ms between each reading
}

//------------------FUNCTIONS-------------------------------

void updateLEDs() {
  // Each letter signals a different LED to be turned on. See index.js for details.
  if (incomingChar == 'A') {
    flashLED(0);
  } else if (incomingChar == 'B') {
    flashLED(1);
  } else if (incomingChar == 'C') {
    flashLED(2);
  } else if (incomingChar == 'D') { 
    flashLED(3);
  } else if (incomingChar == 'X') {
    allLEDsOff();
  }
}

void flashLED (int ledNumber) {
  allLEDsOff();
  digitalWrite(led[ledNumber], HIGH);
}

void allLEDsOff () {
  //turn all the LEDs off
  digitalWrite(led[0], LOW);
  digitalWrite(led[1], LOW);
  digitalWrite(led[2], LOW);
  digitalWrite(led[3], LOW);
}

//RETURNS THE DISTANCE MEASURED BY THE HC-SR04 DISTANCE SENSOR
float getDistance()
{
  float echoTime;                   //variable to store the time it takes for a ping to bounce off an object
  float calculatedDistance;         //variable to store the distance calculated from the echo time

  //send out an ultrasonic pulse that's 10ms long
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  echoTime = pulseIn(echoPin, HIGH);      //use the pulsein command to see how long it takes for the
                                          //pulse to bounce back to the sensor

  calculatedDistance = echoTime / 148.0;  //calculate the distance of the object that reflected the pulse (half the bounce time multiplied by the speed of sound)

  return calculatedDistance;              //send back the distance that was calculated
}
