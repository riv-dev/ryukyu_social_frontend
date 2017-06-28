var app = angular.module('myApp', ['ngRoute','ngStorage']);
//var apiBaseURL = "http://localhost:5000"; //local development
var apiBaseURL = "https://ryukyu-social.cleverword.com/tasks_service/api";

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

    this.setToken = function(token) {
        window.localStorage.setItem("token", token);
    }

    this.getToken = function() {
        return window.localStorage.getItem("token");
    }

    this.deleteToken = function() {
        window.localStorage.removeItem("token");
    }

    this.checkLoggedInUser = function(scope, localStorage) {
        if(this.getToken()) {
            var decodedToken = parseJwt(this.getToken());
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
  .when("/tasks", {
    templateUrl: "list.html",
    controller: "listController"
  })
  .when("/tasks/new-slack-tasks", {
    templateUrl: "list.html",
    controller: "slackTasksController" 
  }) 
  .when("/tasks/:task_id/delete", {
    templateUrl: "list.html",
    controller: "deleteController" 
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});