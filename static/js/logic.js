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
  scrollWheelZoom: false,
  layers: light
});

// Add two layer groups for the introduced bills and the enacted bills data.
let introduced = new L.LayerGroup();
let enacted = new L.LayerGroup();

// Add a reference to the layers to the filters object.
let filters = {
  "Anti-Abortion Bills Introduced": introduced,
  "Anti-Abortion Bills Enacted": enacted,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(filters).addTo(map)

// Accessing the states GeoJSON URL.
let usStates = "https://raw.githubusercontent.com/liviblocker/AbortionBills/main/raw_data/USBorders.json";

// Grabbing our GeoJSON data.
d3.json(usStates).then(function(data) {
  console.log(data);
  // This function determines the color of the state based on the number of abortion bills introduced.
  function getColor(noBills) {
    return noBills > 25 ? '#800026' :
           noBills > 20 ? '#BD0026' :
           noBills > 15 ? '#E31A1C' :
           noBills > 11 ? '#FC4E2A' :
           noBills > 7 ? '#FD8D3C' :
           noBills > 3 ? '#FEB24C' :
           noBills > 0 ? '#FED976' :
                         '#FFFBEC';
  }
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.TOTALNUMBER),
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
      layer.bindPopup("<center>" + "<h2>" + features.properties.NAME + "</h2>" + "<h3>" + "<u>" + features.properties.TOTALNUMBER + "</u>" + " anti-abortion bill(s) were introduced in 2021." + "</h3>" + "<h3>" + "<u>" + features.properties.ENACTED + "</u>" + " anti-abortion bill(s) were" + "<i>" + " enacted" + "</i>" + " in 2021." + "</h3>" + "<h4>" + features.properties.DESCRIPTION + "</h4>" + "</center>", {
        maxHeight: 300
      });
    }
  }).addTo(introduced);

  introduced.addTo(map);
});

// Here we create a legend control object.
let legend1 = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend1.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML = "<header>" + "<h3>" + "<strong>" + "Bills Introduced" + "</h3>" + "</strong>" + "</header>";

  const magnitudes = [1, 3, 7, 11, 15, 20, 25];
  const colors = [
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026"
  ];
  
// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
    "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;    
  };

  // Finally, we our legend to the map.
  legend1.addTo(map);

// Grabbing our GeoJSON data.
d3.json(usStates).then(function(data) {
  console.log(data);
  // This function determines the color of the state based on the number of abortion bills introduced.
  function getColor(noBills) {
    return noBills > 6 ? '#800026' :
           noBills > 5 ? '#BD0026' :
           noBills > 4 ? '#E31A1C' :
           noBills > 3 ? '#FC4E2A' :
           noBills > 2 ? '#FD8D3C' :
           noBills > 1 ? '#FEB24C' :
           noBills > 0 ? '#FED976' :
                         '#FFFBEC';
  }
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.ENACTED),
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
      layer.bindPopup("<center>" + "<h2>" + features.properties.NAME + "</h2>" + "<h3>" + "<u>" + features.properties.TOTALNUMBER + "</u>" + " anti-abortion bill(s) introduced in 2021" + "</h3>" + "<h3>" + "<u>" + features.properties.ENACTED + "</u>" + " anti-abortion bill(s) were" + "<i>" + " enacted" + "</i>" + " in 2021." + "</h3>" + "<h4>" + features.properties.DESCRIPTION + "</h4>" + "</center>", {
        maxHeight: 300
      });
    }
  }).addTo(enacted);

  enacted.addTo(map);
});

// Here we create a legend control object.
let legend2 = L.control({
  position: "bottomright"
})

// Then add all the details for the legend
legend2.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  div.innerHTML = "<header>" + "<h3>" + "<strong>" + "Bills Enacted" + "</h3>" + "</strong>" + "</header>";

  const magnitudes = [1, 2, 3, 4, 5, 6];
  const colors = [
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // We add the second legend to the map.
  legend2.addTo(map);

  map.on('baselayerchange', function (filters) {
      if (filters.name === 'Anti-Abortion Bills Introduced') {
          map.removeControl(legend2);
          map.removeControl(enacted);
          legend1.addTo(map);
      }
      else if  (filters.name === 'Anti-Abortion Bills Enacted') {
          map.removeControl(legend1);
          map.removeControl(introduced);
          legend2.addTo(map);
      }
      
    })

L.Control.textbox = L.Control.extend({
  onAdd: function(map) {
    
  var text = L.DomUtil.create('div');
  text.id = "info_text";
  text.innerHTML = "<center>" + "<h3>" + "Map of Anti-Abortion Bills in the United States (2021)" + "</h3>" + "Data pulled from the " + "<a href=www.guttmacher.org/state-policy>" + "Guttmacher Institute." + "</center>";
  return text;
  },

  onRemove: function(map) {
    // Nothing to do here
  }
});
L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
L.control.textbox({ position: 'bottomleft' }).addTo(map);