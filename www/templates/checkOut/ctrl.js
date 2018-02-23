angular.module('app.controllers')
.controller('checkOutCtrl', function($scope) {
	$scope.loggedin=function(){
		if(sessionStorage.getItem('loggedin_id')==null){return 1;}
		else{
			$scope.loggedin_name= sessionStorage.getItem('loggedin_name');
			$scope.loggedin_id= sessionStorage.getItem('loggedin_id');
			$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
			$scope.loggedin_address= sessionStorage.getItem('loggedin_address');
			$scope.loggedin_pincode= sessionStorage.getItem('loggedin_pincode');
			return 0;
		}
	};
})