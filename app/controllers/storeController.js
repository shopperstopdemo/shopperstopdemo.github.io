adminApp.controller('storeController', function ($scope, $rootScope, Restangular, $http) {
    $scope.message = 'This is Stores Board';

    var products = Restangular.all('products');

    var stores = Restangular.all('stores');


    if ($rootScope.allProducts == undefined) {
        products.getList({
            $size: 200,
            $sort: 'product_id'
        }).then(function (products) {
            $rootScope.allProducts = products;
        });

    }

    if ($rootScope.allStores == undefined) {
        stores.getList({
            $sort: 'store_id'
        }).then(function (stores) {
            $rootScope.allStores = stores;
        })
    }


    $scope.deleteStore = function () {

    }

    $scope.editStore = function () {

    }

    $scope.addNewStore = function () {
        console.log("Hello");
        $scope.editMode = true;
    }

    $scope.setStore = function (store) {
        console.log("In set")
        $rootScope.seletecteStore = store;
    }



});