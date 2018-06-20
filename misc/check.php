<?php
//echo "Hello World";
//header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_cred";
$class = "I";
$section = "A";
$roll = "1";
$subject = "E";
$marks = "80";
$term = "I";
$prev_subject = "Hindi";
$flag1=0;
$flag2=0;
//$row_name = "Monday";
//$col_name = "P4";
//$cell_value = "Maths";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//$sql="UPDATE results SET subject='".$subject."' AND marks='".$marks."' WHERE class='".$class."' AND section='".$section."' AND roll='".$roll."' AND subject='".$prev_subject."' AND term='".$term."'";
$sql2="UPDATE results SET subject='A', marks='90' WHERE class='I' AND section='A' AND roll='1' AND subject='A' AND term='I'";
//$sql2 = "UPDATE results SET marks='".$marks."' WHERE class='".$class."' AND section='".$section."' AND roll='".$roll."' AND subject='".$subject."'";
//$sql = "UPDATE time_table_class1 SET P4='Mat' WHERE Day='Monday'";

echo $sql2;
if (mysqli_query($conn, $sql2)) {
    echo "success";
    
} else {
    echo "failure";
}
/* if (mysqli_query($conn, $sql2)) {
    $flag2=1; 
    
} else {
    $flag2=0;
}
if($flag1==1 && $flag2==1){
    echo "success";
}
else{
    echo "failure";
} */

mysqli_close($conn);
?>