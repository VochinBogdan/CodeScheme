(function(){
   'use strict';

   projectController.$inject=['projectService'];

   function projectController(pS){
        var ctrl=this;
        ctrl.project=pS.currentProject;

        ctrl.$onInit=function(){
            pS.getProject();
        }
   }

   angular.module('codeSchemeApp')
       .component('project',{
           templateUrl:'/js/angularComponents/project/projectTemplate.html',
           controller:projectController

       })
})();