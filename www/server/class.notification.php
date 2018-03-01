<?php
    class notification {
        private $title = "";
        private $message = "";
        private $users = array();
        private $conn = null;
        public function notification() {
            $this->user = array();
            $this->title = "";
            $this->message = "";
            $this->conn = new Database(HOST,USER,PASS,DBNAME);
        }
        public function setTile($title) {
            $this->title = $title;
        }
        public function setMessage($message) {
            $this->message = $message;
        }
        public function addUser($user) {
            $this->users[] = $user;
        }
        public function send() {
            if( sizeof($this->users)==0 ) return;
            foreach ($this->users as $key => $value) {
                $noti_id = $this->conn->QueryMaxId("tb_notification", "noti_id");
                $sql = "
                    INSERT INTO tb_notification (
                        noti_id,
                        noti_title,
                        noti_message,
                        u_id,
                        readed
                    ) VALUES (
                        '".$noti_id."',
                        '".$this->title."',
                        '".$this->message."',
                        '".$value."',
                        'N'
                    )
                ";
                $this->conn->Query($sql);
            }
            $sql = "
                SELECT tb_user_device.player_id
                FROM users
                    INNER JOIN tb_user_device ON users.u_id = tb_user_device.u_id
                WHERE users.u_id IN (".implode(",",$this->users).")
            ";
            $arrPlayerId = array();
            $obj = $this->conn->QueryObj($sql);
            foreach ($obj as $key => $value) {
                $arrPlayerId[] = $value["player_id"];
            }
            $objMessage = array(
                "title"=>$this->title,
                "message"=>$this->message,
            );
            $this->push($arrPlayerId, $objMessage);
        }
        public function push($arrPlayerId, $objMessage) { //$player_id = array("...","...")
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
    }