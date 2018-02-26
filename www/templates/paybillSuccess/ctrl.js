angular.module('app.controllers')
	.controller('paybillSuccessCtrl', function ($rootScope, $scope, $ksFactory, $state, $ionicModal, $ionicActionSheet, $cart, $stateParams) {

        $scope.data = {};
        $scope.getOrder = function() {
            var order_doc = $stateParams.order_doc;
            $ksFactory.http($rootScope.URL+'order_get.php', { order_doc: order_doc }, function(res) {
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
            $cart.update();
            $scope.getOrder();
		});
    })
