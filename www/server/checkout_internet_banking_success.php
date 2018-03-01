<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");

    $order_doc = @$_GET["order_doc"];
    $u_id = @$_GET["u_id"];
    $order = getOrder($order_doc, $u_id);
	if( $order!=false && chkCharge($order_doc) ) {
		$noti = new notification();
	    $noti->setTile("Commmarket");
	    $noti->setMessage("มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ");
	    foreach( $order as $row ) {
	        $order_id = $row["order_id"];
	        $u_id_saler = $row["u_id_saler"];
	        $noti->addUser( $u_id_saler );
	    }
	    $DATABASE->Query( "UPDATE tb_order SET `status`='Y' WHERE order_doc='".$order_doc."'" );
	    $DATABASE->Query( "DELETE FROM tb_cart WHERE u_id='".$u_id."'" );

	    $noti->send();
	    echo '
	    	ชำระเงินสำเร็จ <br>
	    	<button type="button" onclick="window.close()">ปิด</button>
	    ';
	} else {
		echo '
	    	ไม่สำเร็จ <br>
	    	<button type="button" onclick="window.close()">ปิด</button>
	    ';
    	exit();
	}

    function chkCharge($order_doc) {
    	global $DATABASE;
    	$sql = "
				SELECT charge_id
				FROM tb_charges_history
				WHERE order_doc='".$order_doc."'
				ORDER BY ordered DESC
				LIMIT 1
	    ";
	    $charge_id = $DATABASE->QueryString( $sql );
	    if( $charge_id==null || $charge_id=="" ) {
	    	return false;
	    }
    	$charge = OmiseCharge::retrieve($charge_id);
    	if( $charge["status"]=="successful" ) {
    		return true;
    	}
    	return false;
    }
    function getOrder($order_doc, $u_id) {
    	global $DATABASE;
    	$sql = "SELECT * FROM tb_order WHERE order_doc='".$order_doc."' AND u_id='".$u_id."' AND `status`='N' ";
	    $order = $DATABASE->QueryObj( $sql );
	    if( sizeof($order)==0 ) {
	    	return false;
	    }
	    return $order;
    }





    