<?php
//echo "Hello World";
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_cred";
//$userid = $_POST['username'];
//$dbpassword = $_POST['pass'];

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = 'SELECT name, address,telephone,emergency_contact,email,userid FROM logins where role="student"';
//echo $sql;
$result = mysqli_query($conn, $sql);
$outp = array();


if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        //echo "id: " . $row["name"]. " - Name: " . $row["address"]. " " . $row["email"]. "<br>";
        //echo $row["username"].";".$row["password"];
        $outp[] = $row;
        
      
    }
    echo json_encode($outp);
    //echo "More than 1 email id found";  
   
    //echo $outp;
} else {
    echo "0 results";
}

mysqli_close($conn);

?>