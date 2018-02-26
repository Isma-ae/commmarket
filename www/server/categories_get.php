<?php 
    header("Access-Control-Allow-Origin: *");

    include("config.php");

    $return = array();

    $sql = "SELECT * FROM tb_categories";
    $return["data"] = $DATABASE->QueryObj( $sql );
    echo json_encode($return);
?>