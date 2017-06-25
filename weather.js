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
		getWeather(lon, lat);
	}

	function getWeather (lon, lat) {
		url = "https://api.darksky.net/forecast/2fd9c6e3bd55ef3fb02da8d9d01ae78b/" + String(lat) + "," + String(lon);
		$.ajax(url, {
			url: url,
			dataType: "jsonp",
			async: false,
			success: function (data) {
				temperature = data.currently.apparentTemperature;
				readable = data.currently.summary;
				icon = data.currently.icon;
				console.log(data);
			}
		});
	}

	getLocation(returnLocation);

	/*
	Icon possibilities:
	clear-day, 
	clear-night, 
	rain, 
	snow, 
	sleet, 
	wind, 
	fog, 
	cloudy, 
	partly-cloudy-day,
	partly-cloudy-night

	ensure that a default is defined

	https://darksky.net/dev/docs/response
	*/
});
