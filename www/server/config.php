<?php
    define("HOST", "localhost");
    define("USER", "root");
    define("PASS", "");
    define("DBNAME", "db_market");

    require_once('class.connect-mysql.php');
    require_once('class.notification.php');
    require_once('omise-php/lib/Omise.php');
    require_once('PHPMailer/PHPMailerAutoload.php');

    define('OMISE_PUBLIC_KEY', 'pkey_test_587rkj71t9n8n6cmk73');
    define('OMISE_SECRET_KEY', 'skey_test_587swb8ieh0nvhl1sbk');
    define('OMISE_API_VERSION', '2017-11-02');
    
	$DATABASE = new Database(HOST,USER,PASS,DBNAME);

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
    function payBanking($order_id, $type, $amount, $url_success) {
        try {
            $parameter = array(
                'type'     => $type,
                'amount'   => $amount,
                'currency' => 'thb'
            );
            $source = OmiseSource::create($parameter);
            $charge = OmiseCharge::create(array(
                    'description'   => $order_id,
                    'amount'        => $amount,
                    'currency'      => 'thb',
                    'return_uri'    => $url_success,
                    'source'        => $source["id"]
                )
            );
            if( $charge["status"]=="pending" ) {
                return $charge;
            } else {
                return null;
            }
            return $charge;
        } catch (OmiseException $e) {
            return null;
        }
    }
    function payCredit($order_id, $omiseToken, $amount) {
        try {
            $charge = OmiseCharge::create(array(
                'amount' => $amount,
                'currency' => 'thb',
                'card' => $omiseToken
            ));
            PrintR($charge);
            if ($charge['status'] == 'successful') {
                //header("location: ".$charge["authorize_uri"]);
            } else {
                echo "Error จ่ายเงินไม่สำเร็จ";
            }
        } catch (OmiseException $e) {
            echo "Error จ่ายเงินไม่สำเร็จ";
        }
    }
    function sendMail($email,$title,$message) {
        date_default_timezone_set('Asia/Bangkok');
        //Create a new PHPMailer instance
        $mail = new PHPMailer;
        $mail->CharSet = "utf-8";
        //Tell PHPMailer to use SMTP
        $mail->isSMTP();
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        //Ask for HTML-friendly debug output
        $mail->Debugoutput = 'html';
        //Set the hostname of the mail server
        $mail->Host = "smtp.live.com";
        //Set the SMTP port number - likely to be 25, 465 or 587
        $mail->Port = 587;
        //Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'tls';
        //Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        //Username to use for SMTP authentication
        $mail->Username = "kada_jita@hotmail.com";
        //Password to use for SMTP authentication
        $mail->Password = "air18102536";
        //Set who the message is to be sent from
        $mail->setFrom('kada_jita@hotmail.com', 'Admin');
        //Set who the message is to be sent to
        $mail->addAddress($email, $email);
        //Set the subject line
        $mail->Subject = $title;
        //Read an HTML message body from an external file, convert referenced images to embedded,
        //convert HTML into a basic plain-text alternative body
        //$mail->msgHTML(file_get_contents('content.html'), dirname(_FILE_));
        $mail->msgHTML($message);
         
        //send the message, check for errors
        if (!$mail->send()) {
            return false;
        } else {
            return true;
        }
    }