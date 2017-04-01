(function(){
    angular.module('codeSchemeApp')
        .factory('createProjectService',createProjectService);


    function createProjectService($http){
            var service= {
                createProject: createProject,
				getLoggedInUser:getLoggedInUser,
                newProject: {
                    title:'',
					username:'',
                    short_desc:'',
                    long_desc:'',
					tags:[],
					skills_used:[],
					num_needed:'',
					github:'',
					city:'',
					school:''
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
                    long_desc:service.newProject.long_desc,
					tags:service.newProject.tags,
					skills_used:service.newProject.skills_used,
					num_needed:service.newProject.num_needed,
					github:service.newProject.github,
					city:service.newProject.city,
					school:service.newProject.school
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/projectProfile.html?title='+ service.newProject.title);
            });
        }
		
		function getLoggedInUser(){
			service.newProject.username = getParameterByName('loggedInUsername');
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