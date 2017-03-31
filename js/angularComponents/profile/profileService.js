(function(){
    angular.module('codeSchemeApp')
        .factory('profileService',profileService);

    function profileService($http){
        var service={
            currentUser:{
                username: '',
                email: '',
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
            projects:[],
            getUser:getUser
        }

        return service;

        function getUser(){
            var username=getParameterByName('username')

            $http({
                url:'/users/'+username,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.currentUser);
                //TODO: Do the work on the server side with a new endpoint.Instead of many requests.
                for(var i = 0; i < service.currentUser.projects.length; i++){
                    $http({
                        url:'/projects/' + service.currentUser.projects[i].project_id,
                        method:'GET'
                    }).then(function(res){
                        projects.push(res.data);
                    });
                }
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