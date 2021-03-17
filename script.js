// making a map and tiles
const mymap = L.map('mapid');
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// tileLayer expects two arguments, one is the url path, 
// second is the attribution as an object
const tiles = L.tileLayer(tileURL, {
  attribution
});
tiles.addTo(mymap);

// making a marker with a custom icon
// image from: https://commons.wikimedia.org/wiki/File:International_Space_Station.svg
const myIcon = L.icon({
  iconUrl: '200px-ISS.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], {
  icon: myIcon,
  title: 'International Space Station',
  alt: 'International Space Station'
}).addTo(mymap);

// set the ISS to be viewed in the center for the first time
let followISS = true;
document.getElementById('followISS').addEventListener('change', function () {
  followISS = followISS ? false : true
});

async function getISS() {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();

  // javascript destructuring
  const {
    latitude,
    longitude
  } = data;

  document.getElementById('lat').textContent = latitude;
  document.getElementById('lon').textContent = longitude;

  // Always set the view to current lat lon and zoom!
  //  if set to false the map will be able to be explored
  if (followISS) {
    mymap.setView([latitude, longitude], 2);
  }
  marker.setLatLng([latitude, longitude]);
};

getISS();
// setInterval to update the location
setInterval(getISS, 2000);