"use strict";

$(document).ready(function() {
	let data = twitchApi;

	for (let i in data) {
		console.log(data[i])
		let main_i = "main-" + String(i);
		$("#main").append("<div id='" + main_i + "'>");
		if ("display_name" in data[i]) {
			$("#" + main_i).append("<img src='missing.png' class='main-logo' style='display: inline-block'><p style='display: inline-block'>" + data[i]["display_name"] +"</p></div>");
		} else if ("error" in data[i]) {
		} else {
			console.log(data[i]["stream"]);
			$("#" + main_i).append("<img src='" + data[i].stream.logo + "' class='main-logo'><p>" + data[i]["stream"]["display_name"] +"<br>" + data[i]["stream"]["status"] +"</p></div>");
		}
	}
});