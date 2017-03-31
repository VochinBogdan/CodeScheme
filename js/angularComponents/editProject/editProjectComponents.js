(function(){
    'use strict';

    editProjectController.$inject=['editProjectService'];

    function editProjectController(ePS){
        var ctrl=this;
        ctrl.project=ePS.editedProject;

      ctrl.editProject=function(){
          ePS.editProject();
        }
    }

    angular.module('codeSchemeApp')
        .component('editProject',{
            templateUrl:'/js/angularComponents/editProject/editProjectTemplate.html',
            controller:editProjectController

        })
})();