(function(){
    angular.module('codeSchemeApp')
        .factory('editProjectService',editProjectService);

    function editProjectService($http){
            var service= {
                editProject: editProject,
				getLoggedInUser:getLoggedInUser,
				getProject:getProject,
                project: {
                    title:'',
					username:'',
                    short_desc:'',
                    long_desc:'',
					tags:[],
					skills_used:[],
					num_needed:'',
					moderators:'',
					contributors:'',
					github:'',
					city:'',
					school:''
                }
            }

            return service;

        function editProject(){

            console.log(service.project);
            $http({
                url:'/projects/' + service.project.title,
                method:'PUT',
                data:{
					title:service.project.title,
					username:service.project.username,
					short_desc:service.project.short_desc,
                    long_desc:service.project.long_desc,
					tags:service.project.tags,
					skills_used:service.project.skills_used,
					num_needed:service.project.num_needed,
					moderators:service.project.moderators,
					contributors:service.project.contributors,
					github:service.project.github,
					city:service.project.city,
					school:service.project.school
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/projectProfile.html?title='+ service.project.title);
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
		
		function getLoggedInUser(){
			service.project.username = getParameterByName('loggedInUsername');
        }

        function getProject(){
            var title=getParameterByName('title')

            $http({
                url:'/projects/'+title,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.project);
            });
        }
    }
	
})();