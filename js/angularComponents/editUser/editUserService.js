(function(){
    angular.module('codeSchemeApp')
        .factory('editUserService',editUserService);


    function editUserService($http){
        var service= {
            updateUser: updateUser,
            getUser:getUser,
            setLoginUser:setLoginUser,
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
            },
            loggedInUsername:{
                name:''
            },
            skill:{
                name:'',
                level:''
            }
        };

        return service;

        function updateUser(){
            service.user.skills_known.push(service.skill);
            console.log(service.user);
            $http({
                url:'/users/' + service.user.username,
                method:'PUT',
                data:{
                    email:service.user.email,
                    oldPassword:service.user.oldpassword,
                    password:service.user.password,
                    github: service.user.github,
                    skills_known: service.user.skills_known,
                    //TODO: ADD THESE to HTML
                    //skills_wanted: service.user.skills_wanted,
                    bio: service.user.bio,
                    city: service.user.city,
                    school: service.user.school
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/UserProfile.html?username='+ service.user.username + '&loggedInUsername='+ service.user.username);
            });
        }

        function getUser(){
            var username=getParameterByName('username');

            $http({
                url:'/users/'+username,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.user);
            });
        }

        function setLoginUser(){
            service.loggedInUsername.name = getParameterByName('loggedInUsername');
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