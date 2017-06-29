app.controller('showController', function($scope, $http, $routeParams, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "Task Details";
    $scope.routeID = $routeParams.task_id;

    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    /*$http.get(apiBaseURL + "/users/"+$routeParams.user_id)
    .then(function (response) {$scope.user = response.data;});*/

    $http({
        method: 'GET',
        url: apiBaseURL + "/tasks/"+$routeParams.task_id,
        headers: {
            'x-access-token': CommonFunctions.getToken()
        }
    }).then(function (response) {
        $scope.task = response.data;
    });
});