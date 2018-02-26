angular.module('app.controllers', [])
	.controller('appCtrl', function($rootScope, $scope, $cart, $notification, $location, $state, $ksFactory) {
        $scope.cart = $cart.cart;

        $notification.get($rootScope.USER, function(data) {
            $scope.notification = data;
            $scope.qty = data.length;
        });
	})



.controller('filterByCtrl', function($scope,sharedFilterService) {

  $scope.Categories = [
    {id: 1, name: 'ข้าวของ เครื่องใช้'},
    {id: 2, name: 'อาหาร'}
  ];

  $scope.getCategory = function(cat_list){
    categoryAdded = cat_list;
	var c_string="";

	for(var i=0;i<categoryAdded.length;i++){ c_string+=(categoryAdded[i].id+"||"); }

	c_string = c_string.substr(0, c_string.length-2);
	sharedFilterService.category=c_string;
	window.location.href = "#/page1";
  };


})

.controller('sortByCtrl', function($scope,sharedFilterService) {
	$scope.sort=function(sort_by){
		sharedFilterService.sort=sort_by;
		console.log('sort',sort_by);
		window.location.href = "#/page1";
	};
})

.controller('paymentCtrl', function($scope) {

})

.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,$state) {

		$scope.loggedin_name= sessionStorage.getItem('loggedin_name');
		$scope.loggedin_id= sessionStorage.getItem('loggedin_id');
		$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
		$scope.loggedin_address= sessionStorage.getItem('loggedin_address');
		$scope.loggedin_pincode= sessionStorage.getItem('loggedin_pincode');


		$scope.logout=function(){
				delete sessionStorage.loggedin_name;
				delete sessionStorage.loggedin_id;
				delete sessionStorage.loggedin_phone;
				delete sessionStorage.loggedin_address;
				delete sessionStorage.loggedin_pincode;

				console.log('Logoutctrl',sessionStorage.getItem('loggedin_id'));

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('menu', {}, {location: "replace", reload: true});
		};
})

.controller('myOrdersCtrl', function($scope) {

})

.controller('editProfileCtrl', function($scope) {

})

.controller('favoratesCtrl', function($scope) {

})



