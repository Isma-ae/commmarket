angular.module('app.controllers')
    .controller('checkoutSuccessCtrl', function ($rootScope, $scope, $ksFactory, $state, $ionicModal, $ionicActionSheet, $cart, $notification, $stateParams) {

        $scope.data = {};
        $scope.getOrder = function() {
            var order_doc = $stateParams.order_doc;
            $ksFactory.http($rootScope.URL +'checkout_success.php', { order_doc: order_doc }, function(res) {
                if( res.data ) {
                    $scope.data.order = res.data;
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }

		$scope.$on('$ionicView.enter', function (scopes, states) {
            if ($rootScope.USER == null) {
				$ksFactory.alert($rootScope.MESSAGE.NOPERMIT);
				$state.go('tab.account');
				return;
            }
            $cart.update($rootScope.USER);
            $notification.update($rootScope.USER);
            $scope.getOrder();
		});
    })
