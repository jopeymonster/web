/*

$("h1").addClass("big-title margin-50");

$("a").attr("href", "https://www.yahoo.com");
 
$("h1").click(function() {
	$("h1").css("color", "purple");
});

for (var i = 0; i<5; i++) {
	document.querySelectorAll("button")[i].addEventListener("click", function() {
		document.querySelector("h1").style.color = "purple";
	});
}

$("button").click(function() {
	$("h1").css("color", "purple");
});

$("h1").click(function() {
	$("h1").css("color", "purple");
});

$("input").keypress(function(event) {
	console.log(event.key);
});

$("h1").on("mouseover", function() {
	$("h1").css("color", "red");
}); 

$(document).keypress(function(event) {
	$("h1").text(event.key);
});

*/

$("button").on("click", function() {
	$("h1").fadeOut().slideDown().animate({opacity: 0.5});
});




