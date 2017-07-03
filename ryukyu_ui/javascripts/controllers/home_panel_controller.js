app.controller('homePanelController', function($scope, $http, $localStorage, CommonFunctions) {
    $scope.$parent.hero = "Home Panel";

    CommonFunctions.setFlashMessage($scope, $localStorage);
    CommonFunctions.checkLoggedInUser($scope, $localStorage);

    if($localStorage.loggedin_user) {
        $http({
            method: 'GET',
            url: usersApiBaseURL + '/users',
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(function (response) {
            $scope.users = response.data;
        });

        $http({
            method: 'GET',
            url: projectsApiBaseURL + '/projects',
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(function (response) {
            $scope.projects = response.data;

            for(var i=0;i<response.data.length;i++) {
                var current_project = $scope.projects[i];
                var current_project_id = current_project.id;

                $http({
                    method: 'GET',
                    url: projectsApiBaseURL + '/projects/'+current_project_id+'/users',
                    headers: {
                        'x-access-token': CommonFunctions.getToken()
                    },
                    params: {
                        'i': i
                    }
                }).then(function (response) {
                    $scope.projects[parseInt(response.config["params"]["i"])]["users"] = response.data;

                    for(var j=0;j<response.data.length;j++) {
                        $http({
                            method: 'GET',
                            url: usersApiBaseURL + '/users/'+response.data[j]["user_id"],
                            headers: {
                                'x-access-token': CommonFunctions.getToken()
                            },
                            params: {
                                'i': response.config["params"]["i"],
                                'j': j
                            }
                        }).then(function (response) {
                            var i = parseInt(response.config["params"]["i"]);
                            var j = parseInt(response.config["params"]["j"]);
                            $scope.projects[i]["users"][j].role = response.data.role;
                            $scope.projects[i]["users"][j].firstname = response.data.firstname; 
                            $scope.projects[i]["users"][j].lastname = response.data.lastname; 
                        });                          
                    }
                });                    

                $http({
                    method: 'GET',
                    url: tasksApiBaseURL + '/projects/'+current_project_id+'/tasks',
                    headers: {
                        'x-access-token': CommonFunctions.getToken()
                    },
                    params: {
                        'i': i
                    }
                }).then(function (response) {
                    $scope.projects[parseInt(response.config["params"]["i"])]["tasks"] = response.data;
                });                    
            }
        });

        $http({
            method: 'GET',
            url: tasksApiBaseURL + '/tasks', //'/ranked-tasks',
            headers: {
                'x-access-token': CommonFunctions.getToken()
            }
        }).then(function (response) {
            $scope.tasks = response.data;

            for(var i=0;i<$scope.tasks.length;i++) {
                var current_task = $scope.tasks[i];
                var current_project_id = current_task.project_id;

                //Get the project name
                if(current_project_id) {
                    $http({
                        method: 'GET',
                        url: projectsApiBaseURL + '/projects/'+current_project_id,
                        headers: {
                            'x-access-token': CommonFunctions.getToken()
                        },
                        params: {
                            'i': i
                        }
                    }).then(function (response) {
                        var current_project = response.data;
                        $scope.tasks[parseInt(response.config["params"]["i"])]["project_name"] = current_project.name;
                    });                    
                }

                //Get all users on the current task
                $http({
                    method: 'GET',
                    url: tasksApiBaseURL + '/tasks/'+current_task.id+'/users',
                    headers: {
                       'x-access-token': CommonFunctions.getToken()
                    },
                    params: {
                       'i': i
                    }
                }).then(function (response) {
                    $scope.tasks[parseInt(response.config["params"]["i"])]["users"] = response.data

                    for(var j=0;j<response.data.length;j++) {
                        $http({
                            method: 'GET',
                            url: usersApiBaseURL + '/users/'+response.data[j]["user_id"],
                            headers: {
                                'x-access-token': CommonFunctions.getToken()
                            },
                            params: {
                                'i': response.config["params"]["i"],
                                'j': j
                            }
                        }).then(function (response) {
                            var i = parseInt(response.config["params"]["i"]);
                            var j = parseInt(response.config["params"]["j"]);
                            $scope.tasks[i]["users"][j].firstname = response.data.firstname; 
                            $scope.tasks[i]["users"][j].lastname = response.data.lastname; 
                        });                          
                    }

                });                   
            }
        });        
    } 

});