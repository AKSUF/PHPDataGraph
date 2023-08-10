<?php
include('../common/connect.php');

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 4;
$offset = ($page - 1) * $limit;

// Fetching the keyword from the URL
$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : "";

// Construct the WHERE clause based on the keyword
$whereClause = "";
if (!empty($keyword)) {
    $whereClause = "WHERE sector LIKE '%$keyword%' OR topic LIKE '%$keyword%' OR country LIKE '%$keyword%'";
}

$query = "SELECT * FROM data_table $whereClause LIMIT $offset, $limit";
$result = $con->query($query);

$data = "";
while ($row = $result->fetch_assoc()) {
    $sector = $row['sector'];
    $topic = $row['topic'];
    $country = $row['country'];
    $url = $row['url'];

    $data .= '<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">' . $sector . '</h5>
                    <p class="card-text">' . $topic . '</p>
                    <p class="card-text">' . $country . '</p>
                    <a href="' . $url . '" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>';
}


echo $data;

$con->close();
?>
