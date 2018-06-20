<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_cred";
$name = $_POST['user_name'];
$surname = $_POST['user_surname'];
$role = $_POST['user_role'];
$from_date = $_POST['user_fromdate'];
$to_date = $_POST['user_todate'];
$status = $_POST['user_status'];
/* $upassword = $_POST['upassword'];
$utelephone = $_POST['utelephone'];
$uemergency = $_POST['uemergency'];
$urole = $_POST['urole']; */

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);  
}

$sql = "INSERT INTO leaves (name, surname, role, from_date, to_date, status)
VALUES ('".$name."', '".$surname."', '".$role."', '".$from_date."' , '".$to_date."', '".$status."')";

//echo $sql;
if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 