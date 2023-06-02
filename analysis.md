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
  Select the year to update the graphs below:
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
    <p style="text-align: justify;">
      As we delve into our first visualization, the choropleth map, we are immediately struck by the vibrant patchwork of colors representing the different boroughs and neighborhoods of New York City. Each color corresponds to a specific range of bike usage, painting a vivid picture of the city's biking landscape.
      <br><br>
      The map reveals a fascinating pattern of bike usage across the city. The largest hues, signifying the highest bike usage, are concentrated in Manhattan and parts of Brooklyn. This is not surprising given the boroughs' bustling nature, filled with offices, restaurants, parks, and cultural institutions that attract both residents and tourists alike. The bike system here seems to be an integral part of the urban fabric, facilitating short commutes and offering an eco-friendly alternative to cars and public transport.
      <br><br>
      However, as we move further away from these central boroughs, the colors on the map start to be missing, indicating lower bike usage. The outer boroughs such as Queens and parts of the Bronx show a stark contrast to the bustling bike activity in Manhattan and Brooklyn. This could be attributed to several factors such as longer commuting distances, less developed biking infrastructure, or a lower density of bike stations. The popular bike-sharing program has not expanded its services to include Staten Island - as a result, residents and visitors to Staten Island do not have access to the convenience and benefits offered by Citi Bike stations, such as the ability to rent and return bicycles at designated locations within the city
    </p>
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
    <p style="text-align: justify;">
      As we transition from the choropleth map to the time series line chart, we continue our journey through the ebbs and flows of New York City's bike usage. This chart, much like a heartbeat monitor, captures the city's pulse, its rhythm, and its response to the changing seasons and significant events.
      <br><br>
      The line chart tells a tale of the city's resilience and adaptability. As the summer months approach, the line ascends, mirroring the increase in bike usage. The city seems to come alive, with New Yorkers embracing the warm weather and the freedom of biking through the city's streets and parks. The chart becomes a visual symphony of peaks, each representing a day of high bike usage, a testament to the city's vibrant biking culture.
      <br><br>
      However, as the winter months set in, the line descends, reflecting the drop in bike usage. The city's biking activity slows down, mirroring the city's hibernation during the cold weather. Despite this, the line never flatlines, indicating that even in the harshest winter, there are still New Yorkers who choose to bike, a testament to their resilience and commitment to sustainable transportation.
      <br><br>
      The line chart also captures the city's response to significant events. In March 2020, when COVID-19 was officially declared a pandemic, there is a sharp drop in bike usage. The line dips, mirroring the city's pause as offices shut down and New Yorkers retreated indoors. However, this dip is short-lived. From April 2020, the line begins to ascend again, reflecting a steady increase in bike usage. This rise could be attributed to New Yorkers seeking outdoor activities during lockdown or opting for bikes as a safer alternative to public transport. The line continues to rise until the end of the year, despite a new COVID-19 wave hitting the USA, underscoring the city's resilience and adaptability.
      <br><br>
      In conclusion, the choropleth map and the time series line chart together weave a compelling narrative of New York City's bike usage. They uncover the spatial and temporal patterns of bike usage, highlight the disparities across different boroughs, and underscore the bike system's role in the city's socio-cultural events and its response to crises. As we delve deeper into our analysis, we will continue to explore these patterns, their driving factors, and their implications for the city's transportation policies. This journey through data is not just an analysis, but a testament to the city's resilience, adaptability, and commitment to sustainable transportation.
    </p>
    <!---->
    <!---->
    <!---->
    <!-- MAP -->
    <h1 class="titlePage">BOROUGH MAP OF NEW YORK</h1>
    <div id="map"></div>
    <p style="text-align: justify;">
      As we move on to our third visualization, the intensity map, we find ourselves immersed in a sea of data points, each representing a bike trip. This map, unlike the previous two, focuses on the origin of these trips, providing a granular view of bike usage at the neighborhood level.
      <br><br>
      The intensity map is akin to a starry night sky, with each point of light representing a bike trip. The darkest clusters, signifying the highest concentration of departures, are located in the southern part of Manhattan. This area, known for its bustling commercial and cultural hubs, seems to be the heart of the city's bike system, pulsating with bike trips throughout the day. This high usage could be attributed to several factors. Firstly, the density of bike stations in this area is higher than in other parts of the city, offering residents easy access to bikes. Secondly, the area's mixed-use nature, with its blend of offices, restaurants, shops, and cultural institutions, encourages short, frequent bike trips.
      <br><br>
      Adjacent to this vibrant heart, we see other intense clusters in the northern part of Brooklyn and the western part of Queens. These neighborhoods, though not as densely populated as Manhattan, show a high level of bike usage. This could be due to their proximity to Manhattan, making biking a convenient option for commuting. Additionally, these neighborhoods have seen significant urban development in recent years, with new bike lanes and bike-friendly policies encouraging residents to choose biking over other modes of transportation.
      <br><br>
      However, the intensity map also uncovers areas of subdued activity, represented by darker shades. These areas, predominantly in the outer boroughs, present a stark contrast to the vibrant biking activity in Manhattan, Brooklyn, and Queens. The reasons behind this disparity could be multifaceted and complex.
    </p>
    <ul>
      <li>One potential explanation could be the demographic composition of these areas. They might be home to a larger proportion of families with young children or elderly residents, groups that might not use bikes as frequently. Alternatively, these areas might have a higher concentration of residents who work from home or have jobs outside the city, reducing the need for daily commuting.</li>
      <li>Another factor could be the nature of the neighborhoods themselves. Areas with a higher concentration of residential buildings, as opposed to commercial or mixed-use areas, might see less bike usage simply because residents do not need to travel far for work or leisure.</li>
      <li>Lastly, the local culture and perception of biking could also play a role. In neighborhoods where biking is not seen as a common or desirable mode of transportation, residents might be less likely to use the city's bike system.</li>
    </ul>
    <p style="text-align: justify;">
      In conclusion, the intensity map adds another layer to our understanding of New York City's bike usage. It highlights the disparities in bike usage at the neighborhood level, revealing patterns that are shaped by a complex interplay of factors such as urban development, biking infrastructure, and proximity to commercial hubs. As we continue our analysis, we will delve deeper into these patterns, exploring their implications for the city's transportation policies and strategies.
    </p>
    <!---->
    <!---->
    <!---->
    <!-- TRAFFIC -->
    <h1 class="titlePage">TRAFFIC ANALYSIS</h1>
    <div id="radial-chart"></div>
    <div id="tooltip_radial"></div>
    <p style="text-align: justify;">
      Exploring the radial chart of daily average traffic by month for the above selected year, we can observe intriguing patterns emerging from the hustle and traffic jam of New York City. The chart, representing automatic traffic measurements taken from various places around the city, shows two notable peaks in traffic: early summer or spring (May/June) and fall (October/November).
      <br><br>
      The reasons for these peaks in traffic could be attributed to several factors, both seasonal and cultural. 
    </p>
    <ul>
      <li><b>Seasonal Factors:</b> The two periods, early summer and fall, are characterized by milder weather conditions in New York City, making them favorable for residents and tourists alike to be out and about. The pleasant weather could encourage more people to use their own vehicles or public transportation, leading to an increase in traffic. Additionally, these periods are not typically associated with major holiday travel, unlike the summer and winter holidays, so the city's residents are likely to be home and contributing to daily traffic.</li>
      <br>
      <li><b>Tourism:</b> These periods, particularly early summer and fall, are popular times for tourism in New York. The city’s parks are in full bloom in May and June, and the fall foliage in October and November is a sight to behold. Tourists often flock to the city during these times, increasing traffic on the city's roads.</li>
      <br>
      <li><b>Cultural and City Events:</b> New York City often hosts numerous cultural, sports, and entertainment events during these months, which could lead to an increase in traffic. The beginning of summer signals the opening of numerous outdoor events and concerts, and the fall season often sees various art and cultural festivals, parades, and sports events, including the NYC Marathon in November.</li>
      <br>
      <li><b>Academic Calendar:</b> Another consideration is the academic calendar. In May and June, there are graduations and end-of-school activities. In the fall, students return to school and college, which might contribute to increased traffic as families get back to their regular routines.</li>
    </ul>
    <br>
    <p style="text-align: justify;">
      In conclusion, the radial chart of daily average traffic provides us with a unique perspective on the city's traffic patterns. While the reasons behind these patterns might be multifaceted and complex, they reflect the city's dynamic nature and the many factors that make New York City a hub of activity throughout the year. Understanding these patterns is crucial for planning transportation policies and strategies and for improving the city's traffic management systems.
    </p>
    <h3 class="titlePage">Conclusion</h3>
    <p style="text-align: justify;">
    In synthesizing the insights derived from our data exploration, we can identify potential avenues for optimizing bike-sharing systems and developing innovative business strategies in New York City. 
    The visualizations have pinpointed areas of high bike usage, revealing the current strongholds of bike-sharing services. Leveraging this information, bike-sharing companies could focus on maximizing their service efficiency in these high-traffic areas. Possible strategies could include refining bike redistribution algorithms to meet demand during peak hours or experimenting with dynamic pricing models.
    <br><br>
    Conversely, the areas showing lower bike usage represent untapped markets with potential for growth. Initiatives aimed at increasing the attractiveness of bike-sharing, such as community outreach programs, collaborations with local businesses, or infrastructural improvements could help spur demand. Pilot programs testing these initiatives could be launched to measure impact and feasibility.
    <br><br>
    Seasonal traffic variations highlight opportunities for timely marketing campaigns and promotions. For instance, during periods of peak traffic, companies could promote bike-sharing as a solution to avoid traffic congestion and reduce commute times. In off-peak periods, customer loyalty programs or special discounts could be used to maintain user engagement and revenue.
    <br><br>
    Furthermore, aligning marketing and growth strategies with local events, cultural festivals, and academic calendars could help reach wider audiences. Partnerships with event organizers, tourism boards, and educational institutions could open new avenues for promoting bike-sharing and fostering a cycling-friendly culture in the city.
    <br><br>
    Finally, the data can guide resource allocation for maintenance and service improvement. Regular upkeep, station functionality, and high-quality customer service are essential, particularly during peak usage periods.
    <br><br>
    In conclusion, the patterns unearthed through these data visualizations offer a wealth of strategic insights. Harnessing these insights can help bike-sharing companies better serve their users, maximize efficiency, tap into new markets, and ultimately, contribute to a more sustainable and accessible urban transportation landscape in New York City.
    </p>
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
          if (year === 2019) {
            option.selected = true; // Set 2019 as the default value
          }
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