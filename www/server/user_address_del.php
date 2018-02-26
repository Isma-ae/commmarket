<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $id = @$_POST["id"];

    $sql = "
        DELETE FROM users_address WHERE id='".$id."' 
    ";
    if( $DATABASE->Query( $sql ) ) {
        echo "Y";
    } else {
        echo "Add to cart fail.";
    }