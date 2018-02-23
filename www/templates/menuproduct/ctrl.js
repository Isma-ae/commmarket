angular.module('app.controllers')
    .controller('menuproductCtrl', function($rootScope, $scope,$state,$ksFactory,$location,$cart) {
        $scope.u_id = "1";
        $scope.id = $state.params.id;
        $scope.menu_items = [];
        $ksFactory.http($rootScope.URL+"product.php", {
            cat_id:$scope.id
        }, function(res) {
             $scope.menu_items = res;
        }, function(res) {
            $ksFactory.alert("Error เนื่องจาก "+res);
        }, true);

        $scope.showProductInfo = function(id) {
		    $location.path("/tab/product/"+id);
	    };
	    $scope.addCart = function(p_id) {
            $cart.add($scope.u_id, p_id);
        };
    })