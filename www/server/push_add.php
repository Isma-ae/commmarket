<?php
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $u_id = @$_POST["u_id"];
    $player_id = @$_POST["player_id"];

    if( $u_id=="" || $player_id=="" ) exit();

    $sql = " SELECT * FROM tb_user_device WHERE u_id='".$u_id."' AND player_id='".$player_id."'";
    if( $DATABASE->QueryNumRow( $sql )==0 ) {
        $user_device_id = $DATABASE->QueryMaxId("tb_user_device", "user_device_id");
        $sql = "
            INSERT INTO tb_user_device (
                user_device_id,
                u_id,
                player_id,
                dt
            ) VALUE (
                '".$user_device_id."',
                '".$u_id."',
                '".$player_id."',
                NOW()
            )
        ";
        $DATABASE->Query( $sql );
    }