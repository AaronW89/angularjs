angular.module('RouteControllers', [])
    .controller('HomeController', function($scope){
        $scope.title= "welcome To Angular Todo! :)";
    })
    .controller('RegisterController', function($scope, UserAPIService, store) {
 
        $scope.registrationUser = {};
        
        store.remove("testObject");
        
        var URL = "https://morning-castle-91468.herokuapp.com/"
        
        $scope.login = function(){
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results){
                $scope.token = results.data.token;
                store.set("username", $scope.registrationUser.username);
                store.set("authToken", $scope.token);
            }).catch(function(err){
                console.log(err.data);
            });
            
        }
       
 
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
                
                
                UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results){
                    $scope.data= results.data;
                    alert("yay! you have successfully registered!");
                    $scope.login();
                }).catch(function(err){
                    alert("oh no! something went wrong");
                });
                console.log(alert);
            }
 
            // console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
        };
    })
    .controller('todoController', function($scope, $location, todoAPIService, store){
        var URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.authToken = store.get("authToken");
        $scope.username = store.get("username");
        
        $scope.todos=[];
        todoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results){
            $scope.todos = results.data ||[];
        }).catch(function(err){
            console.log(err.data);
        });
        
        $scope.submitForm = function(){
            if($scope.todoForm.$valid){
               $scope.todo.username = $scope.username;
               $scope.todos.push($scope.todo);
               
               todoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results){
                   console.log(results);
               }).catch(function(err){
                   console.log(err.data);
               });
            }
        }
        var URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.deleteTodo = function(id){
            todoAPIService.deleteTodo(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results){
                console.log(results);
            }).catch(function(err){
                console.log(err.data);
            })
        }
         
    })
    
    .controller('EditTodoController', function($scope, $location, $routeParams, todoAPIService, store) {
        var id = $routeParams.id;
        var URL = "https://morning-castle-91468.herokuapp.com/";
        $scope.authToken = store.get("authToken");
        $scope.username = store.get("username");
 
        todoAPIService.getTodos(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err);
        });
        
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
 
                todoAPIService.editTodo(URL + "todo/" + id, $scope.todo, $scope.authToken).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err.data);
                })
            }
        }
    });
   