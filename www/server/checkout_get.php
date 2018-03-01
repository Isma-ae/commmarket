<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $return = array();

    $return["status"] = "Y";
    $return["pay_type"] = $DATABASE->QueryObj( "SELECT * FROM tb_pay_type" );
    $return["bank"] = $DATABASE->QueryObj( "SELECT * FROM tb_bank" );
    
    echo json_encode($return);