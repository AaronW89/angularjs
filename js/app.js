angular.module('todoApp',['ngRoute', 'RouteControllers',"UserService", 'angular-storage', 'todoService']);
    

angular.module('todoApp').config(function($locationProvider, $routeProvider){
    $locationProvider.html5Mode(true);
    
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html', controller: 'HomeController'    
    })
    .when('/acounts/register',{
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })
    .when('/todo',{
        templateUrl: 'templates/todo.html',
        controller: 'todoController'
    })
    .when('/todo/edit/:id', {
        templateUrl:'templates/edit-todo.html',
        controller: 'EditTodoController'
    });
})