
    // Create a simple base map with minimal details
    // Initialize a Leaflet map object, centered on the given latitude and longitude (New York City) and with the specified zoom level (12)
    const map = L.map("map").setView([40.7128, -74.0060], 10);

    // Add a tile layer to the map using Carto's Light basemap
    // This provides the background map with streets and other geographic features
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png", {
        // Attribution is a string that will be displayed in the bottom-right corner of the map to give credit to data providers
        attribution: '<a href="https://www.epfl.ch"> &copy; Grande Envergure</a>',
        // The maximum zoom level the tile layer should be available at
        maxZoom: 19,
        // Subdomains are used to distribute tile requests across multiple subdomains for better performance
        subdomains: "abcd",
    }).addTo(map); // Add the tile layer to the map

    // Define a function that takes a feature and returns a style object
    // This function will be used to style the GeoJSON polygons
    function style(feature) {
        return {
            fillColor: "blue", // Set the fill color of the polygon
            weight: 2, // Set the width of the polygon outline
            opacity: 1, // Set the opacity of the polygon outline
            color: "white", // Set the color of the polygon outline
            fillOpacity: 0.4 // Set the opacity of the polygon fill
        };
    }

    // Load the GeoJSON data using the Fetch API
    const boroughs = ['Queens', 'Bronx', 'Brooklyn', 'Manhattan', 'Staten Island'];

    // Get a reference to the yearSelect dropdown
    let yearSelect = document.getElementById("yearSelect");

    let geoJsonLayers = []; // Array to keep track of GeoJSON layers

    function updateMap() {
        // Remove existing layers before creating new ones
        geoJsonLayers.forEach(layer => map.removeLayer(layer));
        geoJsonLayers = [];
    
        // When the selected year changes, update selectedYear and refresh the map
        let selectedYear = yearSelect.value;
        boroughs.forEach(borough => {
            fetch(`../data/NYCData/boroughs/${selectedYear}_${borough}.geojson`)
                .then(response => response.json()) // Parse the response as JSON
                .then(data => {
                    // Find the maximum number of trips
                    const maxTrips = data.features.reduce((max, feature) => {
                        return Math.max(max, feature.properties.number_trips_from);
                    }, 0.1);
    
                    // Create a Leaflet GeoJSON layer using the parsed data and the specified style function
                    const geoJsonLayer = L.geoJSON(data, {
                        style: feature => getStyle(borough, feature.properties.number_trips_from, maxTrips),
                        onEachFeature: (feature, layer) => {
                            const {properties} = feature;
                            const popupContent = `
                            <strong>Borough:</strong> ${properties.boro_name}<br>
                            <strong>NTA Code:</strong> ${properties.ntacode}<br>
                            <strong>NTA Name:</strong> ${properties.ntaname}<br>
                            <strong>Number of Trips from:</strong> ${properties.number_trips_from}<br>
                            <strong>Average Duration (min):</strong> ${Number.parseFloat(properties.avg_duration_min).toFixed(2)}
                            `;
                            // Bind the popup to the layer
                            layer.bindPopup(popupContent);
                        }
                    });
    
                    geoJsonLayers.push(geoJsonLayer);
                    geoJsonLayer.addTo(map); // Add the GeoJSON layer to the map
                })
                .catch(error => console.error(`Error loading GeoJSON data for ${borough}:`, error)); // Log any errors that occur while loading the GeoJSON data
        });
    }    


    // STLYE OF THE BOROUGHS
    function getStyle(borough, number_trips_from, maxTrips) {
        // Calculate the opacity value (0.2 - 1) based on the number of trips
        const opacity = 0.2 + (number_trips_from / maxTrips) * 0.8;

        const baseColors = {
            'Queens': '#FF7F7F', // red
            'Bronx': '#FFB347', // purple
            'Brooklyn': '#00CC99', // green
            'Manhattan': '#0077B6', // orange
            'Staten Island': '#58508D', // blue
        };

        return {
            color: baseColors[borough] || '',
            fillColor: baseColors[borough] || '',
            fillOpacity: opacity
        };
    }