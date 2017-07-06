app.controller('slackTasksController', function ($scope, $http, $routeParams, $location, $localStorage, CommonFunctions) {
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user) {
        $scope.$parent.hero = "Getting Slack Tasks...";

        $http({
            method: 'GET',
            url: "https://ryukyu-social.cleverword.com/slack_task_puller_service/api/new-slack-tasks",
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(
            function successCallback(response) {
                $localStorage.flash_message = "Got new tasks!";
                $location.path('/');
            },
            function errorCallback(response) {
                $localStorage.flash_message = "Error getting new tasks.";
                $location.path('/');
            }
        );
    } else {
        $localStorage.flash_message = "Invalid Credentials";
        $location.path('/');
    }

});