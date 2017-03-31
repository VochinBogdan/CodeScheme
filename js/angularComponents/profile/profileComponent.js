(function(){
   'use strict';

   profileController.$inject=['profileService'];

   function profileController(pS){
        var ctrl=this;
        ctrl.user=pS.currentUser;

        ctrl.$onInit=function(){
            pS.getUser();
            pS.setLoginUser();
        }
   }

   angular.module('codeSchemeApp')
       .component('profile',{
           templateUrl:'/js/angularComponents/profile/profileTemplate.html',
           controller:profileController

       })
})();