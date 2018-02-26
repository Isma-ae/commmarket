angular.module('app.services', [])

.factory("$cart", function($rootScope, $ionicPlatform, $ksFactory) {
	var $objCart = {};
	$objCart.cart = {};
	$objCart.cart.items = [];
	$objCart.cart.qty = 0;
	$objCart.cart.price = 0;
	var sum_amont_price = function() {
		$objCart.cart.qty = 0;
		$objCart.cart.price = 0;
		var len = $objCart.cart.items.length;
		for(var i=0;i<len;i++) {
			$objCart.cart.qty = $objCart.cart.qty + $objCart.cart.items[i].c_qty*1;
			$objCart.cart.price = $objCart.cart.price + $objCart.cart.items[i].c_price*1;
		}
    }
    $objCart.update = function(user,callback) {
        $objCart.get(user, callback);
    }
	$objCart.get = function(user,callback) {
		$ionicPlatform.ready(function () {
			var u_id = ( !user ) ? "" : user.u_id;
			$ksFactory.http($rootScope.URL+"cart_get.php", {
				u_id: u_id,
				uuid: $rootScope.DEVICE.uuid
			}, function(res) {
				$objCart.cart.items = res.data;
				sum_amont_price();
				if(callback) callback($objCart.cart);
			}, function(res) {
				$ksFactory.alert("Error เนื่องจาก "+res);
			}, true);
		});
	}
	$objCart.add = function(user, p_id, callback) {
		var u_id = ( !user ) ? "" : user.u_id;
		$ksFactory.http($rootScope.URL+"cart_add.php", {
			u_id: u_id,
			p_id: p_id,
			uuid: $rootScope.DEVICE.uuid
		}, function(res) {
			$objCart.get(user, function() {
				if(callback) callback();
			});
		}, function(res) {
			$ksFactory.alert("Error เนื่องจาก "+res);
		}, true);
	}
	$objCart.del = function(user, p_id, callback) {
		var u_id = ( !user ) ? "" : user.u_id;
		$ksFactory.http($rootScope.URL+"cart_del.php", {
			u_id: u_id,
			p_id: p_id,
			uuid: $rootScope.DEVICE.uuid
		}, function(res) {
			$objCart.get(user, function() {
				if(callback) callback();
			});
		}, function(res) {
			$ksFactory.alert("Error เนื่องจาก "+res);
		}, true);
	}
	$objCart.del_all = function(user, p_id, callback) {
		var u_id = ( !user ) ? "" : user.u_id;
		$ksFactory.http($rootScope.URL+"cart_del_all.php", {
			u_id: u_id,
			p_id: p_id,
			uuid: $rootScope.DEVICE.uuid
		}, function(res) {
			$objCart.get(user, function() {
				if(callback) callback();
			});
		}, function(res) {
			$ksFactory.alert("Error เนื่องจาก "+res);
		}, true);
	}
	return $objCart;
})

.factory("$notification", function($rootScope, $ionicPlatform, $ksFactory) {
	var $objNotification = {};
    $objNotification.noti = {};
    $objNotification.noti.items = [];
    $objNotification.noti.qty = 0;
    var sum_qty = function() {
		$objNotification.noti.qty = 0;
		var len = $objNotification.noti.items.length;
		for(var i=0;i<len;i++) {
            $objNotification.noti.qty++;
			//$objNotification.noti.qty = $objNotification.noti.qty + $objNotification.noti.items[i].c_qty*1;
		}
    }
	$objNotification.get = function(user,callback) {
		$ionicPlatform.ready(function () {
			var u_id = ( !user ) ? "" : user.u_id;
			$ksFactory.http($rootScope.URL+"notification_get.php", {
				u_id: u_id,
			}, function(res) {
                $objNotification.noti.items = res.data;
				if(callback) callback(res.data);
			}, function(res) {
				$ksFactory.alert("Error เนื่องจาก "+res);
			}, true);
		});
	}
	/*$objNotification.add = function(user, p_id, callback) {
		var u_id = ( !user ) ? "" : user.u_id;
		$ksFactory.http($rootScope.URL+"cart_add.php", {
			u_id: u_id,
			p_id: p_id,
			uuid: $rootScope.DEVICE.uuid
		}, function(res) {
			$objCart.get(user, function() {
				if(callback) callback();
			});
		}, function(res) {
			$ksFactory.alert("Error เนื่องจาก "+res);
		}, true);
	}
	$objNotification.del = function(user, p_id, callback) {
		var u_id = ( !user ) ? "" : user.u_id;
		$ksFactory.http($rootScope.URL+"cart_del.php", {
			u_id: u_id,
			p_id: p_id,
			uuid: $rootScope.DEVICE.uuid
		}, function(res) {
			$objCart.get(user, function() {
				if(callback) callback();
			});
		}, function(res) {
			$ksFactory.alert("Error เนื่องจาก "+res);
		}, true);
	}
	$objNotification.del_all = function(user, p_id, callback) {
		var u_id = ( !user ) ? "" : user.u_id;
		$ksFactory.http($rootScope.URL+"cart_del_all.php", {
			u_id: u_id,
			p_id: p_id,
			uuid: $rootScope.DEVICE.uuid
		}, function(res) {
			$objCart.get(user, function() {
				if(callback) callback();
			});
		}, function(res) {
			$ksFactory.alert("Error เนื่องจาก "+res);
		}, true);
	}*/
	return $objNotification;
})


.service('BlankService', [function(){

}])
