<?php
// Include the database connection code
include('connect.php');

// Turn off error reporting for production
error_reporting(0);

// CSV file path
$csvFilePath = 'data/Data.csv';

// Read the CSV file
if (($handle = fopen($csvFilePath, 'r')) !== false) {
    $header = fgetcsv($handle, 1000, ','); // Read and discard the header row
    
    // Start a transaction
    $con->begin_transaction();

    try {
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
     
 // Assign data to variables based on the column order
        list(
            $endYear, $cityLng, $cityLat, $intensity, $sector, $topic, $insight,
            $swot, $url, $region, $startYear, $impact, $added, $published, $city,
            $country, $relevance, $pestle, $source, $title, $likelihood
        ) = $data;
        
        // Convert date strings to proper format
        $added = date('Y-m-d', strtotime($added));
        $published = date('Y-m-d', strtotime($published));

        // Escape and sanitize data
        $sector = mysqli_real_escape_string($con, $sector);
        $topic = mysqli_real_escape_string($con, $topic);
        $insight = mysqli_real_escape_string($con, $insight);
        $swot = mysqli_real_escape_string($con, $swot);
        $url = mysqli_real_escape_string($con, $url);
        $region = mysqli_real_escape_string($con, $region);
        $impact = mysqli_real_escape_string($con, $impact);
        $city = mysqli_real_escape_string($con, $city);
        $country = mysqli_real_escape_string($con, $country);
        $relevance = mysqli_real_escape_string($con, $relevance);
        $pestle = mysqli_real_escape_string($con, $pestle);
        $source = mysqli_real_escape_string($con, $source);
        $title = mysqli_real_escape_string($con, $title);

            // SQL query to insert data into the table
            $sql = "INSERT INTO data_table 
                    (end_year, citylng, citylat, intensity, sector, topic, insight, swot, url, region, start_year, impact, added, published, city, country, relevance, pestle, source, title, likelihood) 
                    VALUES ('$endYear', '$cityLng', '$cityLat', '$intensity', '$sector', '$topic', '$insight', '$swot', '$url', '$region', '$startYear', '$impact', '$added', '$published', '$city', '$country', '$relevance', '$pestle', '$source', '$title', '$likelihood')";

            // Execute the query
            if ($con->query($sql) !== true) {
                throw new Exception("Error inserting record: " . $con->error);
            }
        }

        // Mark data as imported
        $markImportedQuery = "UPDATE data_imported SET is_imported = 1 WHERE id = 1";
        if ($con->query($markImportedQuery) !== true) {
            throw new Exception("Error marking data as imported: " . $con->error);
        }

        // Commit the transaction
        $con->commit();

        // echo "Data Already Transffered file to Database.<br>";

    } catch (Exception $e) {
        // Roll back the transaction on error
        $con->rollback();
        echo "Error: " . $e->getMessage() . "<br>";
    }

    fclose($handle);
} else {
    echo "Error opening file<br>";
}

// Close the database connection
$con->close();
?>