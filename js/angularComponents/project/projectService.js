(function(){
    angular.module('codeSchemeApp')
        .factory('projectService',projectService);

    function projectService($http){
        var service={
            currentProject:{
                title: '',
                short_desc: '',
                long_desc: '',
                tags: [],
                skills: [],
                creator: '',
                moderators: [],
				contributors: [],
                num_needed: null,
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