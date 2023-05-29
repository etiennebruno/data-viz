import * as d3 from 'https://cdn.skypack.dev/d3@7.1.1';

export function plotDayData(year, start_neighborhood_id, end_neighborhood_id, start_borough_id) {
    const filePath = `../data/Citibike/Detailed/detailed_day_df_${year}.csv`;
    // remove any existing chart
    document.getElementById("chart").innerHTML = "";

    return new Promise((resolve, reject) => {
        d3.csv(filePath).then(data => {

            let formattedData = data.map((d) => ({
                count: parseInt(d.count),
                start_neighborhood_id: d.start_neighborhood_id,
                start_borough_id: parseInt(d.start_borough_id),
                end_borough_id: parseInt(d.end_borough_id),
                end_neighborhood_id: d.end_neighborhood_id,
                starttime: new Date(d.starttime),
            }));

            // if start_neighborhood_id is not null, filter the data
            if (start_neighborhood_id) {
                formattedData = formattedData.filter(d => d.start_neighborhood_id === start_neighborhood_id);
            }
            // if end_neighborhood_id is not null, filter the data
            if (end_neighborhood_id) {
                formattedData = formattedData.filter(d => d.end_neighborhood_id === end_neighborhood_id);
            }
            // if start_borough_id is not null, filter the data
            if (start_borough_id) {
                formattedData = formattedData.filter(d => +d.start_borough_id === +start_borough_id);
            }
            // set the hour to 0
            //formattedData.forEach(d => d.starttime.setHours(0, 0, 0, 0));

            // for each starttime sum the count
            const groupedData = d3.group(formattedData, d => d.starttime);

            const aggregatedData = Array.from(groupedData, ([key, value]) => ({
                x: key,
                y: d3.sum(value, d => d.count),
            }));

            aggregatedData.sort((a, b) => a.x - b.x);

            const chartConfig = {
                x: d => d.x,
                y: d => d.y,
                yLabel: "Number of Trips",
                width: 1500,
                height: 750,
                color: "steelblue",
                defined: d => d.y !== 0 || d.y !== null,
            };

            const chart = LineChart(aggregatedData, chartConfig);
            document.getElementById("chart").appendChild(chart);
            resolve();
        });
    });

}

function LineChart(data, {
    x = ([x]) => x,
    y = ([, y]) => y,
    defined,
    curve = d3.curveLinear,
    marginTop = 20,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 40,
    width = 640,
    height = 400,
    xType = d3.scaleUtc,
    xDomain,
    xRange = [marginLeft, width - marginRight],
    yType = d3.scaleLinear,
    yDomain,
    yRange = [height - marginBottom, marginTop],
    yFormat,
    yLabel,
    color = "currentColor",
    strokeLinecap = "round",
    strokeLinejoin = "round",
    strokeWidth = 1.5,
    strokeOpacity = 1,
} = {}) {

    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];

    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    const line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const defs = svg.append("defs");

    defs.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom);

    const chartArea = svg.append("g")
        .attr("class", "chartArea")
        .attr("clip-path", "url(#clip)");

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("class", "x axis")
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("class", "y axis")
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    chartArea.append("path")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", line(I));

    const brush = d3.brushX()
        .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
        .on("end", brushEnded);

    const brushArea = svg.append("g")
        .attr("class", "brushArea");

    const circleArea = svg.append("g")
        .attr("class", "circleArea");

    brushArea.call(brush);

    circleArea.selectAll(".dot")
        .data(data.filter((d, i) => D[i]))
        .join("circle")
        .attr("class", "dot")
        .attr("cx", (d, i) => xScale(X[i]))
        .attr("cy", (d, i) => yScale(Y[i]))
        .attr("r", 6)
        .attr("fill", color)
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .style("opacity", 0);

    //hoovering over the dots
    const tooltip = d3.select("#tooltip_linechart");

    circleArea.selectAll(".dot")
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1);
            tooltip.html(`Date: ${x(d).toLocaleDateString()}<br/>Time: ${x(d).toLocaleTimeString()}  <br/>Count: ${y(d)}`);
            d3.select(event.target).style("opacity", 1); // Set circle opacity to 1 on mouseover
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", (event) => {
            tooltip.style("opacity", 0);
            d3.select(event.target).style("opacity", 0); // Set circle opacity back to 0 on mouseout
        });



    function brushEnded(event) {
        if (!event.sourceEvent || !event.selection) return;

        const [x0, x1] = event.selection.map(d => xScale.invert(d));

        const filteredData = data.filter(d => x(d) >= x0 && x(d) <= x1);
        xDomain = d3.extent(filteredData, x);

        xScale.domain(xDomain);

        // Update the circle positions
        circleArea.selectAll(".dot")
            .attr("cx", (d, i) => xScale(X[i]));

        // Update the line path
        chartArea.select("path").attr("d", line(I));

        // Update the x-axis
        svg.select(".x.axis").call(xAxis);
    }

    return svg.node();
}


const loadingDayDiv = document.getElementById('loading-day');

export function showLoadingDay() {
    loadingDayDiv.style.display = 'block';
}

export function hideLoadingDay() {
    loadingDayDiv.style.display = 'none';
}