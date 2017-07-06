app.controller('deleteController', function ($scope, $http, $routeParams, $location, $localStorage, CommonFunctions) {
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user && $localStorage.loggedin_user.admin) {
        $scope.$parent.hero = "Deleting Task...";

        $http({
            method: 'DELETE',
            url: apiBaseURL + '/tasks/' + $routeParams.task_id,
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(
            function successCallback(response) {
                $localStorage.flash_message = "Deleted task!";
                $location.path('/');
            },
            function errorCallback(response) {
                $localStorage.flash_message = "Error deleting task.";
                $location.path('/');
            }
        );
    } else {
        $localStorage.flash_message = "Invalid Credentials";
        $location.path('/');
    }

});