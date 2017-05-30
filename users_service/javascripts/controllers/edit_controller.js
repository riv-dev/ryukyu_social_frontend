app.controller('editController', function ($scope, $http, $routeParams, $location, $localStorage, $window, CommonFunctions) {
    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user && ($localStorage.loggedin_user.admin || $localStorage.loggedin_user.id == $routeParams.user_id)) {
        $scope.$parent.hero = "Edit User";
        $scope.checkboxModel = {admin : 0};
        $scope.routeID = $routeParams.user_id;

        $http.get(apiBaseURL + "/users/" + $routeParams.user_id)
            .then(function (response) {
                $scope.firstname = response.data.firstname;
                $scope.lastname = response.data.lastname;
                $scope.title = response.data.title;
                $scope.email = response.data.email;
                $scope.checkboxModel.admin = response.data.admin;
            });

        $scope.put = function () {
            $http({
                method: 'PUT',
                url: apiBaseURL + '/users/' + $routeParams.user_id,
                headers: {
                    'x-access-token': $localStorage.token
                },
                data: {
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    title: $scope.title,
                    email: $scope.email,
                    password: $scope.password,
                    admin: $scope.checkboxModel.admin
                }
            }).then(
                function successCallback(response) {
                    $localStorage.flash_message = "Successfully updated user!";
                    $window.history.back();
                },
                function errorCallback(response) {
                    $scope.$parent.flash_message = "Error editing user.";
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