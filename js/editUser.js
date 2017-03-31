$(function() {
    var scntDiv = $('#p_scents');
    var i = $('#p_scents p').size() + 1;

    $('#addScnt').live('click', function() {
        $('<p><label for="list-skills"><div class="skill" id="skill"><input type="text" placeholder="Github" ng-model="$ctrl.user.github" ng-model="{{$ctrl.user.}}"><input type="range" id="range1" min="0" max="100" value="0" step="5" class="slidebar" onchange="showValue(this.value)" /><span id="result1">0</span></div></label> <a href="#" id="remScnt">Remove</a></p>').appendTo(scntDiv);
        i++;
        return false;
    });

    $('#remScnt').live('click', function() {
        if( i > 2 ) {
            $(this).parents('p').remove();
            i--;
        }
        return false;
    });
});


function showValue(newValue)
{
    document.getElementById("result1").innerHTML=document.getElementById("range1").value;
    document.getElementById("result2").innerHTML=document.getElementById("range2").value;
    document.getElementById("result3").innerHTML=document.getElementById("range3").value;
}
