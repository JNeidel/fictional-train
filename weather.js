$(document).ready(function() {

	var latitude;
	var longitude;
	toggle_fahrenheit = false;
	console.log(toggle_fahrenheit);

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
				//Add desc/temp/temp icons
				$("#main-desc-temp").html('<p id="main-desc"><br></p><p id="main-temp"><br></p><img class="toogle-temp-icons" id="temp-icon-c" src="pictures/weather celsius.png">  <img class="toogle-temp-icons" id="temp-icon-f" src="pictures/weather fahrenheit.png">');
				$(".toogle-temp-icons").css("visibility", "visible");

				temp_in_f = Math.round(data.currently.apparentTemperature);
				temp_in_c = Math.round((data.currently.apparentTemperature - 32) / (9 / 5));

				if (toggle_fahrenheit) { //Display temp in f/c, change temp icons background
					$("#main-temp").text(String(temp_in_f) + "°F".slice(1));
					$("#temp-icon-f").css("background-color", "#e70000");
					$("#temp-icon-c").css("background-color", "");
				} else {
					$("#main-temp").html(String(temp_in_c) + "°C".slice(1));
					$("#temp-icon-c").css("background-color", "#e70000");
					$("#temp-icon-f").css("background-color", "");
				}

				$("#main-place").text(data.timezone.split("/")[1]); //Display location
				$("#main-desc").text(data.currently.summary); //Readable weather

				$("#main-placeholder").remove(); //Remove placeholder

				switch (data.currently.icon) { //Choose icon to display
					case ("clear-day"):
						$("#main-icon").attr("src", "pictures/weather clear-day.png");
						break;
					case ("clear-night"):
						$("#main-icon").attr("src", "pictures/weather clear-night.png");
						break;
					case ("rain"):
						$("#main-icon").attr("src", "pictures/weather rain.png");
						break;
					case ("snow"):
						$("#main-icon").attr("src", "pictures/weather snow.png");
						break;
					case ("sleet"):
						$("#main-icon").attr("src", "pictures/weather sleet.png");
						break;
					case ("wind"):
						$("#main-icon").attr("src", "pictures/weather wind.png");
						break;
					case ("fog"):
						$("#main-icon").attr("src", "pictures/weather fog.png");
						break;
					case ("cloudy"):
						$("#main-icon").attr("src", "pictures/weather cloudy.png");
						break;
					case ("partly-cloudy-day"):
						$("#main-icon-div").html('<img id="main-icon" src="pictures/weather partly-cloudy-day.png">');
						//$("#main-icon").attr("src", "pictures/weather partly-cloudy-day.png");
						break;
					case ("partly-cloudy-night"):
						$("#main-icon").attr("src", "pictures/weather partly-cloudy-night.png");
						break;
					default:
						$("#main-icon").attr("src", "pictures/weather cloudy.png");
						break;
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

	/*
	https://darksky.net/dev/docs/response
	*/
});
