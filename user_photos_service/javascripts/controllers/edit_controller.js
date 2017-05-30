app.controller('editController', function ($scope, $http, $routeParams, $location, $localStorage, $window, CommonFunctions) {
    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user && ($localStorage.loggedin_user.admin || $localStorage.loggedin_user.id == $routeParams.user_id)) {
        $scope.$parent.hero = "Edit User Photo";
        $scope.routeID = $routeParams.user_id;

        $http.get(apiBaseURL + "/users/" + $routeParams.user_id + "/photo")
            .then(function (response) {
                $scope.firstname = response.data.firstname;
                $scope.lastname = response.data.lastname;
                $scope.caption = response.data.caption;
            });

        $scope.put = function () {
            $http({
                method: 'PUT',
                url: apiBaseURL + '/users/' + $routeParams.user_id + "/photo",
                headers: {
                    'x-access-token': $localStorage.token
                },
                data: {
                    caption: $scope.caption
                }
            }).then(
                function successCallback(response) {
                    $localStorage.flash_message = "Successfully updated user photo!";
                    $window.history.back();
                },
                function errorCallback(response) {
                    $scope.$parent.flash_message = "Error editing photo.";
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