$(document).ready(function() {

	var latitude;
	var longitude;
	var toggle_fahrenheit = false;

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
		var url = "https://api.darksky.net/forecast/2fd9c6e3bd55ef3fb02da8d9d01ae78b/" + String(lat) + "," + String(lon);
		$.ajax(url, {
			url: url,
			dataType: "jsonp",
			async: false,
			success: function (data) {
				$("#main-placeholder").remove(); //If hidden this would create complications with the placeholder
				$("#main-desc-temp").html('<p id="main-desc"><br></p><p id="main-temp"><br></p><img class="toogle-temp-icons" id="temp-icon-c" src="pictures/weather celsius.png">  <img class="toogle-temp-icons" id="temp-icon-f" src="pictures/weather fahrenheit.png">');
				$(".toogle-temp-icons").css("visibility", "visible");

				var temp_in_f = Math.round(data.currently.apparentTemperature);
				var temp_in_c = Math.round((data.currently.apparentTemperature - 32) / (9 / 5));

				if (toggle_fahrenheit) {
					$("#main-temp").text(String(temp_in_f) + "°F");
					$("#temp-icon-f").css("background-color", "#e70000");
					$("#temp-icon-c").css("background-color", "");
				} else {
					$("#main-temp").html(String(temp_in_c) + "°C");
					$("#temp-icon-c").css("background-color", "#e70000");
					$("#temp-icon-f").css("background-color", "");
				}

				$("#main-place").text(data.timezone.split("/")[1]); //Location
				$("#main-desc").text(data.currently.summary); //Readable forecast
				switch (data.currently.icon) { //Icon
					case ("clear-day"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather clear-day.png">');
						break;
					case ("clear-night"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather clear-night.png">');
						break;
					case ("rain"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather rain.png">');
						break;
					case ("snow"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather snow.png">');
						break;
					case ("sleet"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather sleet.png">');
						break;
					case ("wind"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather wind.png">');
						break;
					case ("fog"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather fog.png">');
						break;
					case ("cloudy"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather cloudy.png">');
						break;
					case ("partly-cloudy-day"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather partly-cloudy-day.png">');
						break;
					case ("partly-cloudy-night"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather partly-cloudy-night.png">');
						break;
					default:
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather cloudy.png">');
				};
			}
		});
	}

	getLocation(returnLocation);

	$(document).on("click", "#temp-icon-c", function() {
		toggle_fahrenheit = false;
		getLocation(returnLocation);
	});
	$(document).on("click", "#temp-icon-f", function() {
		toggle_fahrenheit = true;
		getLocation(returnLocation);
	});
});
