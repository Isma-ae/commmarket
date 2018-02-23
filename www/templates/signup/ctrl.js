angular.module('app.controllers')
    .controller('signupCtrl', function($rootScope,$scope,$http,$state,$ionicHistory,$ksFactory) {
        $scope.data = {};
        $scope.signup=function(){
            var data = $scope.data;
            $ksFactory.http($rootScope.URL+'signup.php', {
                sale_cat: data.saler,
                comm: data.comm,
                name: data.name, 
                username : data.username, 
                password : data.password, 
                phone: data.phone , 
                address : data.address , 
                market : data.market 
            },function(res) {
                if( res=='true' ) {
                    $ksFactory.alert("สำเร็จ");
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            });
        }
    })