app.controller('listController', function($scope, $http, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "All Photos";

    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user) {
        $http({
            method: 'GET',
            url: userAPIBaseURL + '/users',
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(function (response) {
            $scope.users = response.data;
        });
    } else {
        $http.get(userAPIBaseURL + "/users")
        .then(function (response) {
            $scope.users = response.data;
        });
    }
});