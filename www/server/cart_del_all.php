<?php 
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $u_id = @$_POST["u_id"];
    $p_id = @$_POST["p_id"];
    $sql = "
        DELETE FROM tb_cart 
        WHERE u_id='".$u_id."' AND p_id='".$p_id."' 
    ";
    if( $DATABASE->Query( $sql ) ) {
        echo "Y";
    } else {
        echo "Del cart fail.";
    }
?>