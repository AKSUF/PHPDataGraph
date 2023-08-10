<?php
include('../common/connect.php'); // Include the database connection code

$query = "SELECT intensity, likelihood FROM data_table";
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
