angular.module('app.controllers')
    .controller('accountCtrl', function($rootScope, $scope, $ksFactory, $cart, $notification) {
        $scope.auth = {};
        $scope.auth.email = "eee@gmail.com";
        $scope.auth.password = "138193";

        $scope.auth.user = $ksFactory.storage.get("user");

        $scope.logout = function() {
            $ksFactory.storage.unset("user");
            $scope.auth.user = null;
            $rootScope.USER = null;
            $cart.update($rootScope.USER);
            $notification.update($rootScope.USER);
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
                    $cart.update($rootScope.USER);
                    $notification.update($rootScope.USER);
                    if ($rootScope.DEVICE.uuid) {
                        window.plugins.OneSignal.getIds(function (ids) {
                            $ksFactory.http($rootScope.URL + 'push_add.php', {
                                u_id: $rootScope.USER.u_id,
                                player_id: ids.userId
                            }, function (res) {

                            }, function (res) {

                            }, false);
                        });
                    }
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