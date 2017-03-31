(function(){
    angular.module('codeSchemeApp')
        .factory('editUserService',editUserService);


    function editUserService($http){
        var service= {
            updateUser: updateUser,
            getUser:getUser,
            user: {
                username: '',
                email: '',
                oldPassword:'',
                password: '',
                github: null,
                skills_known: [],
                skills_wanted: [],
                bio: '',
                city: null,
                school: null,
                projects: [],
                past_projects: [],
                following_projects: []
            }
        }

        return service;

        function updateUser(){

            console.log(service.user);
            $http({
                url:'/users/' + service.user.username,
                method:'PUT',
                data:{
                    email:service.user.email,
                    oldPassword:service.user.oldpassword,
                    password:service.user.password,
                    github: service.user.github,
                    //TODO: ADD THESE to HTML
                    //skills_known: service.user.skills_known,
                    //skills_wanted: service.user.skills_wanted,
                    bio: service.user.bio,
                    city: service.user.city,
                    school: service.user.school
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/UserProfile.html?username='+ service.user.username);
            });
        }

        function getUser(){
            var username=getParameterByName('username')

            $http({
                url:'/users/'+username,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.user);
            });

            $http({
                url:'/users/'+username+'/private',
                method:'GET'
            }).then(function(res){
                angular.copy(res.data.email,service.user.email);
            });
        }

        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

    }

})();