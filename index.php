<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css">
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <?php
    include('./common/data.php');
    include('./common/navbar.php');
    ?>
  <!-- //For showing notification -->
    <div id="error-message"></div>
    <div id="success-message"></div>
<!-- For showing page -->
    <?php
    if (isset($_GET['home'])) {
        include('./pages/Datahome.php');
    }
    if (isset($_GET['barchart'])) {
        include('./pages/BarChart.php');
    }
    if (isset($_GET['linechart'])) {
        include('./pages/LineChart.php');
    }
    if (isset($_GET['groupbarchart'])) {
        include('./pages/BarGroupChart.php');
    }
    if (isset($_GET['piechart'])) {
        include('./pages/PieChart.php');
    }
    if (isset($_GET['scatterchart'])) {
        include('./pages/ScatterplotChart.php');
    }

    ?>
    <!-- javascript and cdn -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-tip/0.9.1/d3-tip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.25.6/d3-legend.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
    <script src="./js/index.js"></script>
    <script src="./js/chart.js"></script>
   <script src="./js/barchart.js"></script>
    <script src="./js/groubarchart.js"></script>
    <script src="./js/piechart.js"></script>
    <script src="./js/linechart.js"></script>
    <script src="./js/Scatterplot Chart.js"></script>
</body>

</html>