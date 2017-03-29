var projectSearchApp = angular.module("projectSearchApp", []);

projectSearchApp.controller('projectSearchController', function($scope, $http) {
    $http.get("/projects").then(function ( response ) {
        console.log(response.data);
        recieved_projects = response.data;
        // Add attribute to projects for current number of members
        recieved_projects.forEach( function(project) {
            project.num_members_found = project.contributors.length;
        }) 
        
        $scope.projects = recieved_projects;

    });
});