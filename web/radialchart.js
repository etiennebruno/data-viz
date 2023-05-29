async function createRadialChart(filePath) {
    // Define constants
    let width = 1200,
        height = width,
        innerRadius = 180,
        outerRadius = Math.min(width, height) / 2;

    // Define color scale
    let baseColors = {
        'Queens': '#FF7F7F', // red
        'Bronx': '#FFB347', // purple
        'Brooklyn': '#00CC99', // green
        'Manhattan': '#0077B6', // orange
        'Staten Island': '#58508D', // blue
    };

    // Use D3's csv function to load the CSV file
    let data = await d3.csv(filePath);

    // Convert necessary string fields to numbers
    data.forEach(function(d) {
        d.M = +d.M;
        d.avg_traffic = +d.avg_traffic;
    });

    let x = d3.scaleBand()
        .domain(data.map(d => d.M))
        .range([0, 2 * Math.PI])
        .align(0)

    let y = d3.scaleRadial()
        .domain([0, d3.max(data, d => d.avg_traffic)])
        .range([innerRadius, outerRadius])

    // Define color scale
    let color = d3.scaleOrdinal()
        .domain(Object.keys(baseColors))
        .range(Object.values(baseColors));

    let arc = d3.arc()
        .innerRadius(d => y(0))
        .outerRadius(d => y(d.avg_traffic))
        .startAngle(d => x(d.M))
        .endAngle(d => x(d.M) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius)

        // Clear out old chart if it exists
        d3.select("#radial-chart").selectAll("*").remove();

    let svg = d3.select("#radial-chart")
        .append("svg")
        .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("font-size", "30px")
        .style("font-family", "Avenir")

    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let xAxis = g => g
        .attr("text-anchor", "middle")
        .call(g => g.selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", d => `rotate(${((x(d.M) + x.bandwidth() / 2) * 180 / Math.PI - 90)}) translate(${innerRadius},0)`)
            .call(g => g.append("line")
                .attr("x2", -5)
                .attr("stroke", "#000"))
            .call(g => g.append("text")
                .attr("transform", d => (x(d.M) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90) translate(0,22)" : "rotate(-90) translate(0, -15)")
                .text(d => monthNames[d.M - 1])
                .attr("font-size", "12px")   // <-- change this value to the size you want
                .attr("font-family", "Avenir")));

    // Add the x-axis labels for the months
    svg.append("g")
        .call(xAxis);

    // Add title
    svg.append("text")
        .attr("x", 0)
        .attr("y", -height / 2 + 50)    // Adjust this value as needed to move the title up or down
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-family", "Avenir")
        .text("Radial Chart of Daily Average Traffic by Month for the Selected Year");



    let tooltip = d3.select('#tooltip');

svg.append("g")
    .selectAll("path")
    .data(data)
    .join("path")
    .attr("fill", d => color(d.Boro))
    .attr("d", arc)
    .on("click", function(event, d) {
        let tooltipDisplayed = d3.select(this).classed('tooltip-displayed');
        d3.selectAll('.tooltip-displayed').classed('tooltip-displayed', false);

        if (!tooltipDisplayed) {
            d3.select(this).classed('tooltip-displayed', true);

            tooltip.style('opacity', 1)
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`)
                .html(`Avg Daily Traffic: ${d.avg_traffic.toFixed(2)}`);
        } else {
            tooltip.style('opacity', 0);
        }
    });

    drawLegend(svg, color);


return svg.node();
}

function drawLegend(svg, color) {
    const legendRadius = 180 / 2; // adjust this if necessary

    const legend = svg.append("g")
        .attr("transform", `translate(${-legendRadius}, ${-legendRadius})`)
        .attr("class", "legend");

    const keys = color.domain();

    const legendSize = 20; // adjust this if necessary
    const padding = 10; // adjust this if necessary

    keys.forEach((key, index) => {
        legend.append("rect")
            .attr("x", legendRadius - legendSize * 2)
            .attr("y", index * (legendSize + padding))
            .attr("width", legendSize)
            .attr("height", legendSize)
            .style("fill", color(key));

        legend.append("text")
            .attr("x", legendRadius - legendSize * 2 + legendSize * 1.5)
            .attr("y", index * (legendSize + padding) + legendSize / 1.5)
            .text(key)
            .attr("font-size", "14px")
    });
}


// Export function for use in other files
export { createRadialChart };

