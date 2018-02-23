angular.module('app.controllers')
    .controller('homeCtrl', function($rootScope,$scope,$http,$state,$location,$ionicHistory,$ksFactory,$cart,$timeout) {
        //alert("Home");
        $scope.slide_items=[    
            {
                "p_id":"1",
                "p_image_id":"ecommerce",
            },
            {
                "p_id":"2",
                "p_image_id":"ecommerce",
            },
            {
                "p_id":"3",
                "p_image_id":"ecommerce",
            }
        ];

        $scope.category = [];
        $scope.product = [];
        $scope.isMoreProductGuide = true;
        $scope.isMode2Loading = false;

        $scope.getCategory = function() {
            $ksFactory.http($rootScope.URL+'categories_get.php', { }, function(res) {
                if( res.data ) {
                    $scope.category = res.data;
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }
        $scope.getProductGuide = function(mode) {
            $ksFactory.http($rootScope.URL+'product_guide_get.php', { 
                num: $scope.product.length,
                mode: mode
            }, function(res) {
                if( res.data ) {
                    $scope.product = res.data;
                    $scope.isMoreProductGuide = res.isMoreProductGuide;
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, false);
        }

        $scope.showProduct = function(product) {
		    $location.path("/tab/menuproduct/"+product.cat_id);
	    };
        $scope.showProductInfo = function(product) {
		    $location.path("/tab/product/"+product.p_id);
	    };
	    $scope.addCart = function(product) {
            $cart.add($rootScope.USER, product.p_id);
        };


        $scope.$on('$ionicView.enter', function(scopes, states) {
            $scope.getCategory();
            $scope.getProductGuide(2);
        });
    })