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

function displaySingleProject(title, parentId, username) {
    $.ajax({
        type : "GET",
        url : "/projects/" + title,
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            var title = $("<h3>" + response["title"] + "</h3>");
            var short_desc = $("<p>" + response["short_description"] + "</p>");
            short_desc.addClass("project_description");
            var city = $("<p>" + response["city"] + "</p>");
            city.addClass("project_location");

            var creator = $("<p>Created by " + response["creator"] + "</p>");
            creator.addClass("project_creator");

            var num_needed = response["num_members_needed"];
            var num_found = response["contributors"].length;
            var teammates_needed = $("<p>" + num_found + "/" + num_needed + " Teammates found</p>");
            teammates_needed.addClass("project_teammates_needed");

            var skills = "";
            for (var i = 0; i < response["skills_used"].length; i++) {
                skills += "#" + response["skills_used"][i]["name"] + " ";
            }
            var tags = $("<p>" + skills + "</p>");
            tags.addClass("project_tags");

            if (parentId == "user_projects") {
                var project = $("<div>", {"class": "user_project", "id": response["title"]});
                $("#user_projects").append(project);
            } else if (parentId == "following") {
                var project = $("<div>", {"class": "follow_project", "id": response["title"]});
                $("#following").append(project);
            } else if (parentId == "explore_projects") {
                var project = $("<div>", {"class": "explore_project", "id": response["title"]});
                $("#explore_projects").append(project);
            }

            project.append(title);
            project.append(creator);
            project.append(short_desc);
            project.append(teammates_needed);
            project.append(tags);
            project.append(city);

            $("#" + project.attr("id")).click(function() {
                window.location.replace("projectProfile.html?title=" + project.attr("id") + "&loggedInUsername=" + username);
            });
        }
    })
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {
    // get username
    var username = getParameterByName("loggedInUsername");
    var user_projects = [];
    var following_projects = [];

    $.ajax({
        type : "GET",
        url : "/users/" + username + "/private",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            var projects = response["projects"];
            var following_projects = response["following_projects"];

            for (var i = 0; i < projects.length; i++) {
                user_projects[i] = projects[i]["project_id"];
                displaySingleProject(projects[i]["project_id"], "user_projects", username);
            }
            for (i = 0; i < following_projects.length; i++) {
                following_projects[i] = following_projects[i]["project_id"];
                displaySingleProject(following_projects[i]["project_id"], "following", username);
            }

            $.ajax({
                type : "GET",
                url : "/projects",
                dataType : "json",
                contentType : "application/json; charset=utf-8",
                success : function(response) {
                    var explore_projects = [];

                    // filter out projects that the user is already a part of or following
                    for (0; i < response.length; i++) {
                        if (!user_projects.includes(response[i]["title"]) && !following_projects.includes(response[i]["title"])) {
                            explore_projects.push(response[i]["title"]);
                        }
                    }

                    for (i = 0; i < explore_projects.length; i++) {
                        displaySingleProject(explore_projects[i], "explore_projects", username);
                    }
                }
            });
        },
        error : function() {
            window.location.replace("userNotFound.html");
        }
    });
});
