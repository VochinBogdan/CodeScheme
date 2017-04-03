
// When the page is first loaded & when the window is resized, erase the opened tabs
function emptySelection() {
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
    if (mediaQuery.matches) {
		var AboutBig = document.getElementById('About_big');
		AboutBig.style.display = "block";
    }
}

// expand the tab if it's not opened already
function expandTab(tabName) {
    var i, flag = 0;
    var mediaQuery = window.matchMedia("screen and (min-width: 768px)");
    if (mediaQuery.matches) { // if media query matches
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
    } else {
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

        x = document.getElementsByClassName("expand_tab");
		if(document.getElementById(tabName).style.display == "block")
			flag = 1;
		for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
		if(!flag)
			document.getElementById(tabName).style.display = "block";
    }
}

function switchButton(join_button) {
	if(join_button.value == "Request to Join"){
		join_button.value = "Cancel Request to Join";
		alert("Request Submitted!");
	}
	else{
		join_button.value = "Request to Join";
		alert("Request Cancelled!");
	}
}