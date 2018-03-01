<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $arrPlayerId = array(
        "7f865ea0-336b-4891-bcf7-ae0ebb6bc877"
    );
    $objMessage = array(
        "title"=>"ภาษาไทยนะจ่",
        "message"=>"ภาษาไทยนะจ่ ภาษาไทยนะจ่"
    );

    $noti = new notification();
    $response = $noti->push($arrPlayerId, $objMessage);
	print($response);