<?php 
    header("Access-Control-Allow-Origin: *");

    $folder = "files/products_temp/";

    include("config.php");
    $file = @$_FILES["file"];
    $u_id = @$_POST["u_id"];

    $tmp_name = $file["tmp_name"];
    $name = $file["name"];
    $type 	= pathinfo($name, PATHINFO_EXTENSION);					        // get type of file.
	$image = time().".".$type;										        // set new name of file.

    $id = $DATABASE->QueryMaxId("products_image_temp", "id");
    $sql = "
        INSERT INTO products_image_temp (
            id,
            u_id,
            image
        ) VALUES (
            '".$id."',
            '".$u_id."',
            '".$image."'
        )
    ";
    if( $DATABASE->Query( $sql ) ) {
        if( !is_dir($folder) ) {
            mkdir($folder, 0700);
        }
        move_uploaded_file($tmp_name, $folder.$image);
        echo "Y";
    } else {
        echo "N";
    }
?>