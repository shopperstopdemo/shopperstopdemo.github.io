
var adminApp = angular.module('adminApp', ['ngRoute','restangular','smart-table','ui.bootstrap']);



 adminApp
     .config(function(RestangularProvider) {
            RestangularProvider.setBaseUrl('https://shopperstopdemo.apispark.net/v1');
            RestangularProvider.addFullRequestInterceptor(function(element, operation, route, url, headers, params) {
              return {
                element: element,
                params: params,
                headers: _.extend(headers, {Authorization: 'Basic YzMwMWI4M2ItMzQ3OC00MjU2LTlkODMtN2E4ZDNhMzA0NGVjOmUxZjdmNjg3LWExZGMtNGU4OS1hZGQ1LTYxZjFiMGEwM2Y0MA=='})
              };
            });

        })
     .config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '../views/pages/dashboard.html',
                controller  : 'dashboardController'
            })

            // route for the users page
            .when('/users', {
                templateUrl : '../views/pages/users.html',
                controller  : 'userController'
            })
        
            .when('/user',{
                templateUrl : '../views/pages/userpage.html',
                controller  : 'userController'
            })

            // route for the products page
            .when('/products', {
                templateUrl : '../views/pages/products.html',
                controller  : 'productController'
            })
        
            .when('/product', {
                templateUrl : '../views/pages/productpage.html',
                controller  : 'productController'
            })

            // route for the stores page
            .when('/stores', {
                templateUrl : '../views/pages/stores.html',
                controller  : 'storeController'
            })
            
            .when('/store',{
                templateUrl : '../views/pages/storepage.html',
                controller  : 'storeController'
            });
     
     
    });



