// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova','app.controllers', 'app.routes', 'app.services', 'app.directives', 'ksLibrary'])
    .run(function ($ionicPlatform, $rootScope, $cordovaDevice, $ksFactory) {
        $rootScope.URL = "http://desktop-kmmts8l/server/";
        $rootScope.MESSAGE = {
            ERROR1 : "ติดต่อแม่ข่ายไม่ได้",
            NOPERMIT : "กรุณาเข้าสู่ระบบก่อนใช้งาน",
            SUCCESS : "บันทึกข้อมูลสำเร็จ",
            NOSUCCESS : "ไม่สามารถบันทึกข้อมูลได้"
        }
        $rootScope.DEVICE = {};
        $rootScope.USER = $ksFactory.storage.get("user");


        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            $rootScope.DEVICE = ionic.Platform.device();
        });
    })