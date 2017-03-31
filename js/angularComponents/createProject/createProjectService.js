(function(){
    angular.module('codeSchemeApp')
        .factory('createProjectService',createProjectService);


    function createProjectService($http){
            var service= {
                createProject: createProject,
                newProject: {
                    title:'',
					username:'',
                    short_desc:'',
                    long_desc:''
                }
            }

            return service;

        function createProject(){

            console.log(service.newProject);
            $http({
                url:'/projects',
                method:'POST',
                data:{
                    title:service.newProject.title,
                    username:service.newProject.username,
					short_desc:service.newProject.short_desc,
                    long_desc:service.newProject.long_desc
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/projectProfile.html?title='+ service.newProject.title);
            });
        }
    }

})();