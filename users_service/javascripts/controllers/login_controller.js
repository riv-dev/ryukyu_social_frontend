app.controller('loginController', function($scope, $http, $location, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "Log In";

    CommonFunctions.setFlashMessage($scope, $localStorage);

    $scope.post_authenticate = function() {
        $http({
            method: 'POST',
            url: apiBaseURL + '/users/authenticate',
            data: {email: $scope.email, password: $scope.password}
        }).then(
            function successCallback(response) {
                if(response.data.success) {
                    $localStorage.flash_message = "Successful Login!";
                    $localStorage.token = response.data.token
                    $location.path('/');
                } else {
                    $scope.$parent.flash_message = "Invalid Credentials";
                }
            },
            function errorCallback(response) {
                $scope.$parent.flash_message = "Invalid Credentials";
            }
        );
    };
});