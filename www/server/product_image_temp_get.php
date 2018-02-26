<?php 
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $u_id = @$_POST["u_id"];

    $return = array();

    $sql = "SELECT * FROM products_image_temp WHERE u_id='".$u_id."'  ";
    $return["data"] = $DATABASE->QueryObj( $sql );
    echo json_encode( $return );
?>