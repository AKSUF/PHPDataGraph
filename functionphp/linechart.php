<?php
include('../common/connect.php'); // Include the database connection code

$query = "SELECT sector, intensity FROM data_table ORDER BY added ASC LIMIT 200";
$result = $con->query($query);

$data = array(); // Initialize an array to hold the data

// Fetch data and store in the array
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Return the data as JSON
echo json_encode($data);

// Close the database connection
$con->close();
?>
