<?php
include('../common/connect.php'); // Include the database connection code

// Get the page and limit values from the AJAX request
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

// Calculate the offset
$offset = ($page - 1) * $limit;

// Query to fetch data for the current page
$query = "SELECT * FROM data_table LIMIT $limit OFFSET $offset";
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
