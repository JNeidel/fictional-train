$(document).ready(function() {

	var latitude;
	var longitude;

	function getLocation (callback) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
      		lon = position.coords.longitude;
			callback(lat, lon);
		});
	}
	function returnLocation (lat, lon) {
		latitude = lat;
		longitude = lon;
	}

	getLocation(returnLocation);
});
