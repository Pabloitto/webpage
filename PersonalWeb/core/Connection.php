<?php
	define('DB_NAME', "personalpage");
	define('DB_USER', "admin");
	define('DB_PASS', "admin");
	define('DB_HOST', "localhost");
	
	class Connection{
		
		private static $connection_;
	
		private function __construct(){
			$con = mysql_connect(DB_HOST, DB_USER, DB_PASS);
			mysql_selectdb(DB_NAME, $con);
			Connection::$connection_ =  $con;
		}
	
		public static function getConnection(){
			if( !Connection::$connection_ )
				new Connection;
			return Connection::$connection_;
		}
	
	}
	
	$con = Connection::getConnection();
?>