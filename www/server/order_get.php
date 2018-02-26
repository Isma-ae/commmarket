<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $order_doc = @$_POST["order_doc"];

    $return = array();

    $sql = "
        SELECT 
            *
        FROM tb_order
        WHERE order_doc='".$order_doc."'
    ";
    $return["data"] = $DATABASE->QueryObj( $sql );
    echo json_encode( $return );