angular.module('app.controllers')
    .controller('notifyCtrl', function ($rootScope, $scope, $timeout, $notification) {

        $scope.notification = $notification.noti;

        $scope.$on('$ionicView.enter', function (scopes, states) {
            $notification.update( $rootScope.USER );
        });
    })
