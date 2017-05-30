app.controller('logoutController', function($scope, $http, $route, $location, $localStorage) {
    delete $localStorage.token;
    delete $localStorage.loggedin_user; //decoded token
    $localStorage.flash_message = "Logged out";
    $location.path('/');
});