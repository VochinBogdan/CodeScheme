(function(){
    'use strict';

    createProjectController.$inject=['createProjectService'];

    function createProjectController(cPS){
        var ctrl=this;
		ctrl.project=cPS.newProject;

		ctrl.$onInit=function(){
            cPS.getLoggedInUser();
        }
		
		ctrl.createProject=function(){
			cPS.createProject();
        }
    }

    angular.module('codeSchemeApp')
        .component('createProject',{
            templateUrl:'/js/angularComponents/createProject/createProjectTemplate.html',
            controller:createProjectController

        })
})();