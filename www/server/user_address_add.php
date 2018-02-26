<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $u_id = @$_POST["u_id"];
    $u_name = @$_POST["u_name"];
    $u_phone = @$_POST["u_phone"];
    $u_address = @$_POST["u_address"];
    
    $id = $DATABASE->QueryMaxId("users_address","id");
    $sql = "
        INSERT INTO users_address (
            id,
            u_id,
            u_name,
            u_phone,
            u_address
        ) VALUES (
            '".$id."',
            '".$u_id."',
            '".$u_name."',
            '".$u_phone."',
            '".$u_address."'
        )
    ";
    if( $DATABASE->Query( $sql ) ) {
        echo "Y";
    } else {
        echo "Add to cart fail.";
    }