app.controller('listController', function($scope, $http, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "All Users";

    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user) {
        $http({
            method: 'GET',
            url: apiBaseURL + '/users',
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(function (response) {
            $scope.users = response.data;
        });
    } else {
        $http.get(apiBaseURL + "/users")
        .then(function (response) {
            $scope.users = response.data;
        });
    }

});