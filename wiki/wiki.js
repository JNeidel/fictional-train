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
					let results_i = 'results-' + String(i)
					let results_i_text = "results-" + String(i) + "-text"

					if (i === 0) { // Clear previous results
						$("#results").html("<div id='" + results_i + "'><a id='" + results_i_text + "' href='" + data[3][i] + "' target='_blank'></a>");
					} else {
						$("#results").append("<div id='" + results_i + "'><a id='" + results_i_text + "' href='" + data[3][i] + "' target='_blank'></a>");
					}

					$("#" + results_i_text).append("<p>" + data[1][i] + "</p>");

					if (data[2][i].length > 140 && data[2][i].length > 0) { // Identify the sentence has been cut off
						$("#" + results_i_text).append("<p>" + data[2][i].slice(0, 137) + "...</p>");
					} else if (data[2][i].length > 0) {
						$("#" + results_i_text).append("<p>" + data[2][i].slice(0, 140) + "</p>");
					}

					$("#" + results_i).append("</div>")

					$("#" + results_i).css({"background-color": "#2A363B", "padding": "2vh 2vw 1vh 2vw",
						"margin-bottom": "1vh", "border-radius": "1%"});
					$("#" + results_i_text).css({"text-decoration": "none", "color": "#fff", 
						"background-color": "orange", "hover": "hand"});
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