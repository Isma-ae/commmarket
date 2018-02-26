<?php
	header("Access-Control-Allow-Origin: *");
	
	include("config.php");
	$sale_cat = @$_POST["sale_cat"];
	$comm = @$_POST["comm"];
	$name = @$_POST["name"];
	$username = @$_POST["username"];
	$password = @$_POST["password"];
	$phone = @$_POST["phone"];
	$address = @$_POST["address"];
	$market = @$_POST["market"];

	if( $name=="" ) {
		echo "Name is empty.";
		exit();
	}
	/*if( $username=="" ) {
		echo "Username is empty.";
		exit();
	}*/
	// database query insert ....
	$sql = "SELECT u_id FROM users WHERE u_username = '$username'";
	$result = $DATABASE->QueryObj( $sql );
	$row = sizeof($result);
	if($row > 0) {
		echo "username is used";
		exit();
	} else {
		$id = $DATABASE->QueryMaxId("users","u_id");
		$sql = "
			INSERT INTO users (
				u_id,
				u_comm,
				u_name,
				u_username,
				u_password,
				u_phone,
				u_address,
				u_market,
				sale_cat
			) VALUES (
				'".$id."',
				'".$DATABASE->Escape($comm)."',
				'".$DATABASE->Escape($name)."',
				'".$DATABASE->Escape($username)."',
				'".$DATABASE->Escape($password)."',
				'".$DATABASE->Escape($phone)."',
				'".$DATABASE->Escape($address)."',
				'".$DATABASE->Escape($market)."',
				'".$sale_cat."'
			)
		";
		$run_query = $DATABASE->Query($sql);
		if($run_query){
			echo "true";
		}
	}


	//echo "Hello : ".$name;



/*
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
        exit(0);
    }

	
   $postdata = file_get_contents("php://input");


  if (isset($postdata)) {
		$request = json_decode($postdata);
		
		$name=$request->name;  
		$username=$request->username; 		
		$password=$request->password; 
		//$password=md5($password);
		$phone=$request->phone; 
		$address=$request->address; 
		$market=$request->market; 
		
		$conn = new mysqli("localhost", "root", "", "db_market");
		mysqli_set_charset($conn,"utf8");
		$name = stripslashes($name);
		$username = stripslashes($username);
		$password = stripslashes($password);
		$phone = stripslashes($phone);
		$address = stripslashes($address);
		$market = stripslashes($market);
		
		$name = $conn->real_escape_string($name);
		$username = $conn->real_escape_string($username);
		$password = $conn->real_escape_string($password);
		$phone = $conn->real_escape_string($phone);
		$address = $conn->real_escape_string($address);
		$market = $conn->real_escape_string($market);
		
		$check="SELECT * FROM users WHERE u_username = '$username'";
		$rs = mysqli_query($conn,$check);
		$data = mysqli_fetch_array($rs);
		if($data) {
			echo 'f';
			//exit();
		}
		else{
			$sql = "INSERT INTO users(u_id,u_name,u_username,u_password,u_phone,u_address,u_market) VALUES ((SELECT MAX( u_id ) FROM users u)+1,'$name', '$username', '$password', '$phone','$address' ,'$market' )";		
			if ($conn->query($sql) === TRUE) {
				echo 't';
			} 
		}
		
		$conn->close();
	
}
*/
?>    