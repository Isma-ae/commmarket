angular.module('app.controllers')
	.controller('checkout1Ctrl', function ($rootScope, $scope, $ksFactory, $state, $ionicModal, $ionicActionSheet, $cart) {
        $scope.cart = $cart.cart;
		$scope.data = {};
        $scope.getAddress = function() {
            $ksFactory.http($rootScope.URL+'user_address_get.php', { u_id: $rootScope.USER.u_id }, function(res) {
                if( res.data ) {
                    $scope.data.address = res.data;
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }
		$scope.selectAddress = function (idx) {
			for (var i = 0; i < $scope.data.address.length; i++) {
				if (i != idx) $scope.data.address[i].value = false;
			}
			$scope.data.address[idx].value = true;
		}
        $scope.modal_address_id = "";
		$scope.openModaldAddress = function () {
			$scope.modal_address.show();
		};
		$ionicModal.fromTemplateUrl('templates/checkout1/modal-address.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal_address = modal;
		});
		$scope.$on('$destroy', function () {
			$scope.modal_address.remove();
        });
        $scope.$on('modal.hidden', function() {
            $scope.modal_address_id = "";
            $scope.data.u_name = "";
            $scope.data.u_phone = "";
            $scope.data.u_address = "";
        });
        $scope.addAddress = function() {
            $ksFactory.http($rootScope.URL+'user_address_add.php', {
                u_id: $rootScope.USER.u_id,
                u_name: $scope.data.u_name,
                u_phone: $scope.data.u_phone,
                u_address: $scope.data.u_address
            }, function(res) {
                if( res=="Y" ) {
                    $scope.getAddress();
                    $scope.modal_address.hide();
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        };
        $scope.editAddress = function() {
            $ksFactory.http($rootScope.URL+'user_address_edit.php', {
                id: $scope.modal_address_id,
                u_id: $rootScope.USER.u_id,
                u_name: $scope.data.u_name,
                u_phone: $scope.data.u_phone,
                u_address: $scope.data.u_address
            }, function(res) {
                if( res=="Y" ) {
                    $scope.getAddress();
                    $scope.modal_address.hide();
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        };
        $scope.manageAddress = function(data) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'แก้ไข' },
                    { text: 'ลบ' }
                ],
                titleText: 'จัดการทีอยู่',
                buttonClicked: function(index) {
                    if( index==0 ) $scope.openModaldAddressEdit(data);
                    if( index==1 ) $scope.delAddress(data);
                    return true;
                }
              });
        }
        $scope.openModaldAddressEdit = function(data) {
            $scope.modal_address_id = data.id;
            $scope.data.u_name = data.u_name;
            $scope.data.u_address = data.u_address;
            $scope.data.u_phone = data.u_phone;
            $scope.openModaldAddress();
        }
        $scope.delAddress = function(data) {
            $ksFactory.confirm($rootScope.MESSAGE.CONFIRM_DEL, function(rs) {
                if( rs ) {
                    $ksFactory.http($rootScope.URL+'user_address_del.php', {
                        id: data.id,
                    }, function(res) {
                        if( res=="Y" ) {
                            $scope.getAddress();
                        } else {
                            $ksFactory.alert("Error เนื่องจาก "+res);
                        }
                    }, function(res) {
                        $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
                    }, true);
                }
            });
        }
        $scope.checkout = function () {
            var address = $scope.getUserAddress();
            var address_id = address.id;
            $state.go('blank.checkout2', { address_id: address_id});
        }
        $scope.getUserAddress = function() {
            if( $scope.data.address ) {
                for (var i = 0; i < $scope.data.address.length; i++) {
                    if( $scope.data.address[i].value==true ) return $scope.data.address[i];
                }
            }
            return null;
        }
		$scope.$on('$ionicView.enter', function (scopes, states) {
            if ($rootScope.USER == null) {
				$ksFactory.alert($rootScope.MESSAGE.NOPERMIT);
				$state.go('tab.account');
				return;
            }
            if ($scope.getUserAddress()==null) $scope.getAddress();
		});
    })
