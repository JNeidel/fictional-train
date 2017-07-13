"use strict";

let search_query;

$(document).ready(function() {
	get_wiki_data(search_query);

	$("#search-button").click(function search_on_click() {
		let search_query = $("#search-form").serialize();
		if (search_query !== "query=") {
			get_wiki_data(search_query.slice(6));
		}
	});
});

function get_wiki_data (query) {
	if (query !== undefined && query !== "") {
		let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query.split(" ").join("%20") + "&limit=4&namespace=0&format=json"
		$.ajax(url, {
			url: url,
			dataType: "jsonp",
			async: false,
			success: function (data) {
				for (let i = 0; i < data[1].length; i++) {
					if (i === 0) { // Clear previous results
						$("#results").html("<a href='" + data[3][i] + "' id='results-" + String(i) + "' target='_blank'></a>");
					} else {
						$("#results").append("<a href='" + data[3][i] + "' id='results-" + String(i) + "' target='_blank'></a>");
					}
					$("#results-" + String(i)).append("<p>" + data[1][i] + "</p>");
					if (data[2][i].length > 140) { // Identify the sentence has been cut off
						$("#results-" + String(i)).append("<p>" + data[2][i].slice(0, 137) + "...</p>");
					} else {
						$("#results-" + String(i)).append("<p>" + data[2][i].slice(0, 140) + "</p>");
					}
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
}

function search_bar_enter(event) {
	if (event.keyCode == 13) {
		search_query = document.getElementById("search-bar");
		get_wiki_data(search_query.value);
		return false;
	}
}