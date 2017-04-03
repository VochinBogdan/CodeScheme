var projectSearchApp = angular.module("projectSearchApp", []);

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
    
    $scope.filterProjects = function(city, school) {
        var url = "/projects?";
        var params = [];
        if (city) {
            params.push("city=" + city);
        }
        if (school) {
            params.push("school=" + school);
        }
        url += params.join("&");
        console.log(url);
        $http({
            url: url,
            method: 'GET'}).then(function ( response ) {
                console.log(response);
                recieved_projects = response.data;
                $scope.projects = recieved_projects;
                console.log($scope.projects);
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.filterProjects("","");
});

