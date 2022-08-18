mapboxgl.accessToken ='pk.eyJ1IjoiYW5ha2FseXV6IiwiYSI6ImNrbjJmcm00cTB3b20ydXFwY2Jvczgxc2EifQ.quoCERqOgA6MTwOjCypb6A';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 12,
});


async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	var busStops = [];
	for (let i=0; i < locations.length; i++) {
		busStops.push([locations[i].attributes.longitude,locations[i].attributes.latitude]);
		new mapboxgl.Marker().setLngLat(busStops[i]).addTo(map);
		}
	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();


