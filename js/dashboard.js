function openTab(event, content) {
    var i;
    var tabcontent;
    var tablinks;

    // hide all contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // dehighlight the tabs
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = "tablink";
    }

    // display the content, and highlight the tab
    document.getElementById(content).style.display = "block";
    event.currentTarget.className += " active";

    styleBorder();
}

// a function to decide which container should have a border to separate them
// based on their heights
function styleBorder() {
    var user_project_container = document.getElementsByClassName("user_project_container")[0];
    var explore_project_container = document.getElementsByClassName("explore_project_container")[0];

    // the containers are not side by side, no need for borders
    if (window.innerWidth < 768) {
        user_project_container.style.border = "none";
        explore_project_container.style.border = "none";
        return;
    }

    user_project_container.style.border = "none";
    explore_project_container.style.border = "none";

    if (user_project_container.offsetHeight > explore_project_container.offsetHeight) {
        user_project_container.style.borderRight = "2px solid black";
    } else {
        explore_project_container.style.borderLeft = "2px solid black";
    }
}
