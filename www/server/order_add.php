<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");

    $id = @$_POST["id"];
    $u_id = @$_POST["u_id"];
    $ip = get_client_ip();
    $order_doc = $DATABASE->QueryMaxId("tb_order", "order_doc", "ODR", 7);
    $arrPlayerId = array();

    $return = array();

    $address = array();
    if( $id=="0" ) {
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
            WHERE users_address.id='".$id."'
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
        WHERE tb_cart.u_id='$u_id'
        GROUP BY products.u_id
    ";
    $order = $DATABASE->QueryObj( $sql );
    foreach( $order as $row ) {
        $order_id = $DATABASE->QueryMaxId("tb_order", "order_id");
        $sql = "
            SELECT *
            FROM tb_cart
                INNER JOIN products ON tb_cart.p_id = products.p_id
            WHERE tb_cart.u_id='$u_id' AND products.u_id='".$row["u_id"]."'
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

            $DATABASE->Query( "DELETE FROM tb_cart WHERE cart_id='".$row2["cart_id"]."'" );
        }
        $sql = "
            INSERT INTO tb_order (
                order_id,
                order_doc,
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
                '".$u_id."',
                '".$sum_price."',
                '".$address["u_name"]."',
                '".$address["u_phone"]."',
                '".$address["u_address"]."',
                '0',
                NOW(),
                'Y'
            )
        ";
        $DATABASE->Query( $sql );

        // send push
        $sql = "
            SELECT * FROM tb_user_device WHERE u_id='".$row["u_id"]."'
        ";
        $device = $DATABASE->QueryObj( $sql );
        foreach( $device as $row2 ) {
            $arrPlayerId[] = $row2["player_id"];
        }
    }
    $objMessage = array(
        "title"=>"Commmarket",
        "message"=>"มีลูกค้าได้ทำการสั่งซื้อสินค้าของคุณ สามารถตรวจสอบได้ค่ะ"
    );
    $response = send_message($arrPlayerId, $objMessage);

    $return["status"] = "Y";
    $return["order_doc"] = $order_doc;
    
    echo json_encode( $return );;