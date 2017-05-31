app.controller('showController', function($scope, $http, $routeParams, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "User Photo";
    $scope.routeID = $routeParams.user_id;
    $scope.apiBaseURL = apiBaseURL;

    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    $http.get(apiBaseURL + "/users/"+$routeParams.user_id+"/photo")
    .then(
        function (response) {$scope.photo = response.data;}
    );
});