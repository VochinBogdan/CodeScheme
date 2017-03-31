// shows the value for the sliders
function showValue(newValue)
{
	document.getElementById("result1").innerHTML=document.getElementById("range1").value;
	document.getElementById("result2").innerHTML=document.getElementById("range2").value;
	document.getElementById("result3").innerHTML=document.getElementById("range3").value;
}

// shows an additional option to add skills
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