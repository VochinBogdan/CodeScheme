var numSkill = 1;

// processes the skills input and shows the value for the sliders
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
			numSkill++;
			if(i == x.length-1)
				flag = 1;
			break;
		}
	}
	if(flag == 1){
		document.getElementById("add_button").style.display = "none";
	}
}

// processes the skills input
function processSkills()
{
	var skill1, skill1_val, skill2, skill2_val, skill3, skill3_val;
	var skill_input;
	
	// skill 1
	skill1_val = document.getElementById("range1").value;
	document.getElementById("result1").innerHTML=skill1_val;
	skill1 = document.getElementById("skill_name1").value;
	skill_input = "\"skills_used\": [{ \"name\": \"" + skill1 + "\", \"level\": " + skill1_val + "}";
	
	if(numSkill > 1){
		// skill 2
		skill2_val = document.getElementById("range2").value;
		document.getElementById("result2").innerHTML=skill2_val;
		skill2 = document.getElementById("skill_name2").value;
		skill_input += ",{ \"name\": \"" + skill2 + "\", \"level\": " + skill2_val + "}";
	}
	if(numSkill > 2){
		// skill 3
		skill3_val = document.getElementById("range3").value;
		document.getElementById("result3").innerHTML=skill3_val;
		skill3 = document.getElementById("skill_name3").value;
		skill_input += ",{ \"name\": \"" + skill3 + "\", \"level\": " + skill3_val + "}";
	}
	skill_input += "]";
	document.getElementById("final_skills").innerHTML=skill_input;
}