angular.module('app.controllers')
    .controller('accountCtrl', function($rootScope, $scope, $ksFactory, $cart) {
        $scope.auth = {};
        $scope.auth.email = "eee@gmail.com";
        $scope.auth.password = "138193";

        $scope.auth.user = $ksFactory.storage.get("user");

        $scope.logout = function() {
            $ksFactory.storage.unset("user");
            $scope.auth.user = null;
            $rootScope.USER = null;
            $cart.get($rootScope.USER, function(cart) {
                
            });
        }
        $scope.login = function() {
            var auth = $scope.auth;
            $ksFactory.http($rootScope.URL+'login.php', {
                email : auth.email,
                password : auth.password,
                uuid: $rootScope.DEVICE.uuid
            }, function(res) {
                if( res.status=='Y' ) {
                    $scope.auth.user = res.user;
                    $ksFactory.storage.set("user", $scope.auth.user);
                    $rootScope.USER = res.user;
                    $cart.get($rootScope.USER, function(cart) {
                
                    });
                } else if( res.status=='N' ) {
                    $ksFactory.alert("Error เนื่องจาก "+res.msg);
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }
    })