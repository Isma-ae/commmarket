<?php 
    header("Access-Control-Allow-Origin: *");

    $folder = "files/products_temp/";

    include("config.php");
    $id = @$_POST["id"];

    $obj = $DATABASE->QueryObj("SELECT * FROM products_image_temp WHERE id='".$id."'  ");
    if( sizeof($obj)==1 ) {
        $image = $obj[0]["image"];
        $sql = "DELETE FROM products_image_temp WHERE id='".$id."'  ";
        $DATABASE->Query( $sql );
        unlink($folder.$image);
        echo "Y";
    } else {
        echo "No data.";
    }
?>