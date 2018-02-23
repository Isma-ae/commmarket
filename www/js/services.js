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









.factory('sharedCartService', ['$ionicPopup',function($ionicPopup) {
	var cartObj = {};
	cartObj.cart=[];
	cartObj.total_amount=0;
	cartObj.total_qty=0;
	
	cartObj.cart.add=function(id,image,name,price,qty){
		if( cartObj.cart.find(id)!=-1 ){
			var alertPopup = $ionicPopup.alert({
                title: 'Product Already Added',
                template: 'Increase the qty from the cart'
            });
		}
		else{
		    cartObj.cart.push( { "cart_item_id": id , "cart_item_image": image , "cart_item_name": name , "cart_item_price": price , "cart_item_qty": qty } );
			cartObj.total_qty+=1;	
			cartObj.total_amount+=parseInt(price);	
		}
	};
	
	cartObj.cart.find=function(id){	
		var result=-1;
		for( var i = 0, len = cartObj.cart.length; i < len; i++ ) {
			if( cartObj.cart[i].cart_item_id === id ) {
				result = i;
				break;
			}
		}
		return result;
	};
	
	cartObj.cart.drop=function(id){
	 var temp=cartObj.cart[cartObj.cart.find(id)];
	 cartObj.total_qty-= parseInt(temp.cart_item_qty);
	 cartObj.total_amount-=( parseInt(temp.cart_item_qty) * parseInt(temp.cart_item_price) );
	 cartObj.cart.splice(cartObj.cart.find(id), 1);

	};
	
	cartObj.cart.increment=function(id){
		 cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
		 cartObj.total_qty+= 1;
		 cartObj.total_amount+=( parseInt( cartObj.cart[cartObj.cart.find(id)].cart_item_price) );	
	};
	
	cartObj.cart.decrement=function(id){
		
		 cartObj.total_qty-= 1;
		 cartObj.total_amount-= parseInt( cartObj.cart[cartObj.cart.find(id)].cart_item_price) ;
		 

		 if(cartObj.cart[cartObj.cart.find(id)].cart_item_qty == 1){ 
			cartObj.cart.splice( cartObj.cart.find(id) , 1); 
		 }else{
			cartObj.cart[cartObj.cart.find(id)].cart_item_qty-=1;
		 }
	
	};
	
	return cartObj;
}])

.factory('sharedFilterService', [function(){

	var obj = {};
    obj.str = "http://localhost/server/food_menu.php?till=";
	obj.sort = "";
	obj.search = "";
	obj.category = "";
	obj.till=0;
	
	
	
	obj.getUrl=function(){
		
		obj.till=obj.till + 5;
		obj.str="http://localhost/server/food_menu.php?till="+obj.till; 
		
		if(obj.sort!="" && obj.category!=""){
			obj.str= obj.str+"&category="+obj.category+"&sort="+obj.sort;
		}
		else if(obj.category!="" ){
			obj.str= obj.str+"&category="+obj.category;
		}
		else if(obj.sort!=""){  
			obj.str= obj.str+"&sort="+obj.sort;
		}
		console.log("URL",obj.str);
		return obj.str;
	};
	return obj;
}])



.service('BlankService', [function(){

}])