# How fast does global temperature change?
This project was created by Raymond Huang for ARTG 3250: Physical Computing at Northeastern University. This prototype seeks primarily to explore the interaction loop, rather than the exact content of the exhibit (in other words, I am not a copy writer and have no experience writing educational science content for children).
## Designer's statement
This project conveys the pace of global temperature change throughout various periods of Earth's history, ranging from "pre-civillization" through the industrial era to the present day. Inspired partially by the Museum of Science's "Sneaking Corridor" exhibit, in which the user must advance slowly down a hall without triggering the bird's alarm, this exhibit prompts the user to encode the pace of change with the movement of their bodies down a corridor, mapping change in temperature to distance (±0.1°C/8 in) and years to seconds (200 years/second). The target audience is children (8 - 16) who might be more engaged by a kinesthetic experience and can interpret line graphs. The goal of this exhibit is to convey that while Earth's climate has always been in flux, the speed of post-industrial change is alarming and demands immediate recourse. Pitfalls of this exhibit include the oversimplification of temperature change and potential conflation of regional and global temperature (but these nuances can be conveyed through supplementary signage or other in-experience verbage). For example, one of the time periods that inspired this exhibit was the Medieval Warm Period, but I found that this climate phenomenon was limited to Europe and that global temperature during this time actually decreased. This may be an excellent domain for a different exhibit, where temperature change is explored on a regional scale.
## Data Sources
 [2° Institute Temperature Record](https://www.temperaturerecord.org/)
 
 ["What's Really Warming the Earth" Bloomberg Report](https://www.bloomberg.com/graphics/2015-whats-warming-the-world/)
## Circuit diagram
![Circuit diagram](/images/ExhibitDesignTinkerCAD_RaymondHuang.png)
## Exhibit mockup
![Exhibit mockup](/images/ExhibitMockup.png)
## Demo Video
![Demo video](/videos/DemoVideo.mp4)
## To Run
This project must be run in Google Chrome 78+, as it relies on experimental Chrome features, notably the Web Serial API. If your browser does not support the required features, the homepage will inform you.

This project also accesses local files directly from the browser, which is not secure but is the simplest and fastest way to get it up and running without setting up a local server. An alternative way to run locally would be through a Python SimpleHTTPServer, but this method only requies you to install Chrome.

1. Install Google Chrome 78+.

2. Upload `Distance_Sensor\Distance_Sensor.ino` to your SparkFun RedBoard.

### On Windows
3. Run `"C:\PathToChrome\chrome.exe" --allow-file-access-from-files` to launch Chrome with insecure file access.

On my machine, this file path is `"C:\Program Files\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files`

4. Open `index.html` in this browser. Example: `file:///C:/Users/myUsername/Desktop/ambient-display/index.html`

5. Click the "Connect" button and select the COM port your RedBoard is connected to.

6. Follow the exhibit instructions!

### On Mac
3. Run `-a "Google Chrome" -n --args --allow-file-access-from-files` (N.B. I have no tried this, as I built this prototype in Windows)

4. Open `index.html` in this browser. Example: `file:///C:/Users/myUsername/Desktop/ambient-display/index.html`

5. Click the "Connect" button and select the COM port your RedBoard is connected to.

6. Follow the exhibit instructions!