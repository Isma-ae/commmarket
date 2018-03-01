<?php
	header("Access-Control-Allow-Origin: *");
	
	include("config.php");
	$sale_cat = @$_POST["sale_cat"];
	$comm = @$_POST["comm"];
	$name = @$_POST["name"];
	$username = @$_POST["username"];
	$password = @$_POST["password"];
	$phone = @$_POST["phone"];
	$address = @$_POST["address"];
	$market = @$_POST["market"];

	if( $name=="" ) {
		echo "Name is empty.";
		exit();
	}
	/*if( $username=="" ) {
		echo "Username is empty.";
		exit();
	}*/
	// database query insert ....
	$sql = "SELECT * FROM users WHERE u_username = '$username'";
	$result = $DATABASE->QueryObj( $sql );
	$row = sizeof($result);
	if($row > 0) {
		echo "username is used";
		exit();
	}
	$id = $DATABASE->QueryMaxId("users","u_id");
	$sql = "
		INSERT INTO users (
			u_id,
			u_comm,
			u_name,
			u_username,
			u_password,
			u_phone,
			u_address,
			u_market,
			sale_cat,
			`status`,
			`confirm`
		) VALUES (
			'".$id."',
			'".$DATABASE->Escape($comm)."',
			'".$DATABASE->Escape($name)."',
			'".$DATABASE->Escape($username)."',
			'".$DATABASE->Escape($password)."',
			'".$DATABASE->Escape($phone)."',
			'".$DATABASE->Escape($address)."',
			'".$DATABASE->Escape($market)."',
			'".$sale_cat."',
			'N',
			'".md5($username)."'
		)
	";
	if($DATABASE->Query($sql)) {
		$title = "ยืนยันการสมัครสมาชิก COMMMARKET";
		$message = '
				คุณสามารถยืนยันการสมัครสมาชิก COMMMARKET คลิกปุ่มนี้ <br>
				<a href="http://localhost/server/signup_confirm.php?confirm='.md5($username).'" target="_blank">ยืนยันการสมัคร</a>
		';
		sendMail($username, $title, $message);
		echo "true";
	} else {
		echo "เกิดข้อผิดพลาดการติดต่อฐานข้อมูล";
	}