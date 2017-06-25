$(document).ready(function() {

	var latitude;
	var longitude;
	toggle_fahrenheit = false;

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
				temp_in_f = Math.round(data.currently.apparentTemperature);
				temp_in_c = Math.round((data.currently.apparentTemperature - 32) / (9 / 5));

				if (toggle_fahrenheit) { //Display temp in f/c
					$("#temp").text(String(temp_in_f) + " °f".slice(1));
				} else {
					$("#temp").html(String(temp_in_c) + "°c".slice(1));
				}

				$("#place").text(data.timezone.split("/")[1]); //Display location
				$("#weather").text(data.currently.summary); //Readable weather

				switch (data.currently.icon) { //Choose icon to display
					case ("clear-day"):
						$("#icon").attr("src", "pictures/weather clear-day.png");
						break;
					case ("clear-night"):
						$("#icon").attr("src", "pictures/weather clear-night.png");
						break;
					case ("rain"):
						$("#icon").attr("src", "pictures/weather rain.png");
						break;
					case ("snow"):
						$("#icon").attr("src", "pictures/weather snow.png");
						break;
					case ("sleet"):
						$("#icon").attr("src", "pictures/weather sleet.png");
						break;
					case ("wind"):
						$("#icon").attr("src", "pictures/weather wind.png");
						break;
					case ("fog"):
						$("#icon").attr("src", "pictures/weather fog.png");
						break;
					case ("cloudy"):
						$("#icon").attr("src", "pictures/weather cloudy.png");
						break;
					case ("partly-cloudy-day"):
						$("#icon").attr("src", "pictures/weather partly-cloudy-day.png");
						break;
					case ("partly-cloudy-night"):
						$("#icon").attr("src", "pictures/weather partly-cloudy-night.png");
						break;
					default:
						$("#icon").attr("src", "pictures/weather cloudy.png");
						break;
				};
			}
		});
	}

	getLocation(returnLocation);

	/*
	https://darksky.net/dev/docs/response
	*/
});
