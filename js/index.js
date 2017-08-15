function Choose_Format() {
	var format = document.getElementById("specification").value;
	if (format == "1995R") {
		document.getElementById("i_frame").src = "html/1995R.html";
		document.getElementById("i_frame").width = "5150px";
		document.getElementById("i_frame").height = "600px";
	}
	if (format == "2003R") {
		document.getElementById("i_frame").src = "html/2003R.html";
		document.getElementById("i_frame").width = "5150px";
		document.getElementById("i_frame").height = "600px";
	}
	if (format == "2007R") {
		document.getElementById("i_frame").src = "html/2007R.html";
		document.getElementById("i_frame").width = "7450px";
		document.getElementById("i_frame").height = "600px";
	}
	if (format == "2009R") {
		document.getElementById("i_frame").src = "html/2009R.html";
		document.getElementById("i_frame").width = "14130px";
		document.getElementById("i_frame").height = "600px";
	}
	if (format == "2011R") {
		document.getElementById("i_frame").src = "html/2011R.html";
		document.getElementById("i_frame").width = "14070px";
		document.getElementById("i_frame").height = "600px";
	}
}
(function() {
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	if (isIE == true || isEdge == true) {
		var header = document.getElementsByTagName("h1");
		header[0].style.color = "white";
		header[0].style.background = "transparent";
	}
})();

function Confirm_Format() {
	var lock = document.getElementById("format");
	var spec = document.getElementById("specification");
	if (lock.checked == true) {
		spec.disabled = true;
		spec.style.color = "red";
		spec.style.background = "rgb(195,195,195)";
	}
	if (lock.checked == false) {
		spec.disabled = false;
		spec.style.color = "rgb(150,64,187)";
		spec.style.background = "white";
	}
}