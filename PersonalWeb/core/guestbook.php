<?php 
	
	include_once('Connection.php');

	$db = Connection::getConnection();
	
	
	if($_REQUEST['action'] == "insert"){
	
		$name = $_POST["txtName"];
		
		$lastName = $_POST["txtLastName"];
		
		$txtEmail = $_POST["txtEmail"];
		
		$txtCountry = $_POST["txtCountry"];
		
		$txtComments = $_POST["txtComments"];
		
		insert($db , $name, $lastName, $txtEmail, $txtCountry, $txtComments);
	}
	
	if($_REQUEST['action'] == "getComments"){
		getComments($db);
	}
	if($_REQUEST['action'] == "getCommentById"){
		if(isset($_POST['id'])){
			$pk = $_POST['id'];
			getCommentById($db , $pk);
		}
	}
	
	//Functions
	function insert($db , $name , $lastname , $email , $country , $comments){
		$query = "call insert_guestbook('$name' , '$lastname' ,'$email' , '$country' , '$comments');";
		if(!mysql_query($query,$db)){
			die('Error: ' . mysql_error($db));
		}
		mysql_close($db);
	}
	function getComments($db){
		$json = array();
		$query = "call get_all_comments();";
		$result = mysql_query($query,$db);
		while($row = mysql_fetch_array($result)){
			$bus = array(
					'id' => $row['id'],
					'name' => $row['name'] . ", " . $row['lastname']
			);
			array_push($json, $bus);
		}
		echo json_encode($json);
		mysql_close($db);
	}
	function getCommentById($db , $pk){
		$json = null;
		$query = "select * from guestbook where id=" .  $pk;
		$result = mysql_query($query,$db);
		while($row = mysql_fetch_array($result)){
			$json = array(
					'id' => $row['id'],
					'name' => $row['name'],
					'lastname' => $row['lastname'],
					'email' => $row['email'],
					'country' => $row['country'],
					'comments' => $row['comments']
			);
		}
		echo json_encode($json);
		mysql_close($db);
	}
?>