(function(){
    'use strict';

    editUserController.$inject=['editUserService'];

    function editUserController(eUS){
        var ctrl=this;
        ctrl.user=eUS.user;
        ctrl.skill=eUS.skill;
        ctrl.loggedInUsername = eUS.loggedInUsername;

        ctrl.$onInit=function(){
            eUS.getUser();
            eUS.setLoginUser();
        }

        ctrl.updateUser=function(){
            console.log('test');
            eUS.updateUser();
        }
    }

    angular.module('codeSchemeApp')
        .component('editUser',{
            templateUrl:'/js/angularComponents/editUser/editUserTemplate.html',
            controller:editUserController

        })
})();