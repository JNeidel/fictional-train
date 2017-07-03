$(document).ready(function() {

	input = "Monstercat";

	function getList (input) {
		url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + input.split(" ").join("%20") + "&limit=4&namespace=0&format=json"
		$.ajax(url, {
			url: url,
			dataType: "jsonp",
			async: false,
			success: function (data) {
				console.log(data);
				for (i = 0; i < data[1].length; i++) {
					$("#results").append("<a href='" + data[3][i] + "' id='results-" + String(i) + "' target='_blank'></a>");
					$("#results-" + String(i)).append("<p>" + data[1][i] + "</p>");
					$("#results-" + String(i)).append("<p>" + data[2][i].slice(0, 140) + "</p>");
					$("#results-" + String(i)).css({"text-decoration": "none", "color": "black"});
					$("#results-" + String(i)).hover(function() {
						$(this).css("background-color", "red");
					}, function() {
						$(this).css("background-color", "#fff");
					});
				}
				
			}
		});
	}
});
