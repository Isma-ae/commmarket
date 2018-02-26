// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova','app.controllers', 'app.routes', 'app.services', 'app.directives', 'ksLibrary'])
    .run(function ($ionicPlatform, $rootScope, $cordovaDevice, $ksFactory, $cart, $notification, $location) {
        $rootScope.URL = "http://desktop-kmmts8l/server/";
        $rootScope.MESSAGE = {
            ERROR1 : "ติดต่อแม่ข่ายไม่ได้",
            NOPERMIT : "กรุณาเข้าสู่ระบบก่อนใช้งาน",
            SUCCESS : "บันทึกข้อมูลสำเร็จ",
            NOSUCCESS : "ไม่สามารถบันทึกข้อมูลได้",
            CONFIRM_DEL : "คุณต้องการลบข้อมูลใช่หรือไม่ ?"
        }
        $rootScope.DEVICE = {}; //
        $rootScope.USER = $ksFactory.storage.get("user");

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            /*window.plugins.OneSignal
                .startInit("795faf89-a2b3-4ec7-ace0-1853e0ee0fe1")
                .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
                .handleNotificationReceived(function(jsonData) {
                    //alert('handleNotificationReceived: ' + JSON.stringify(jsonData));
                })
                .handleNotificationOpened(function(jsonData) {
                    //alert('handleNotificationOpened: ' + JSON.stringify(jsonData));
                })
                .endInit();
                window.plugins.OneSignal.registerForPushNotifications();
                window.plugins.OneSignal.getIds(function(ids) {
                    $ksFactory.http($rootScope.URL+'push_add.php', {
                        u_id: $rootScope.USER.u_id,
                        player_id: ids.userId
                    }, function(res) {

                    }, function(res) {

                    }, false);
                });
            */



            $rootScope.DEVICE = ionic.Platform.device();
            $cart.get($rootScope.USER);

            $location.path("/tab/home");
            //$location.path("/blank/paybillSuccess/ORD0000001");
        });
    })
