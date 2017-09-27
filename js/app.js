angular.module('todoApp',['ngRoute', 'RouteControllers']);
angular.module('todoApp').config(function($locationProvider, $routeProvider){
    $locationProvider.html5Mode(true);
    
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html', controller: 'HomeController'    
    })
    .when('/acounts/register',{
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });
})