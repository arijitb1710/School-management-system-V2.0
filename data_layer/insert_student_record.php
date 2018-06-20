<?php
//echo "Hello World";
//header("Content-Type: application/json; charset=UTF-8");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "User_cred";
$name = $_POST['user_name'];
$surname = $_POST['user_surname'];
$id = $_POST['user_id'];
$class = $_POST['user_class'];
$section = $_POST['user_section'];
$roll = $_POST['user_roll'];
$parent_contact = $_POST['user_parent_contact'];
$guardian_contact = $_POST['user_guardian_contact'];
$parent_email = $_POST['user_parent_email'];
$address = $_POST['user_address'];
//$dbpassword = $_POST['pass'];


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO students (name, surname, id, class, section, roll, parents_contact, guardians_contact, parents_email, address)
VALUES ('".$name."', '".$surname."', '".$id."', '".$class."', '".$section."', '".$roll."', '".$parent_contact."' , '".$guardian_contact."' , '".$parent_email."' , '".$address."')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 