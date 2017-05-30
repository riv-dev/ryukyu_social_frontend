app.controller('deleteController', function ($scope, $http, $routeParams, $location, $localStorage, CommonFunctions) {
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user && ($localStorage.loggedin_user.admin || $localStorage.loggedin_user.id == $routeParams.user_id)) {
        //$scope.$parent.message = "Delete User...";

        $http({
            method: 'DELETE',
            url: apiBaseURL + '/users/' + $routeParams.user_id + "/photo",
            headers: {
                'x-access-token': $localStorage.token
            }
        }).then(
            function successCallback(response) {
                $localStorage.flash_message = "Deleted photo!";
                $location.path('/');
            },
            function errorCallback(response) {
                $localStorage.flash_message = "Error deleting photo.";
                $location.path('/');
            }
        );
    } else {
        $localStorage.flash_message = "Invalid Credentials";
        $location.path('/');
    }

});