async function createChart() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 0, bottom: 30, left: 40};

    const csvPath = '../data/traffic/hourly_volume/2014_hourly_Bronx.csv';
    const data = await d3.csv(csvPath, ({HH, avg_traffic}) => ({name: +HH, value: +avg_traffic}));
    data.sort((a, b) => b.value - a.value);
    console.log(data)

    const x = d3.scaleBand().domain(data.map(d => d.name)).range([margin.left, width - margin.right]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).nice().range([height - margin.bottom, margin.top]);

    const xAxis = g => g.attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickSizeOuter(0));
    const yAxis = g => g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y)).call(g => g.select(".domain").remove());

    function zoom(svg) {
        const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
        svg.call(d3.zoom().scaleExtent([1, 8]).translateExtent(extent).extent(extent).on("zoom", zoomed));

        function zoomed(event) {
            x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
            svg.selectAll(".bars rect").attr("x", d => x(d.name)).attr("width", x.bandwidth());
            svg.selectAll(".x-axis").call(xAxis);
        }
    }

    // Clear out old chart if it exists
    d3.select("#bar-chart").selectAll("*").remove();

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .call(zoom);

    svg.append("g")
        .attr("class", "bars")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());

    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    return svg.node();
}

// Export function
export {createChart};