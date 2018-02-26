<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $id = @$_POST["id"];
    $u_id = @$_POST["u_id"];
    $u_name = @$_POST["u_name"];
    $u_phone = @$_POST["u_phone"];
    $u_address = @$_POST["u_address"];
    
    $sql = "
        UPDATE users_address SET
            u_name='".$u_name."',
            u_phone='".$u_phone."',
            u_address='".$u_address."'
        WHERE id='".$id."'
    ";
    if( $DATABASE->Query( $sql ) ) {
        echo "Y";
    } else {
        echo "Add to cart fail.";
    }