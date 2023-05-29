import * as d3 from 'https://cdn.skypack.dev/d3@7.1.1';
export function constructChord(lowerBound, upperBound) {
    const path = '/data/Citibike/daily_summary_df.csv'
    const width = 1200;
    const height = 1200;
    const outerRadius = Math.min(width, height) * 0.4 - 200;
    const innerRadius = outerRadius - 15;

    const boroughIdMap = {
        'MN': 1,
        'QN': 4,
        'BK': 3,
        'BX': 2,
        'SI': 5
    };

    return new Promise((resolve, reject) => {
        // Remove existing SVG
        d3.select('#chord svg').remove();

        d3.csv(path).then(data => {
                const filteredData = data.filter(d => new Date(d.starttime) < upperBound && new Date(d.starttime) > lowerBound);
                // Group the data by several columns and sum the count
                const groupedData = d3.group(filteredData, d => `${d.start_neighborhood_id}-${d.end_neighborhood_id}-${d.end_borough_id}-${d.start_borough_id}`);
                const aggregatedData = Array.from(groupedData, ([key, value]) => ({
                    start_neighborhood_id: value[0].start_neighborhood_id,
                    end_neighborhood_id: value[0].end_neighborhood_id,
                    end_borough_id: value[0].end_borough_id,
                    start_borough_id: value[0].start_borough_id,
                    count: d3.sum(value, d => d.count),
                }));

                // Sort the data alphabetically by start_neighborhood_id
                aggregatedData.sort((a, b) => a.start_neighborhood_id.toString().substring(0, 2).localeCompare(b.start_neighborhood_id.toString().substring(0, 2)));

                const colorByBorough = d3.scaleOrdinal()
                    .domain(['MN', 'BK', 'QN', 'BX', 'SI'])
                    .range(['#0077B6', '#FFB347', '#FF7F7F', '#58508D', '#00CC99']);

                // Generate a matrix where each element represents the count of trips between two locations
                const locations = Array.from(new Set(aggregatedData.map(d => d.start_neighborhood_id).concat(aggregatedData.map(d => d.end_neighborhood_id))));
                const matrix = Array(locations.length).fill().map(() => Array(locations.length).fill(0));

                aggregatedData.forEach(d => {
                    const i = locations.indexOf(d.start_neighborhood_id);
                    const j = locations.indexOf(d.end_neighborhood_id);
                    matrix[i][j] += d.count;
                });

                // Create the chord diagram
                const chord = d3.chord()
                    .padAngle(0.05)
                    .sortSubgroups(d3.descending);

                const svg = d3.select('#chord')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                const arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);

                const ribbon = d3.ribbon()
                    .radius(innerRadius);

                const chords = chord(matrix);

                const group = svg.append("g")
                    .selectAll("g")
                    .data(chords.groups)
                    .join("g");

                var id_to_name = new Map();

                // load a file called id_to_name.csv
                d3.csv('/Data/Citibike/id_to_name.csv').then(data => {
                    data.map(d => {
                        id_to_name.set(d.id, d.name);
                    });


                    // append a text element to the group for each data point
                    group.append("text")
                        .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
                        .attr("dy", "0.35em")
                        .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
                        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
                        .text(d => id_to_name.get(locations[d.index]));
                });


                group.append("title")
                    .text(d => `${id_to_name.get(locations[d.index])} (${d3.sum(matrix[d.index])} trips)`);

                //arc
                group.append("path")
                    .attr("fill", d => colorByBorough(locations[d.index].toString().substring(0, 2)))
                    .attr("d", arc)
                    .classed("group-path", true)
                    .attr("data-group-index", d => d.index)
                    .attr("data-borough", d => locations[d.index].toString().substring(0, 2)) // Add `data-borough` attribute
                    .on("mouseover", function (event, d) {
                        // Change color of the selected group path and outgoing chords
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", "#ccc");
                        d3.selectAll(`.ribbon-path[data-source-index="${d.index}"], .group-path[data-group-index="${d.index}"], .ribbon-path[data-target-index="${d.index}"]`)
                            .attr("fill", colorByBorough(locations[d.index].toString().substring(0, 2)));
                        // Show tooltip with count
                        const tooltip = d3.select("#tooltip");
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html(`Trips: ${d3.sum(matrix[d.index])}`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function (event, d) {
                        // Change color back to original
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", d => {
                                if (d.source) {
                                    return colorByBorough(locations[d.source.index].toString().substring(0, 2));
                                }
                                return colorByBorough(locations[d.index].toString().substring(0, 2));
                            });
                        // Hide tooltip
                        const tooltip = d3.select("#tooltip");
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    }).on("click", function (event, d) {
                    // change value of div with id chord_starting_neighbour_id and chord_ending_neighbour_id
                    document.getElementById("chord_starting_neighbour_id").value = NaN;
                    document.getElementById("chord_ending_neighbour_id").value = NaN;
                    document.getElementById("chord_starting_borough_name").value = boroughIdMap[locations[d.index].toString().substring(0, 2)];
                    document.getElementById("chart_param").dispatchEvent(new Event('change'));
                });

                // ribbon
                svg.append("g")
                    .attr("fill-opacity", 0.75)
                    .selectAll("path")
                    .data(chords)
                    .join("path")
                    .attr("fill", d => colorByBorough(locations[d.source.index].toString().substring(0, 2)))
                    .attr("d", ribbon)
                    .classed("ribbon-path", true)
                    .attr("data-source-index", d => d.source.index)
                    .attr("data-target-index", d => d.target.index)
                    .attr("data-borough", d => locations[d.source.index].toString().substring(0, 2)) // Add `data-borough` attribute
                    .on("mouseover", function (event, d) {
                        // Show tooltip with count
                        const tooltip = d3.select("#tooltip");
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html(`From: ${id_to_name.get(locations[d.source.index])} <br> To: ${id_to_name.get(locations[d.target.index])} <br> Trips: ${d.source.value}`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px");
                        // Change color of the selected group path and outgoing chords
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", "#ccc");
                        d3.selectAll(`.group-path[data-group-index="${d.source.index}"], .ribbon-path[data-target-index="${d.index}"]`)
                            .attr("fill", colorByBorough(locations[d.source.index].toString().substring(0, 2)));
                        // Change color of d
                        d3.select(this)
                            .attr("fill", colorByBorough(locations[d.source.index].toString().substring(0, 2)));
                    })
                    .on("mouseout", function (event, d) {
                        // Hide tooltip
                        const tooltip = d3.select("#tooltip");
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                        // Change color back to original
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", d => {
                                if (d.source) {
                                    return colorByBorough(locations[d.source.index].toString().substring(0, 2));
                                }
                                return colorByBorough(locations[d.index].toString().substring(0, 2));
                            });
                    }).on("click", function (event, d) {

                        // change value of div with id chord_starting_neighbour_id and chord_ending_neighbour_id
                        document.getElementById("chord_starting_neighbour_id").value = locations[d.source.index];
                        document.getElementById("chord_ending_neighbour_id").value = locations[d.target.index];
                        document.getElementById("chord_starting_borough_name").value = NaN;
                        document.getElementById("chart_param").dispatchEvent(new Event('change'))
                    }
                );

                // Add legend
                const legendWidth = 150;
                const legendHeight = 140;

                // Add grey background
                svg.append('rect')
                    .attr('width', legendWidth)
                    .attr('height', legendHeight)
                    .attr('rx', 10)
                    .attr('ry', 10)
                    .attr('fill', '#f0f0f0')
                    // put it in the right top corner
                    .attr('transform', `translate(${-(width / 2 - legendWidth - 20)}, ${-height / 2 + 20})`)


            // Add a group element for each borough
                const legend = svg.append('g')
                    .attr('transform', `translate(${-(width / 2 - legendWidth - 45)}, ${-height / 2 + 45})`)
                    .selectAll('g')
                    .data(colorByBorough.domain())
                    .join('g')
                    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

                // Add mouseover and mouseout events to the legend groups
                legend.on("mouseover", function (event, d) {
                    // Change color of the selected group path and outgoing chords
                    d3.selectAll(".group-path, .ribbon-path")
                        .attr("fill", "#ccc");
                    d3.selectAll(`.group-path[data-group-index][data-borough="${d}"], .ribbon-path[data-source-index][data-borough="${d}"], .ribbon-path[data-target-index][data-borough="${d}"]`)
                        .attr("fill", colorByBorough(d));
                })
                    .on("mouseout", function (event, d) {
                        // Change color back to original
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", d => {
                                if (d.source) {
                                    return colorByBorough(locations[d.source.index].toString().substring(0, 2));
                                }
                                return colorByBorough(locations[d.index].toString().substring(0, 2));
                            });
                    });

                // Add a colored square to each group
                legend.append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', colorByBorough);

                // Add the name of each borough to each group
                legend.append('text')
                    .attr('x', 20)
                    .attr('y', 6)
                    .text(d => {
                        switch (d) {
                            case 'MN':
                                return 'Manhattan';
                            case 'BK':
                                return 'Brooklyn';
                            case 'QN':
                                return 'Queens';
                            case 'BX':
                                return 'Bronx';
                            case 'SI':
                                return 'Staten Island';
                        }
                    })
                    .on("mouseover", function (event, d) {
                        // Change color of the selected group path and outgoing chords
                        let borough_id = boroughIdMap[d];

                        const parentGroup = this.parentNode;
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", "#ccc");
                        d3.selectAll(`.group-path[data-group-index][data-borough="${d}"], .ribbon-path[data-source-index][data-borough="${d}"], .ribbon-path[data-target-index][data-borough="${d}"]`)
                            .attr("fill", colorByBorough(borough_id));
                    })
                    .on("mouseout", function (event, d) {
                        // Change color back to original
                        const parentGroup = this.parentNode;
                        d3.selectAll(".group-path, .ribbon-path")
                            .attr("fill", d => {
                                if (d.source) {
                                    return colorByBorough(locations[d.source.index].toString().substring(0, 2));
                                }
                                return colorByBorough(locations[d.index].toString().substring(0, 2));
                            });
                    })
                ;
                resolve();
            }
        );
    });

}


const loadingChordDiv = document.getElementById('loading-chord');
export function showLoadingChord() {
    loadingChordDiv.style.display = 'block';
}

export function hideLoadingChord() {
    loadingChordDiv.style.display = 'none';
}