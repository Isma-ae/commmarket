<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $u_id = @$_POST["u_id"];
    $uuid = @$_POST["uuid"];
    $ip = get_client_ip();

    $return = array();

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
    $sql = "
        SELECT 
            *,
            (
                SELECT img_name FROM products_image WHERE p_id=products.p_id LIMIT 1
            ) as p_image
        FROM tb_cart
            LEFT JOIN users ON tb_cart.u_id = users.u_id
            INNER JOIN products ON tb_cart.p_id = products.p_id
        WHERE ".$condition."
    ";
    $return["data"] = $DATABASE->QueryObj( $sql );
    echo json_encode( $return );