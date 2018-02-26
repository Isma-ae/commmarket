<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $u_id = @$_POST["u_id"];
    $p_id = @$_POST["p_id"];
    $uuid = @$_POST["uuid"];
    $ip = get_client_ip();

    $obj_p = $DATABASE->QueryObj("SELECT * FROM products WHERE p_id='".$p_id."' ");
    if( sizeof($obj_p)==0 ) {
        echo "No product.";
        exit();
    }

    $condition = "";
    if( $u_id=="" ) {
        if( $uuid=="" ) {
            $condition = " tb_cart.u_id='0' AND tb_cart.ip='".$ip."' ";
        } else {
            $condition = " tb_cart.u_id='0' AND uuid='".$uuid."' ";
        }
    } else {
        $condition = " tb_cart.u_id='".$u_id."' ";
    }

    $p_price = $obj_p[0]["p_price"];
    $obj_c = $DATABASE->QueryObj("SELECT * FROM tb_cart WHERE ".$condition." AND p_id='".$p_id."' ");
    if( sizeof($obj_c)==1 ) {
        $cart_id = $obj_c[0]["cart_id"];
        $sql = "
            UPDATE tb_cart SET
                c_qty = c_qty + 1,
                c_price = c_price + ".$p_price."
            WHERE cart_id='".$cart_id."' 
        ";
        if( $DATABASE->Query( $sql ) ) {
            echo "Y";
        } else {
            echo "Add to cart fail.";
        }
    } else {
        $cart_id = $DATABASE->QueryMaxId("tb_cart","cart_id");
        $sql = "
            INSERT INTO tb_cart (
                tb_cart.cart_id,
                tb_cart.u_id,
                tb_cart.p_id,
                tb_cart.c_qty,
                tb_cart.c_price,
                tb_cart.ip,
                tb_cart.uuid,
                tb_cart.dt
            ) VALUE (
                '".$cart_id."',
                '".$u_id."',
                '".$p_id."',
                '1',
                '".$p_price."',
                '".$ip."',
                '".$uuid."',
                NOW()
            )
        ";
        if( $DATABASE->Query( $sql ) ) {
            echo "Y";
        } else {
            echo "Add to cart fail.";
        }
    }