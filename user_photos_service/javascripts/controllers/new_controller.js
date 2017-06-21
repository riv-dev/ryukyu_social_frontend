app.controller('newController', function($scope, $http, $routeParams, $location, $localStorage, Upload, CommonFunctions) {
    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user && ($localStorage.loggedin_user.admin || $localStorage.loggedin_user.id == $routeParams.user_id)) {
        $scope.$parent.hero = "Add User Photo";

        $http.get(userAPIBaseURL + "/users/" + $routeParams.user_id)
            .then(function (response) {
                $scope.firstname = response.data.firstname;
                $scope.lastname = response.data.lastname;
            });

        $scope.submit = function() {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            } else {
                $scope.$parent.flash_message = "Error adding photo.";
                $scope.errors = {}
                $scope.errors['photo'] = [];
                $scope.errors['photo'].push("can't be empty");
            }
        };        

        $scope.upload = function(file) {
            Upload.upload({
                url: apiBaseURL + "/users/" + $routeParams.user_id + "/photo",
                method: 'POST',
                headers: {
                    'x-access-token': CommonFunctions.getToken()
                },                
                data: {          
						lastname: $scope.lastname, 
						firstname: $scope.firstname, 
						caption: $scope.caption,
						photo: file
                }
            }).then(function (response) {
                $localStorage.flash_message = "Successfully added photo!";
                $location.path("/users/" + $routeParams.user_id + "/photo");
                //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (response) {
                    $scope.$parent.flash_message = "Error adding photo.";
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
                //console.log('Error status: ' + resp.status);
            });/*, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });*/

        };
    } else {
        $localStorage.flash_message = "Invalid Credentials";
        $location.path('/');
    }
});