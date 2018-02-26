angular.module('app.controllers')
    .controller('notifyCtrl', function($scope, $timeout, $notification) {

        $scope.notification = $notification.noti.items;
        console.log( $scope.notification )

        $scope.data = [];
        $i = 0;
        $scope.getProductGuide = function() {
            $timeout(function() {
                console.log("AA");
                $scope.data.push($i++);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 1000);
        }
    })
