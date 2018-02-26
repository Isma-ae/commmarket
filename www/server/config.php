<?php
	include('class.connect-mysql.php');
	$HOST = "localhost";
	$USER = "root";
	$PASS = "";
	$DBNAME = "db_market";
	$DATABASE = new Database($HOST,$USER,$PASS,$DBNAME);

	function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
    function send_message($arrPlayerId,$objMessage) { //$player_id = array("...","...")
        $app_id = "795faf89-a2b3-4ec7-ace0-1853e0ee0fe1";
        $api_key = "YzhhYTBhNjYtMGQ1My00M2I4LTgwZGUtNDVlM2Y0MmVjMDJh";
        $fields = array(
            'app_id' => $app_id,
            'include_player_ids' => $arrPlayerId,
            'headings'=>array(
                "en"=>$objMessage["title"]
            ),
            'contents'=>array(
                "en"=>$objMessage["message"]
            ),
            'data' => $objMessage,
            'small_icon'=>'icon',
            'large_icon'=>'icon',
            'android_group'=>'push',
        );
        $fields = json_encode($fields);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                                    'Authorization: Basic '.$api_key));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }