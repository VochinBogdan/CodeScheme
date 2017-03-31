(function(){
    angular.module('codeSchemeApp')
        .factory('editProjectService',editProjectService);


    function editProjectService($http){
            var service= {
                editProject: editProject,
				getUser:getUser,
				getTitle:getTitle,
                editedProject: {
                    //title:'',
					username:'',
                    short_desc:'',
                    long_desc:'',
					tags:'',
					//skills:'',
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

            console.log(service.editedProject);
            $http({
                url:'/projects/' + service.editedProject.title,
                method:'PUT',
                data:{
					//title:service.editedProject.title,
                    username:service.editedProject.username,
					short_desc:service.editedProject.short_desc,
                    long_desc:service.editedProject.long_desc,
					tags:service.editedProject.tags,
					//skills:service.editedProject.skills,
					num_needed:service.editedProject.num_needed,
					moderators:service.editedProject.moderators,
					contributors:service.editedProject.contributors,
					github:service.editedProject.github,
					city:service.editedProject.city,
					school:service.editedProject.school
                }
            }).then(function(res){
                console.log(res);
                window.location.replace('/html/projectProfile.html?title='+ service.editedProject.title);
            });
        }
		
		function getUser(){
            var username=getParameterByName('username')

            $http({
                url:'/users/'+username,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.editedProject);
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
		
		function getTitle(){
            var title=getParameterByName('title')

            $http({
                url:'/projects/'+title,
                method:'GET'
            }).then(function(res){
                angular.copy(res.data,service.editedProject);
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