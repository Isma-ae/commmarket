<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $url = @$_POST["url"];
    $address_id = @$_POST["address_id"];
    $u_id = @$_POST["u_id"];
    $bank_code = @$_POST["bank_code"];;
    $order_doc = $DATABASE->QueryMaxId("tb_order", "order_doc", "ODR", 7);
    $arrPlayerId = array();

    $return = array();

    $address = array();
    if( $address_id=="0" ) {
        $sql = "
            SELECT *
            FROM users
            WHERE users.u_id='".$u_id."'
        ";
        $obj = $DATABASE->QueryObj( $sql );
        if( sizeof($obj)!=1 ) {
            echo "No Address.";
            exit();
        }
        $address = $obj[0];
    } else {
        $sql = "
            SELECT *
            FROM users_address
            WHERE users_address.id='".$address_id."'
        ";
        $obj = $DATABASE->QueryObj( $sql );
        if( sizeof($obj)!=1 ) {
            echo "No Address.";
            exit();
        }
        $address = $obj[0];
    }

    $sql = "
        SELECT products.u_id
        FROM tb_cart
                INNER JOIN products ON tb_cart.p_id = products.p_id
        WHERE tb_cart.u_id='".$u_id."'
        GROUP BY products.u_id
    ";
    $order = $DATABASE->QueryObj( $sql );
    if( sizeof( $order )==0 ) {
    	$return["status"] = "N";
    	$return["error"] = "ไม่พบรายการสั่งซื้อของทาน";
    	echo json_encode($return);
    	exit();
    }
    $amount = 0;
    foreach( $order as $row ) {
    	$u_id_saler = $row["u_id"];
        $order_id = $DATABASE->QueryMaxId("tb_order", "order_id");
        $sql = "
            SELECT *
            FROM tb_cart
                INNER JOIN products ON tb_cart.p_id = products.p_id
            WHERE tb_cart.u_id='$u_id' AND products.u_id='".$u_id_saler."'
        ";
        $products = $DATABASE->QueryObj( $sql );
        $sum_price = 0;
        foreach( $products as $row2 ) {
            $p_id = $row2["p_id"];
            $qty = $row2["c_qty"];
            $price = $row2["c_price"];
            $sql = "
                INSERT INTO tb_order_detail (
                    order_id,
                    p_id,
                    qty,
                    price
                ) VALUES (
                    '".$order_id."',
                    '".$p_id."',
                    '".$qty."',
                    '".$price."'
                )
            ";
            $DATABASE->Query( $sql );
            $sum_price += $price*1;
        }
        $sql = "
            INSERT INTO tb_order (
                order_id,
                order_doc,
                u_id_saler,
                u_id,
                sum_price,
                address_name,
                address_phone,
                address_address,
                ship_id,
                order_date,
                status
            ) VALUES (
                '".$order_id."',
                '".$order_doc."',
                '".$u_id_saler."',
                '".$u_id."',
                '".$sum_price."',
                '".$address["u_name"]."',
                '".$address["u_phone"]."',
                '".$address["u_address"]."',
                '0',
                NOW(),
                'N'
            )
        ";
        $amount = $sum_price;
        $DATABASE->Query( $sql );
    }
    $url_success = $url.'checkout_internet_banking_success.php?order_doc='.$order_doc.'&u_id='.$u_id;
    $charge = payBanking($order_doc, $bank_code, $amount*100, $url_success);

    //var_dump($charge);
    if( $charge!=null ) {
		$charge_id = $charge["id"];
		$ordered = $DATABASE->QueryMaxId("tb_charges_history", "ordered");
		$sql = "
            INSERT INTO tb_charges_history (
                order_doc,
                charge_id,
                ordered
            ) VALUES (
                '".$order_doc."',
                '".$charge_id."',
                '".$ordered."'
            )
        ";
		$DATABASE->Query( $sql );

    	$return["status"] = "Y";
    	$return["order_doc"] = $order_doc;
    	$return["url"] = $charge["authorize_uri"];
    } else {
    	$return["status"] = "N";
    	$return["error"] = "ไม่สามารถชำระเงินได้";
    }
    echo json_encode($return);