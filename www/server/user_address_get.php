<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $u_id = @$_POST["u_id"];

    $return = array();
    
    $sql = "
    SELECT
        0 as id,
        users.u_name,
        users.u_phone,
        users.u_address
    FROM users
    WHERE users.u_id='".$u_id."'

    UNION ALL

    SELECT
        users_address.id,
        users_address.u_name,
        users_address.u_phone,
        users_address.u_address
    FROM users_address
    WHERE users_address.u_id='".$u_id."'
    ";
    $return["data"] = $DATABASE->QueryObj( $sql );
    echo json_encode( $return );