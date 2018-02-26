<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $u_id = @$_POST["u_id"];

    $return = array();
    $sql = "
        SELECT 
            *
        FROM tb_notification
        WHERE u_id=".$u_id."
    ";
    $return["data"] = $DATABASE->QueryObj( $sql );
    echo json_encode( $return );