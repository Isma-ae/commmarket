<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $order_doc = @$_POST["order_doc"];
    $u_id = @$_POST["u_id"];

    $sql = "SELECT * FROM tb_order WHERE order_doc='".$order_doc."' AND u_id='".$u_id."' AND `status`='Y' ";
    $order = $DATABASE->QueryObj( $sql );
    if( sizeof($order)>0 ) {
        echo "Y";
    } else {
        echo "N";
    }