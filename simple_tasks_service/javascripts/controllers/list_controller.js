app.controller('listController', function($scope, $http, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "All Tasks";

    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user) {
        $http({
            method: 'GET',
            url: apiBaseURL + '/tasks',
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(function (response) {
            $scope.users = response.data;
        });
    } else {
        $http.get(apiBaseURL + "/tasks")
        .then(function (response) {
            $scope.users = response.data;
        });
    }

});