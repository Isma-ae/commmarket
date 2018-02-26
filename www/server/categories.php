<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("config.php");

    $sql="SELECT * FROM tb_categories";
    $result = $DATABASE->QueryObj( $sql );
    $arr1 = array();
    foreach($result as $row){
        $arr1[] = $row;
    }

    $sql="SELECT * FROM products";
    $result = $DATABASE->QueryObj( $sql );
    $arr2 = array();
    foreach($result as $row){
        $arr2[] = $row;
    }

    $return = array();
    $return["categories"] = $arr1;
    $return["products"] = $arr2;
    echo json_encode($return);
?>