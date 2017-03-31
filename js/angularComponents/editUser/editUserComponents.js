(function(){
    'use strict';

    editUserController.$inject=['editUserService'];

    function editUserController(eUS){
        var ctrl=this;
        ctrl.user=eUS.user;

        ctrl.$onInit=function(){
            eUS.getUser();
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