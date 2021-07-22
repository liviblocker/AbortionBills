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

// 1. Add a 2nd layer group for the tectonic plate data.
let introduced = new L.LayerGroup();
let passedOne = new L.LayerGroup();
let passedLegislature = new L.LayerGroup();
let enacted = new L.LayerGroup();
let vetoed = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let filters = {
  "Introduced": introduced,
  "Passed One Chamber": passedOne,
  "Passed Legislature": passedLegislature,
  "Enacted": enacted,
  "Vetoed": vetoed
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(filters).addTo(map)

// Accessing the Toronto neighborhoods GeoJSON URL.
let usStates = "https://raw.githubusercontent.com/liviblocker/AbortionBills/main/USBorders.json";

// Grabbing our GeoJSON data.
d3.json(usStates).then(function(data) {
  console.log(data);
  // This function determines the color of the state based on the number of abortion bills.
  function getColor(noBills) {
    return noBills > 30 ? '#800026' :
           noBills > 25 ? '#BD0026' :
           noBills > 20 ? '#E31A1C' :
           noBills > 15 ? '#FC4E2A' :
           noBills > 10 ? '#FD8D3C' :
           noBills > 5 ? '#FEB24C' :
           noBills > 0 ? '#FED976' :
                         '#FFEDA0';
  }
  function style(feature) {
    return {
        fillColor: getColor(feature.bills.TOTALNUMBER),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
L.geoJson(data, {
  style: style,
  onEachFeature: function(features, layer) {
      console.log(layer);
      layer.bindPopup("<center>" + "<h2>" + features.properties.NAME + "</h2>" + "<h3>" + "<u>" + features.bills.TOTALNUMBER + "</u>" + " anti-abortion bill(s) introduced in 2021" + "</h3>" + "</center>");
    }
  }).addTo(map);
  });