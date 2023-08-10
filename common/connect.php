<?php
$con = mysqli_connect('localhost', 'root','', 'datachart');
if ($con) {
    // echo "Connection Successful"; 
} else {
    die("Connection failed: " . mysqli_connect_error());
}
?>