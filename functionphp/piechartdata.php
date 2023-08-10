<?php
// piechartdata.php

include('../common/connect.php'); // Include the database connection code

$query = "SELECT sector, COUNT(*) as count FROM data_table GROUP BY sector";
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