var app = angular.module('myApp', ['ngRoute','ngStorage']);
var apiBaseURL = "http://localhost:3000/api";

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
  .when("/login", {
    templateUrl: "login.html",
    controller: "loginController"
  })
  .when("/logout", {
    templateUrl: "logout.html",
    controller: "logoutController"
  })
  .when("/users", {
    templateUrl: "list.html",
    controller: "listController"
  })
  .when("/users/new", {
    templateUrl: "new.html",
    controller: "newController"
  })
  .when("/users/:user_id", {
    templateUrl: "show.html",
    controller: "showController"
  })
  .when("/users/:user_id/edit", {
    templateUrl: "edit.html",
    controller: "editController"
  })
  .when("/users/:user_id/delete", {
    templateUrl: "list.html",
    controller: "deleteController" 
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});