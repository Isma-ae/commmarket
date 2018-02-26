<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $arrPlayerId = array(
        "143c5cb5-8182-4be6-841a-2515b592faed",
        "6f000f5d-14f2-47c3-81f0-01129fd96fe3"
    );
    $objMessage = array(
        "title"=>"ภาษาไทยนะจ่",
        "message"=>"ภาษาไทยนะจ่ ภาษาไทยนะจ่"
    );
    $response = send_message($arrPlayerId, $objMessage);
	print($response);