adminApp.controller('productController', function ($scope, $rootScope, Restangular, $http) {


    var products = Restangular.all('products');

    var stores = Restangular.all('stores');

    $scope.editMode = false;

//    $scope.product_descriptions = [];


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

    $scope.setProduct = function (product) {

        $rootScope.selectedProduct = product;
        
        $rootScope.displayedProduct = _.clone(product);

        var descriptions = [];

        var descs = $rootScope.displayedProduct.product_description.split(";");
        for (var idx in descs) {
            if (descs[idx].trim() !== '') {
                var descriptionValues = descs[idx].trim().split("#");
                console.log(descriptionValues);
                descriptions.push(descriptionValues);
            }

        }
       // $scope.product_descriptions = descriptions;
        
        var images = $rootScope.displayedProduct.product_images.filter(onlyUnique);
        
        $rootScope.displayedProduct.product_images = images;
        
        $rootScope.displayedProduct.descriptions = descriptions;

    }

    $scope.addNewProduct = function () {
        console.log("Hello");
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    
    $scope.editProduct =function(selectedProduct){
        console.log("in edit");
        console.log( $rootScope.selectedProduct);
        $rootScope.selectedProduct.product_name = "Gini & JonyNavy Blue Casual Dress";
        $rootScope.selectedProduct.put();
        $rootScope.displayedProduct.product_name = $rootScope.selectedProduct.product_name;
    }




});