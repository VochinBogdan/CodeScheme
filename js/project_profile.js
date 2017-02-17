// When the page is first loaded & when the window is resized, erase the opened tabs
function emptySelection(){
	var i;
	var x = document.getElementsByClassName("expand_tab");
	for (i = 0; i < x.length; i++) {
	   x[i].style.display = "none";  
	}
	
	x = document.getElementsByClassName("tab");
	for (i = 0; i < x.length; i++) {
	   x[i].style.display = "none";  
	}
	// if the screen is larger than 768px, display the "About" tab by default
	var mediaQuery = window.matchMedia("screen and (min-width: 768px)");
	if(mediaQuery.matches){
		document.getElementById('About_big').style.display = "block";
	}
}

function expandTab(tabName) {
	var i;
	var mediaQuery = window.matchMedia("screen and (min-width: 768px)");
	if (mediaQuery.matches){ // if media query matches
		var idName = tabName + "_big";
		var x = document.getElementsByClassName("expand_tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		
		x = document.getElementsByClassName("tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		document.getElementById(idName).style.display = "block";
	}
	else{
		var x = document.getElementsByClassName("tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		
		x = document.getElementsByClassName("expand_tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		document.getElementById(tabName).style.display = "block";  
	}
}