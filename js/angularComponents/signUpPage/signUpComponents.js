(function(){
    'use strict';

    signUpController.$inject=['signUpService'];

    function signUpController(sUS){
        var ctrl=this;
        ctrl.user=sUS.newUser;

      ctrl.createUser=function(){
          console.log('test');
          sUS.createUser();
        }
    }

    angular.module('codeSchemeApp')
        .component('signUp',{
            templateUrl:'/js/angularComponents/signUpPage/signUpTemplate.html',
            controller:signUpController

        })
})();