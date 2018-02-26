angular.module('app.controllers')
    .controller('cartCtrl', function($rootScope, $scope,sharedCartService,$ionicPopup,$state,$ionicHistory, $cart, $ksFactory) {
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.cart = $cart.cart;


        $scope.removeFromCart=function(c_id){
            /*$scope.cart.drop(c_id);
            $scope.total_qty=sharedCartService.total_qty;
            $scope.total_amount=sharedCartService.total_amount;*/

        };

        $scope.inc=function(p_id) {
            $cart.add($rootScope.USER, p_id);
        };
        $scope.dec = function(p_id) {
            $cart.del($rootScope.USER, p_id);
        };

        $scope.checkout=function() {
            //if($scope.total_amount>0){
                $state.go('blank.checkOut');
            //}
            /*else{
                var alertPopup = $ionicPopup.alert({
                    title: 'No item in your Cart',
                    template: 'Please add Some Items!'
                });
            }*/
        };

    })
