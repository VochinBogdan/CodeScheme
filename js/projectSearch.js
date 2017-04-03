var projectSearchApp = angular.module("projectSearchApp", []);

projectSearchApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

projectSearchApp.controller('projectSearchController', function($scope, $http) {

    $scope.filteredSkills = [];

    $scope.addFilterSkill = function(newSkill) {
        if (newSkill){
            $scope.filteredSkills.push(newSkill);
            $scope.newSkill = "";
        }
    }

    $scope.removeSkill = function(skill) {
        for (var i=0; i<$scope.filteredSkills.length; i++) {
            if ($scope.filteredSkills[i] == skill) {
                $scope.filteredSkills.splice(i, 1);
            }
        }
    }
    
    $scope.filterProjects = function(filter) {
        var url = "/projects?";
        var params = [];
        if (filter.city) {
            params.push("city=" + filter.city);
        }
        if (filter.school) {
            params.push("school=" + filter.school);
        }
        url += params.join("&");
        console.log(url);
        $http({
            url: url,
            method: 'GET'})
        .then(function ( response ) {
            recieved_projects = response.data;
            // Add attribute to projects for current number of members
            recieved_projects.forEach( function(project) {
                project.num_members_found = project.contributors.length;
            }) 
            
            $scope.projects = recieved_projects;
        });
    }

    $scope.filterProjects([]);
});

