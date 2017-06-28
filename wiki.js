$(document).ready(function() {

	input = "Monstercat";

	function getList (input) {
		url = "https://en.wikipedia.org/w/api.php?action=query&titles=" + input.split(" ").join("%20") + "&prop=revisions&rvprop=content&format=json"
		$.ajax(url, {
			url: url,
			dataType: "jsonp",
			async: false,
			success: function (data) {
				for (key in data.query.pages) {}
				try {
					var category = data.query.pages[key].revisions[0]["*"].split("{{Infobox ")[1].split("}}")[0].split("|")[0].split(" <!--")[0];
					console.log(category);
				} catch(err) {
					console.log(data.query.pages[key].revisions[0]["*"]);
					console.log(data.query.pages);
				}
			}
		});
	}

	getList(input);
});
