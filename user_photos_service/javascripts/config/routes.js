var app = angular.module('myApp', ['ngRoute','ngStorage', 'ngFileUpload']);
//var userAPIBaseURL = "http://localhost:5000";
var userAPIBaseURL = "http://ryukyu-social.cleverword.com/users_service/api";
//var apiBaseURL = "http://localhost:5001";
var apiBaseURL = "http://ryukyu-social.cleverword.com/user_photos_service/api";

app.service('CommonFunctions', function() {
    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    };
      
    this.setFlashMessage = function(scope, localStorage) {
        if(localStorage.flash_message) {
            scope.$parent.flash_message = localStorage.flash_message;
            delete localStorage.flash_message;
        } else {
            delete scope.$parent.flash_message;
        }     
    };

    this.checkLoggedInUser = function(scope, localStorage) {
        if(localStorage.token) {
            var decodedToken = parseJwt(localStorage.token);
            scope.$parent.login_status = "Logged in as: " + decodedToken.email;
            scope.$parent.loggedin_user = decodedToken;
            scope.loggedin_user = decodedToken;
            localStorage.loggedin_user = decodedToken; //save for usage
        } else {
            delete scope.loggedin_user;
            delete scope.$parent.loggedin_user;
            delete scope.$parent.login_status;
            delete localStorage.loggedin_user;
        }
    }
});

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "list.html",
    controller: "listController"
  })
  .when("/users/:user_id/photo/new", {
    templateUrl: "new.html",
    controller: "newController"
  })
  .when("/users/:user_id/photo/edit", {
    templateUrl: "edit.html",
    controller: "editController"
  })
  .when("/users/:user_id/photo", {
    templateUrl: "show.html",
    controller: "showController"
  })
  .when("/users/:user_id/photo/delete", {
    templateUrl: "list.html",
    controller: "deleteController" 
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});