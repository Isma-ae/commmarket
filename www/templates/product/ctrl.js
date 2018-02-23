angular.module('app.controllers')
    .controller('productCtrl', function($rootScope, $scope,$state,$ksFactory) {
        //$scope.id= sessionStorage.getItem('product_info_id');
        /*$scope.desc= sessionStorage.getItem('product_info_desc');
        $scope.img= "img/"+ sessionStorage.getItem('product_info_img')+".jpg";
        $scope.name= sessionStorage.getItem('product_info_name');
        $scope.price= sessionStorage.getItem('product_info_price');*/

        $scope.id = $state.params.id;
        $scope.data = {};
        $ksFactory.http($rootScope.URL+"get_product.php", {
            p_id:$scope.id
        }, function(res) {
            if( res.data.p_id ) {
                $scope.data = res.data;
            } else {
                $ksFactory.alert("Error เนื่องจาก "+res.data);
            }
        }, function(res) {
            $ksFactory.alert("Error เนื่องจาก "+res);
        }, true);
    })