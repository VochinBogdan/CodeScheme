function showValue(newValue)
{
	document.getElementById("result1").innerHTML=document.getElementById("range1").value;
	document.getElementById("result2").innerHTML=document.getElementById("range2").value;
	document.getElementById("result3").innerHTML=document.getElementById("range3").value;
}

function addSkills()
{
	var x = document.getElementsByClassName("skill");
	var flag = 0;
	var idName = "skill";
	for (i = 1; i < x.length; i++) {
		if(x[i].style.display == "none")
		{
			var stringNum = (i+1).toString();
			document.getElementById(idName+stringNum).style.display = "block";
			if(i == x.length-1)
				flag = 1;
			break;
		}
	}
	if(flag == 1){
		document.getElementById("add_button").style.display = "none";
	}
}

/*
function createProject()
{
    var title = document.getElementById("title").value;
    var short_desc = document.getElementById("title").value;
    var long_desc = document.getElementById("title").value;
    var tags = document.getElementById("title").value;
    var skills = document.getElementById("title").value;
    
    var numMembers = document.getElementById("title").value;
    var github = document.getElementById("title").value;
    var URL = "title=" + title + "&short_desc=" + short_desc + "&tags=" + tags;
    
    URL += (long_desc) ? "&long_desc=" + long_desc : "";
    URL += (desc) ? "&desc=" + desc : "";
    
    var data = URL;
    "title=Great%20Side-Project&short_desc=The%20side%20project%20above%20side%20projects&num_needed=10&moderators=Jane%2C%20John&members=Jack%2C%20Jill%2C%20Jenny%2C%20James&skills_used=Java%2C%20HTML%2C%20CSS&tags=great%2C%20side%2C%20project%2C%20AwesomerThanYours&github=http%3A%2F%2Fgithub.com&city=Toronto&school=UofT";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "http://localhost:3000/");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d9916576-3149-118d-8830-459761bad8a7");

    xhr.send(data);
}
*/

function editProject(){
    
}
