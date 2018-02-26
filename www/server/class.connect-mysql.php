<?php
	class Database
	{
		var $host = null;
		var $user = null;
		var $pass = null;
		var $dbname = null;
		var $charset = null;
		var $conn = null;
		public function __construct($host,$user,$pass,$dbname,$charset="UTF8")
		{
			$this->host = $host;
			$this->user = $user;
			$this->pass = $pass;
			$this->dbname = $dbname;
			$this->charset = $charset;
			$this->Connect();
		}
		public function __destruct()
		{
			if(!$this->conn->connect_error) return $this->conn->close();
			return null;
		}
		private function Connect()
		{
			$host = $this->host;
			$user = $this->user;
			$pass = $this->pass;
			$dbname = $this->dbname;
			$this->conn = @new mysqli( $host , $user , $pass, $dbname );
			if ($this->conn->connect_error) 
			{
				die("Connection failed: [".$this->conn->connect_errno."] " . $this->conn->connect_error);
			}
			$this->Query("SET NAMES ".$this->charset);
		}
		public function Error()
		{
			return $this->conn->error;
		}
		public function Escape($data, $type='escape') 
		{
			// type='escape' 	=> sql : insert or edit only
			// type='display'  	=> sql : select
			$data = trim( $data );
			if($type=="escape") return mysqli_real_escape_string($this->conn,$data);
			if($type=="display") return htmlspecialchars($data);
			return $data;
		}
		public function Query($sql)
		{
			return $this->conn->query($sql);
		}
		public function QueryObj($sql)
		{
			$obj = array();
			$result = $this->Query($sql);
			while($row = $result->fetch_assoc())
			{
				$obj[] = $row;
			}
			return $obj;
		}
		public function QueryJson($sql)
		{
			$obj = $this->QueryObj($sql);
			return json_encode($obj);
		}
		public function QueryString($sql)
		{
			$result = $this->Query($sql);
			if($row = $result->fetch_array())
			{
				return $row[0];
			}
			return null;
		}
		public function QueryNumRow($sql)
		{
			$result = $this->Query($sql);
			return $result->num_rows;
		}
		public function QueryMaxId($table,$feild,$schar="",$digit=0,$replace="0")
		{
			if($digit==0)
				$sql = "SELECT CONCAT( '".$schar."' , IFNULL(MAX(".$feild."),0) + 1 ) as ID FROM ".$table.";";
			else
				$sql = "
						SELECT 
							CONCAT(
									'".$schar."',
									LPAD(	
										IFNULL( SUBSTR( MAX( ".$feild." ) , CHAR_LENGTH('".$schar."') + 1 ) , 0 ) + 1 , 
										".$digit." , 
										'".$replace."'
									)
							) as ID
						FROM ".$table.";";
			return $this->QueryString($sql);
		}
	}
?>