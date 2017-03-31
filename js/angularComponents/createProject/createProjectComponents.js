(function(){
    'use strict';

    createProjectController.$inject=['createProjectService'];

    function createProjectController(cPS){
        var ctrl=this;
        ctrl.project=cPS.newProject;

      ctrl.createProject=function(){
          console.log('project created');
          cPS.createProject();
        }
    }

    angular.module('codeSchemeApp')
        .component('createProject',{
            templateUrl:'/js/angularComponents/createProject/createProjectTemplate.html',
            controller:createProjectController

        })
})();