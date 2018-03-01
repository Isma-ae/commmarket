angular.module('app.controllers')
    .controller('cartCtrl', function($rootScope, $scope,$ionicPopup,$state,$ionicHistory, $cart, $ksFactory) {
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.cart = $cart.cart;
        $scope.delAll = function (p_id) {
            $ksFactory.confirm($rootScope.MESSAGE.CONFIRM_DEL, function (rs) { 
                if (rs) { 
                    $cart.del_all($rootScope.USER, p_id);
                }
            });
        };
        $scope.add = function(p_id) {
            $cart.add($rootScope.USER, p_id);
        };
        $scope.del = function(p_id) {
            $cart.del($rootScope.USER, p_id);
        };
        $scope.checkout=function() {
            $state.go('blank.checkout1');
        };
        $scope.$on('$ionicView.enter', function (scopes, states) {
            $cart.update($rootScope.USER);
        });
    })
