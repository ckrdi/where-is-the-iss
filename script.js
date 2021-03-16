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
};

// setInterval to update the location
setInterval(getISS, 1000);