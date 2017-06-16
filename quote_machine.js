$(document).ready(function() {
	getQuote("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"); //Inital quote

	function getQuote (url) {
		$.getJSON(url, function(data) {
		$("#quote").html('"<em>' + data.quoteText + '</em>"');
		if (data.quoteAuthor === "") {
			$("#author").html("- Unknown"); //No author given
		} else {
			$("#author").html("- " + data.quoteAuthor);
		}
			    
			quote = data.quoteText.split(" ").join("%20");
			author = data.quoteAuthor.split(" ").join("%20");
			$("#twitter-share").attr("href", "https://twitter.com/intent/tweet?text=" + '"' + quote + '"  - ' + author); //Formatting twitter url
		}); 
	}

	var colors = ["#CF4647", "#F5D061", "#FCC29A", "#3498DB", "#E0FF59", "#B1D056", "#FFA33E", "#254B62", "#4E3188",  "#24BABC", "#C62727", "#F98903", "#F6C90E", "#C50000", "#6D42C7", "#E85B48", "#F03861", "#FF847C", "#71ADB5", "#A10054"];

	function getColor () { //Pick a color
		color = colors[Math.floor((Math.random() * colors.length))];
	}

    $("#get_quote").on("click", function(){
		getQuote("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?");

		getColor();
	    $("body").css("background-color", color); //Changing colors
	    $("#logo").css("color", color);
	    $("#get_quote").css("color", color);
	    $("#twitter").css("background-color", color);

    });
    /*function call_ajax() {
  		$.ajax({
			url: "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
			dataType: 'jsonp',
			async: false,
			success: function(data) {
			$("#quote").html('"<em>' + data.quoteText + '</em>"');
			$("#author").html('-' + data.quoteAuthor);
			}
		});
  	}*/
});	
