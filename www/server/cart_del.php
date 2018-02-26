<?php 
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    
    $u_id = @$_POST["u_id"];
    $p_id = @$_POST["p_id"];
    $obj_p = $DATABASE->QueryObj("SELECT * FROM products WHERE p_id='".$p_id."' ");
    if( sizeof($obj_p)==0 ) {
        echo "No product.";
        exit();
    }
    $p_price = $obj_p[0]["p_price"];
    $obj_c = $DATABASE->QueryObj("SELECT * FROM tb_cart WHERE u_id='".$u_id."' AND p_id='".$p_id."' ");
    if( sizeof($obj_c)==1 ) {
        if( $obj_c[0]["c_qty"]*1 >= 2 ) {
            $sql = "
                UPDATE tb_cart SET
                    c_qty = c_qty - 1,
                    c_price = c_price - ".$p_price."
                WHERE u_id='".$u_id."' AND p_id='".$p_id."' 
            ";
            if( $DATABASE->Query( $sql ) ) {
                echo "Y";
            } else {
                echo "Del cart fail.";
            }
        } else {
            $sql = "
                DELETE FROM tb_cart 
                WHERE u_id='".$u_id."' AND p_id='".$p_id."' 
            ";
            if( $DATABASE->Query( $sql ) ) {
                echo "Y";
            } else {
                echo "Del cart fail.";
            }
        }
    }
?>