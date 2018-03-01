<?php
	header("Access-Control-Allow-Origin: *");

	include("config.php");

	$email = @$_POST["email"];
	$password =@$_POST["password"];
	$uuid = @$_POST["uuid"];
    $ip = get_client_ip();

	$return = array();

	$sql = "SELECT * FROM users WHERE u_username = '$email' AND u_password = '$password' AND `status`='Y' ";
	$obj = $DATABASE->QueryObj( $sql );
	if(sizeof($obj) == 1) {
		$u_id = $obj[0]["u_id"];
		$condition = "";
		if( $uuid=="" ) {
			$condition = " tb_cart.u_id='0' AND tb_cart.ip='".$ip."' ";
		} else {
			$condition = " tb_cart.u_id='0' AND tb_cart.ip='".$ip."' AND uuid='".$uuid."' ";
		}
		$sql1 = "SELECT * FROM tb_cart WHERE ".$condition." ";
		$obj1 = $DATABASE->QueryObj( $sql1 );
		foreach($obj1 as $row1) {
			$cart_id1 = $row1["cart_id"];
			$p_id1 = $row1["p_id"];
			$c_qty1 = $row1["c_qty"];
			$c_price1 = $row1["c_price"];
			$sql2 = "SELECT * FROM tb_cart WHERE tb_cart.u_id='".$u_id."' AND p_id='".$p_id1."' ";
			$obj2 = $DATABASE->QueryObj( $sql2 );
			if( sizeof($obj2)==0 ) {
				$DATABASE->Query( "UPDATE tb_cart SET u_id='".$u_id."' WHERE cart_id=".$cart_id1." " );
			} else {
				$cart_id2 = $obj2[0]["cart_id"];
				$DATABASE->Query( "
						UPDATE tb_cart SET 
							u_id='".$u_id."',
							c_qty=c_qty+".$c_qty1.",
							c_price=c_price+".$c_price1."
						WHERE cart_id=".$cart_id2." 
				" );
				$DATABASE->Query( "DELETE FROM tb_cart WHERE cart_id=".$cart_id1." " );
			}
		}
		$return["status"] = "Y";
		$return["user"] = $obj[0];
	} else {
		$return["status"] = "N";
		$return["msg"] = "Login fail.";
	}
	echo json_encode($return);