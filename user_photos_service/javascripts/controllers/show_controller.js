app.controller('showController', function($scope, $http, $routeParams, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "User Photo";
    $scope.routeID = $routeParams.user_id;
    $scope.apiBaseURL = apiBaseURL;

    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    /*$http.get(apiBaseURL + "/users/"+$routeParams.user_id+"/photo")
    .then(
        function (response) {$scope.photo = response.data;}
    );*/

    $http({
        method: 'GET',
        url: apiBaseURL + "/users/"+$routeParams.user_id+"/photo",
        headers: {
            'x-access-token': CommonFunctions.getToken()
        }
    }).then(function (response) {
        $scope.photo = response.data;
    });
});