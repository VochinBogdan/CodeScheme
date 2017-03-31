(function(){
    angular.module('codeSchemeApp')
        .factory('projectService',projectService);

    function projectService($http){
        var service={
            currentProject:{
                title: 'The Very Best Project Ever',
                short_desc: 'this is a short description',
                long_desc: 'this is a long description. Sort of.',
                tags: [{}],
                skills: [{
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
                creator: 'Mandy',
                moderators: [{
                    username:'Andy'
                },
                {
                    username:'Andy1'
                }],
                members: [{
                    username:'Andy2'
                },
                {
                    username:'Andy3'
                }],
                numMembers: 5,
                github: null,
                city: null,
                school: null
            },
            getProject:getProject
        }

        return service;

        function getProject(){
            var title=getParameterByName('title')

            $http({
                url:'/projects/'+title,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.currentProject);
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