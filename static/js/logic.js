// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [37.8, -96],
  zoom: 5,
  layers: light
});

// Accessing the Toronto neighborhoods GeoJSON URL.
let usStates = "https://raw.githubusercontent.com/liviblocker/AbortionBills/main/USBorders.json";

// Grabbing our GeoJSON data.
d3.json(usStates).then(function(data) {
  console.log(data);
  // This function determines the color of the state based on the number of abortion bills.
  function getColor(noBills) {
    return noBills = 0 ? '#800026' :
           noBills = 1 ? '#BD0026' :
           noBills = 2 ? '#E31A1C' :
           noBills = 3 ? '#FC4E2A' :
           noBills = 4 ? '#FD8D3C' :
           noBills = 5 ? '#FEB24C' :
           noBills > 5 ? '#FED976' :
                         '#FFEDA0';
  }
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.NUMBEROFBILLS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
L.geoJson(data, {style: style}, {
    onEachFeature: function(features, layer) {
      console.log(layer);
      layer.bindPopup("<h2>" + "State: " + features.properties.NAME + "</h2>");
    }
  }).addTo(map);
  });