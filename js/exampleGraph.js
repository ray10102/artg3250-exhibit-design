// set the dimensions and margins of the graph
var exampleMargin = { top: 10, right: 30, bottom: 30, left: 60 },
    exampleWidth = 500 - exampleMargin.left - exampleMargin.right,
    exampleHeight = 300 - exampleMargin.top - exampleMargin.bottom;

// append the svg object to the body of the page
var exampleSvg = d3.select("#sampleViz")
    .append("svg")
    .attr("width", exampleWidth + exampleMargin.left + exampleMargin.right)
    .attr("height", exampleHeight + exampleMargin.top + exampleMargin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + exampleMargin.left + "," + exampleMargin.top + ")");

const MAX_FRAMES = 12;

var stepsPassed = 0;
let stepsLeft = MAX_FRAMES;
let graphInterval = null;

function startExampleAnimation() {
    stepsPassed = 0;
    stepsLeft = MAX_FRAMES;
    graphInterval = setInterval(() => {
        // The amount of time passed increments by one
        stepsPassed = stepsPassed += 1;
        stepsLeft = MAX_FRAMES - stepsPassed;

        if (stepsLeft <= 0) { // loop animation
            stepsPassed = 0;
            stepsLeft = MAX_FRAMES;
        }

        // Update the graph
        updateExampleGraph();
    }, 500);
}

function updateExampleGraph() {
    // Add the player line
    exampleSvg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .x(function (d) { return x(d.year); })
        .y(function (d) { return y(d.value); })
    );
}

function initExampleGraph() {
    //Read the data
    d3.csv("data/Industrial_To_Present.csv",
        function (d) {
            return { year: parseInt(d.year), value: parseFloat(d.value) }
        },
        function (data) {
            // Calculate linear regression
            var lg = calcLinear(data, "year", "value", d3.min(data, function (d) { return d.year }), d3.max(data, function (d) { return d.year }));

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return d.year; }))
                .range([0, exampleWidth]);
            exampleSvg.append("g") // g tag is a grouping tag for SVG elements
                .attr("transform", "translate(0," + exampleHeight + ")")
                .call(d3.axisBottom(x));

            // Add Y axis 
            var y = d3.scaleLinear()
                .domain([Math.min(d3.min(data, function (d) { return parseFloat(d.value); }), lg.ptA.y, lg.ptB.y), Math.max(d3.max(data, function (d) { return parseFloat(d.value); }), lg.ptA.y, lg.ptB.y)])
                .range([exampleHeight, 0]);
            exampleSvg.append("g")
                .call(d3.axisLeft(y));

            // Add the actual line
            exampleSvg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.year); })
                    .y(function (d) { return y(d.value); })
                );

            // Add the line of best fit
            exampleSvg.append("line")
                .attr("class", "regression")
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 1.5)
                .attr("stroke-dasharray", "10, 5")
                .attr("x1", x(lg.ptA.x))
                .attr("y1", y(lg.ptA.y))
                .attr("x2", x(lg.ptB.x))
                .attr("y2", y(lg.ptB.y));
        });
}