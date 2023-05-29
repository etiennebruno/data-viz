---
title: Analysis
layout: page
description: Analysis
bodyClass: page-about¨¨¨
---


<!-- HEAD-->
<html>
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <link rel="stylesheet" href="../styles.css" />
  </head>


<!-- YEAR SELECTION -->
  <body>
  <p style="text-align: justify;">
  Select the year to update the graph below:
  </p>
    <div id="controls">
      <label for="yearSelect">Year:</label>
      <select id="yearSelect" class="yearSelect"></select>
    </div>
    <!---->
    <!---->
    <!---->
    <!-- CHOROPLETH -->
    <h1 class="titlePage">CHOROPLETH</h1>
    <div id="loading-chord">
      <img src="../media/loading-spinner.gif" alt="Loading...">
    </div>
      <div id="chord"></div>
      <div id="tooltip"></div>
    <!---->
    <!---->
    <!---->
    <!-- TIME SERIES -->
    <h1 class="titlePage">TIME SERIES PLOT</h1>
    <div id="chart_param">
      <label for="chord_starting_neighbour_id">Starting Neighbour ID:</label>
      <select id="chord_starting_neighbour_id" class="chord_starting_neighbour_id"></select> <br>
      <label for="chord_ending_neighbour_id">Ending Neighbour ID:</label>
      <select id="chord_ending_neighbour_id" class="chord_ending_neighbour_id"></select> <br>
      <label for="chord_starting_borough_name">Starting Borough Name:</label>
      <select id="chord_starting_borough_name" class="chord_starting_borough_name"></select> <br>
    </div>
    <div id="loading-day">
      <img src="../media/loading-spinner.gif" alt="Loading...">
    </div>
      <div id="chart"></div>
      <div id="tooltip_linechart"></div>
    <!---->
    <!---->
    <!---->
    <!-- MAP -->
    <h1 class="titlePage">BOROUGH MAP OF NEW YORK</h1>
    <div id="map"></div>
    <!---->
    <!---->
    <!---->
    <!-- TRAFFIC -->
    <h1 class="titlePage">TRAFFIC ANALYSIS</h1>
    <div id="radial-chart"></div>
    <div id="tooltip_radial"></div>
    <!---->
    <!---->
    <!---->
    <!-- IMPORTS SCRIPTS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <script src="../js/map.js"></script>
    <script type='module'>
        import { constructChord, showLoadingChord, hideLoadingChord } from '../js/chord.js';
        import { plotDayData, showLoadingDay, hideLoadingDay} from '../js/linechart.js';
        import { createRadialChart } from '../js/radialchart.js';
        import { createChart } from '../js/barchart.js';
        // Define constants references to HTML elements
        const yearSelect = document.getElementById('yearSelect');
        const chordStartingNeighbourIdSelect = document.getElementById('chord_starting_neighbour_id');
        const chordEndingNeighbourIdSelect = document.getElementById('chord_ending_neighbour_id');
        const chordStartingBoroughNameSelect = document.getElementById('chord_starting_borough_name');
        const chartParam = document.getElementById('chart_param');
        // Define updates functions
        function updateChord() {
            const year = yearSelect.value;
            // first day of the year
            const startDate = new Date(year, 0, 1);
            // last day of the year
            const endDate = new Date(year, 11, 31);
            showLoadingChord();
            constructChord(startDate, endDate).finally(hideLoadingChord)
        }
        function updateLineChart() {
            const year = yearSelect.value;
            const startingNeighbourId = chordStartingNeighbourIdSelect.value;
            const endingNeighbourId = chordEndingNeighbourIdSelect.value;
            const startingBoroughName = chordStartingBoroughNameSelect.value;
            showLoadingDay();
            plotDayData(year, startingNeighbourId, endingNeighbourId, startingBoroughName).finally(hideLoadingDay);
        }
        function updateRadialChart() {
            const year = yearSelect.value;
            const path_radial = '../data/traffic/monthly_volume/' + year + '_monthly.csv';
            createRadialChart(path_radial);
        }
        function updateBarChart() {
            createChart();
        }
        // Define updates functions
        async function populateNeighbourDropdowns() {
            const year = yearSelect.value;
            const path_csv = `../data/Citibike/mapping/mapping_year_${year}.csv`;
            // Create empty maps to store neighborhood IDs and boroughs
            let neighbourhoodMap = new Map();
            let boroughMap = new Map();
            await d3.csv(path_csv, function(data) {
                neighbourhoodMap.set(data['neighborhood_id'], data['name']);
                boroughMap.set(+data['borough_id'], data['borough']);
            });
            // Empty the dropdowns
            chordStartingNeighbourIdSelect.innerHTML = '';
            chordEndingNeighbourIdSelect.innerHTML = '';
            chordStartingBoroughNameSelect.innerHTML = '';
            // Create default option
            const defaultOption = document.createElement("option");
            defaultOption.value = '';
            defaultOption.text = 'Select...';
            // Add default option to the dropdowns
            chordStartingNeighbourIdSelect.appendChild(defaultOption.cloneNode(true));
            chordEndingNeighbourIdSelect.appendChild(defaultOption.cloneNode(true));
            chordStartingBoroughNameSelect.appendChild(defaultOption.cloneNode(true));
            // Populate the neighbourhood dropdowns
            for (let [id, name] of neighbourhoodMap) {
              const option1 = document.createElement("option");
              option1.value = id;
              option1.text = name;
              chordStartingNeighbourIdSelect.appendChild(option1);
              const option2 = option1.cloneNode(true);
              chordEndingNeighbourIdSelect.appendChild(option2);
            }
            // Populate the borough dropdown
            for (let [id, name] of boroughMap) {
              const option = document.createElement("option");
              option.value = id;
              option.text = name;
              chordStartingBoroughNameSelect.appendChild(option);
            }
        }
        // Populate the dropdown menu with year options between 2014 and 2020
        for (let year = 2014; year <= 2020; year++) {
          const option = document.createElement("option");
          option.value = year;
          option.text = year;
          yearSelect.appendChild(option);
        }
        // Asynchronous function to update all charts when year changes
        async function updateCharts() {
            updateLineChart();
            updateChord();
            updateMap();
            updateRadialChart();
            populateNeighbourDropdowns();
            updateBarChart();
        }
      // Update charts when year changes
      yearSelect.addEventListener('change', updateCharts);
      chartParam.addEventListener('change', updateLineChart);
      // Initial update
      updateCharts();
      </script>
  </body>
</html>