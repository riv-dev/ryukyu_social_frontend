app.controller('newController', function($scope, $http, $location, $localStorage, CommonFunctions) {
    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user && $localStorage.loggedin_user.admin) {
        $scope.$parent.hero = "Add User";
        $scope.checkboxModel = {admin : 0};

        $scope.post = function() {
            $http({
                method: 'POST',
                url: apiBaseURL + '/users',
                headers: {
                    'x-access-token': CommonFunctions.getToken()
                },
                data: {firstname: $scope.firstname, lastname: $scope.lastname, title: $scope.title, email: $scope.email, password: $scope.password, admin: $scope.checkboxModel.admin}
            }).then(
                function successCallback(response) {
                    $localStorage.flash_message = "Successfully added user!";
                    $location.path('/');
                },
                function errorCallback(response) {
                    $scope.$parent.flash_message = "Error adding user.";
                    $scope.errors = {};
                    var responseError;
                    for (var i=0; i < response.data.errors.length; i++) {
                        responseError = response.data.errors[i];
                        if(responseError.hasOwnProperty('param')) {
                            if(!$scope.errors[responseError['param']]) {
                                $scope.errors[responseError['param']] = [];
                            }
                            $scope.errors[responseError['param']].push(responseError['msg']);
                        }
                    }
                }
            );
        };
    } else {
        $localStorage.flash_message = "Invalid Credentials";
        $location.path('/');
    }
});