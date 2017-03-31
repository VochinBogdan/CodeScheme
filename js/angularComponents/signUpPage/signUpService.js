(function(){
    angular.module('codeSchemeApp')
        .factory('signUpService',signUpService);


    function signUpService($http){
            var service= {
                createUser: createUser,
                newUser: {
                    username:'',
                    email:'',
                    password:''
                }
            }

            return service;

        function createUser(){

            console.log(service.newUser);
            $http({
                url:'/users',
                method:'POST',
                data:{
                    username:service.newUser.username,
                    email:service.newUser.email,
                    password:service.newUser.password
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/UserProfile.html?username='+ service.newUser.username+ '&loggedInUsername='+ service.newUser.username);
            });
        }
    }

})();