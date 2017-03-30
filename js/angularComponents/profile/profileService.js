(function(){
    angular.module('codeSchemeApp')
        .factory('profileService',profileService);

    function profileService($http){
        var service={
            currentUser:{
                username: 'test user',
                email: 'test@test.com',
                password: 'test',
                github: null,
                skills_known: [{
                    name:'Javascript',
                    level:'80%'
                },
                    {
                        name:'CSS',
                        level:'20%'
                    },{
                        name:'HTML',
                        level:'60%'
                    }],
                skills_wanted: [],
                bio: 'this is my bio',
                city: null,
                school: null,
                projects: [{
                    title:'Project title',
                    creator:'Andy',
                    short_desc:'this is a short description'
                },
                    {
                        title:'Project title',
                        creator:'Andy 1',
                        short_desc:'this is a short description'
                    }
                    ,{
                        title:'Project title',
                        creator:'Andy 2',
                        short_desc:'this is a short description'
                    }],
                past_projects: [],
                following_projects: []
            },
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
                //service.currentUser=res.data;
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