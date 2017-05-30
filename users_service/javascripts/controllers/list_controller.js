app.controller('listController', function($scope, $http, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "All Users";

    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user) {
        $http({
            method: 'GET',
            url: apiBaseURL + '/users',
            headers: {
                'x-access-token': $localStorage.token
            }
        }).then(function (response) {
            $scope.users = response.data;
        });
    } else {
        $http.get("http://localhost:3000/api/users")
        .then(function (response) {
            $scope.users = response.data;
        });
    }

});