angular.module('app.controllers')
    .controller('checkout2Ctrl', function ($rootScope, $scope, $ksFactory, $state, $ionicModal, $ionicActionSheet, $cart, $cordovaInAppBrowser) {
        $scope.cart = $cart.cart;
        $scope.address_id = $state.params.address_id;
        $scope.order_doc = "";
        $scope.data = {};
        $scope.data.pay_type = [];
        $scope.data.bank = [];
        $scope.loadData = function (idx) {
            $ksFactory.http($rootScope.URL + 'checkout_get.php', {

            }, function (res) {
                if (res.status == "Y") {
                    $scope.data.pay_type = res.pay_type;
                    $scope.data.bank = res.bank;
                } else {
                    $ksFactory.alert("Error เนื่องจาก " + res.error);
                }
            }, function (res) {
                $ksFactory.alert("Error เนื่องจาก " + $rootScope.MESSAGE.ERROR1);
            }, true);
        }
        $scope.selectPayType = function (idx) {
            for (var i = 0; i < $scope.data.pay_type.length; i++) {
                if (i != idx) $scope.data.pay_type[i].value = false;
            }
            $scope.data.pay_type[idx].value = true;
        }
        $scope.selectBank = function (idx) {
            for (var i = 0; i < $scope.data.bank.length; i++) {
                if (i != idx) $scope.data.bank[i].value = false;
            }
            $scope.data.bank[idx].value = true;
        }
        $scope.getPayType = function () {
            if ($scope.data.pay_type) {
                for (var i = 0; i < $scope.data.pay_type.length; i++) {
                    if ($scope.data.pay_type[i].value == true) return $scope.data.pay_type[i];
                }
            }
            return null;
        }
        $scope.getBank = function () {
            if ($scope.data.bank) {
                for (var i = 0; i < $scope.data.bank.length; i++) {
                    if ($scope.data.bank[i].value == true) return $scope.data.bank[i];
                }
            }
            return null;
        }
        $scope.checkout = function () {
            var pay_type = $scope.getPayType();
            console.log(pay_type);
            if (pay_type.pay_type_id == "1") {
                $scope.checkoutEndWay();
            } else if (pay_type.pay_type_id == "2") { 
                
            } else if (pay_type.pay_type_id == "3") {
                $scope.checkoutInternetBanking();
            }
        }
        $scope.checkoutEndWay = function () { 
            $ksFactory.confirm("คุณแน่ใจต้องการชำระเงินใช่หรือไม่ ?", function (rs) {
                if (rs) {
                    $ksFactory.http($rootScope.URL + 'checkout_endway.php', {
                        address_id: $scope.address_id,
                        u_id: $rootScope.USER.u_id,
                        uuid: $rootScope.DEVICE.uuid
                    }, function (res) {
                        if (res.status == "Y") {
                            $state.go('blank.checkoutSuccess', { order_doc: res.order_doc });
                        } else {
                            $ksFactory.alert("Error เนื่องจาก " + res);
                        }
                    }, function (res) {
                        $ksFactory.alert("Error เนื่องจาก " + $rootScope.MESSAGE.ERROR1);
                    }, true);
                }
            });
        }
        $scope.checkoutInternetBanking = function () { 
            var bank = $scope.getBank();
            $ksFactory.confirm("คุณแน่ใจต้องการชำระเงินใช่หรือไม่ ?", function (rs) {
                if (rs) { 
                    $ksFactory.http($rootScope.URL + 'checkout_internet_banking.php', {
                        url: $rootScope.URL,
                        address_id: $scope.address_id,
                        u_id: $rootScope.USER.u_id,
                        bank_code: bank.bank_code
                    }, function (res) {
                        if (res.status == "Y") {
                            $scope.order_doc = res.order_doc;
                            var options = {
                                location: 'yes',
                                clearcache: 'yes',
                                toolbar: 'yes'
                            };
                            $cordovaInAppBrowser.open(res.url, '_blank', options)
                                .then(function (event) {

                                })
                                .catch(function (event) {
                                    alert("NO")
                                });
                        } else {
                            $ksFactory.alert("Error เนื่องจาก " + res.error);
                        }
                    }, function (res) {
                        $ksFactory.alert("Error เนื่องจาก " + $rootScope.MESSAGE.ERROR1);
                    }, true);
                }
            });
        }




        $scope.$on('$ionicView.enter', function (scopes, states) {
            if ($rootScope.USER == null) {
				$ksFactory.alert($rootScope.MESSAGE.NOPERMIT);
				$state.go('tab.account');
				return;
            }
            $scope.loadData();
        });
        $scope.$on('$cordovaInAppBrowser:exit', function (e, event) {
            if ($scope.order_doc == "") return;
            $ksFactory.http($rootScope.URL + 'checkout_internet_banking_checking.php', {
                order_doc: $scope.order_doc,
                u_id: $rootScope.USER.u_id
            }, function (res) {
                if (res == "Y") {
                    $state.go('blank.checkoutSuccess', { order_doc: $scope.order_doc });
                }
            }, function (res) {
                $ksFactory.alert("Error เนื่องจาก " + $rootScope.MESSAGE.ERROR1);
            }, true);
        });
    })
