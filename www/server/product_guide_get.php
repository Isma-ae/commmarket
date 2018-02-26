<?php 
    header("Access-Control-Allow-Origin: *");

    include("config.php");
    $num = @$_POST["num"]*1;
    $mode = @$_POST["mode"]*1;
    $limit = $num;
    if($mode==1) $limit = $limit + 2;


    $return = array();

    $sql = "
        SELECT 
            p.*,
            (
                SELECT img_name FROM products_image WHERE p_id=p.p_id LIMIT 1
            ) as p_image
        FROM products p
    ";
    $obj = $DATABASE->QueryObj( $sql." LIMIT ".$limit." " );
    $return["data"] = $obj;
    $return["isMoreProductGuide"] = $DATABASE->QueryNumRow( $sql ) > sizeof($obj) ? true : false ;
    echo json_encode($return);
?>