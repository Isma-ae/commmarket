<?php
	header("Access-Control-Allow-Origin: *");
	
	include("config.php");
	$confirm = @$_GET["confirm"];

	$sql = "SELECT * FROM users WHERE confirm = '$confirm' AND confirm != '' ";
	$obj = $DATABASE->QueryObj( $sql );
	if( sizeof($obj)==1 ) {
		if( $obj[0]["status"]=="Y" ) {
			echo "คุณได้ทำการยืนยันแล้ว";
		} else {
			$DATABASE->Query( "UPDATE users SET `status`='Y' WHERE confirm = '$confirm' " );
			echo "ระบบได้ทำการยืนยันการสมัครสมาชิกของคุณเสร็จเรียบร้อย คุณสามารถทำการเข้าสู่ระบบได้";
		}
	} else {
		echo "ไม่พบข้อมูล";
	}


	    