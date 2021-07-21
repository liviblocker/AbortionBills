// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [37.8, -96],
  zoom: 5
})

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the US States GeoJSON URL.
let usStates = "https://raw.githubusercontent.com/liviblocker/AbortionBills/main/USBorders.json";

// Grabbing our GeoJSON data.
d3.json(usStates).then(function(data) {
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    onEachFeature: function(features, layer) {
        console.log(layer);
        layer.bindPopup("<h2>" + "State: " + features.properties.NAME + "</h2>");
      }
}).addTo(map);
});