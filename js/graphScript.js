var selectedIndex = 0;
let lg; // Linear Regression

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 1200 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var dataFolder = "data/";
var CSVs = ["Younger_Dryas.csv", "Warming_Since_YD.csv", "EarlyMiddle_To_Industrial.csv", "Industrial_To_Present.csv"];

function selectCSV(i) {
  selectedIndex = i;
}

function updateGraph() {
  var x = d3.scaleLinear()
    .domain(yearRange)
    .range([0, width]);
  var y = d3.scaleLinear()
    .domain(tempRange)
    .range([height, 0]);
  // Add the player line
  svg.append("path")
    .datum(playerData)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year); })
      .y(function (d) { return y(d.value); })
    );
}

let yearRange = null;
let tempRange = null;

function initGraph() {
  svg.selectAll('*').remove();

  //Read the data
  d3.csv(dataFolder + CSVs[selectedIndex],
    function (d) {
      return { year: parseInt(d.year), value: parseFloat(d.value) }
    },
    function (data) {
      // Calculate linear regression
      lg = calcLinear(data, "year", "value", d3.min(data, function (d) { return d.year }), d3.max(data, function (d) { return d.year }));

      // Add X axis
      yearRange = d3.extent(data, function (d) { return d.year; });
      var x = d3.scaleLinear()
        .domain(yearRange)
        .range([0, width]);
      svg.append("g") // g tag is a grouping tag for SVG elements
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis 
      tempRange = [Math.min(d3.min(data, function (d) { return parseFloat(d.value); }), lg.ptA.y, lg.ptB.y), Math.max(d3.max(data, function (d) { return parseFloat(d.value); }), lg.ptA.y, lg.ptB.y)]
      var y = d3.scaleLinear()
        .domain(tempRange)
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add the actual line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d) { return x(d.year); })
          .y(function (d) { return y(d.value); })
        );

      // Add the line of best fit
      svg.append("line")
        .attr("class", "regression")
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "10, 5")
        .attr("x1", x(lg.ptA.x))
        .attr("y1", y(lg.ptA.y))
        .attr("x2", x(lg.ptB.x))
        .attr("y2", y(lg.ptB.y));

      setTimeLimit();
      setTargetDist();
      ready();
    });
}

// modified from https://bl.ocks.org/HarryStevens/be559bed98d662f69e68fc8a7e0ad097
// Calculate a linear regression from the data

// Takes 5 parameters:
// (1) Your data
// (2) The column of data plotted on your x-axis
// (3) The column of data plotted on your y-axis
// (4) The minimum value of your x-axis
// (5) The minimum value of your y-axis

// Returns an object with two points, where each point is an object with an x and y coordinate

function calcLinear(data, x, y, minX, maxX) {
  /////////
  //SLOPE//
  /////////

  // Let n = the number of data points
  var n = data.length;

  // Get just the points
  var pts = [];
  data.forEach(function (d, i) {
    var obj = {};
    obj.x = parseInt(d[x]);
    obj.y = parseFloat(d[y]);
    obj.mult = obj.x * obj.y;
    pts.push(obj);
  });

  // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
  // Let b equal the sum of all x-values times the sum of all y-values
  // Let c equal n times the sum of all squared x-values
  // Let d equal the squared sum of all x-values
  var sum = 0;
  var xSum = 0;
  var ySum = 0;
  var sumSq = 0;
  pts.forEach(function (pt) {
    sum = sum + pt.mult;
    xSum = xSum + pt.x;
    ySum = ySum + pt.y;
    sumSq = sumSq + (pt.x * pt.x);
  });
  var a = sum * n;
  var b = xSum * ySum;
  var c = sumSq * n;
  var d = xSum * xSum;

  // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
  // slope = m = (a - b) / (c - d)
  var m = (a - b) / (c - d);

  /////////////
  //INTERCEPT//
  /////////////

  // Let e equal the sum of all y-values
  var e = ySum;

  // Let f equal the slope times the sum of all x-values
  var f = m * xSum;

  // Plug the values you have calculated for e and f into the following equation for the y-intercept
  // y-intercept = b = (e - f) / n
  var b = (e - f) / n;

  // return an object of two points
  // each point is an object with an x and y coordinate
  return {
    ptA: {
      x: minX,
      y: m * minX + b
    },
    ptB: {
      y: m * maxX + b,
      x: maxX
    }
  }

}