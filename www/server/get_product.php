<?php 
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include("config.php");
    $return = array();
    $p_id = @$_POST["p_id"];
    $sql = "
        SELECT 
            p.*,
            (
                SELECT img_name FROM products_image WHERE p_id=p.p_id LIMIT 1
            ) as p_image
        FROM products p
        WHERE p_id = '".$p_id."'
    ";
    $result = $DATABASE->QueryObj( $sql );
    if( sizeof($result)==1 ) {
        $return["data"] = $result[0];
    } else {
        $return["data"] = "No data";
    }
    echo json_encode( $return );
?>