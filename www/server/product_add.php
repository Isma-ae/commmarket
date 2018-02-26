<?php 
    header("Access-Control-Allow-Origin: *");
    
    $folder = "files/products/";
    $folder_temp = "files/products_temp/";

    include("config.php");
    $p_id = $DATABASE->QueryMaxId("products", "p_id");
    $p_name = @$_POST["p_name"];
    $p_description = @$_POST["p_description"];
    $p_category = @$_POST["p_category"];
    $p_price = @$_POST["p_price"];
    $p_stock = @$_POST["p_stock"];
    $u_id = @$_POST["u_id"];
    $sql = "
        INSERT INTO products (
            p_id,
            p_name,
            p_description,
            p_category,
            p_price,
            p_stock,
            u_id
        ) VALUES (
            '".$p_id."',
            '".$p_name."',
            '".$p_description."',
            '".$p_category."',
            '".$p_price."',
            '".$p_stock."',
            '".$u_id."'
        )
    ";
    if( $DATABASE->Query( $sql ) ) {
        $sql = "
                SELECT * 
                FROM products_image_temp 
                WHERE u_id='".$u_id."'  
        ";
        $obj = $DATABASE->QueryObj( $sql );
        foreach( $obj as $row ) {
            $img_id = $DATABASE->QueryMaxId("products_image", "img_id");
            $img_name = $row["image"];
            $sql = "
                INSERT INTO products_image (
                    img_id,
                    img_name,
                    p_id
                ) VALUES (
                    '".$img_id."',
                    '".$img_name."',
                    '".$p_id."'
                )
            ";
            $DATABASE->Query( $sql );
            rename($folder_temp.$img_name, $folder.$img_name);
        }
        $DATABASE->Query( "DELETE FROM products_image_temp WHERE u_id='".$u_id."' " );
        echo "Y";
    } else {
        echo "N";
    }