<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("config.php");
    $return = array();
    $cat_id = @$_POST["cat_id"];
    $sql = "SELECT * FROM products WHERE p_category='".$cat_id."'  ";
    $result = $DATABASE->QueryObj( $sql );
    $arr1 = array();
    foreach($result as $row){
        $arr1[] = $row;
    }
    echo json_encode($arr1);
?>