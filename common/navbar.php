<?php
include('connect.php');
?>
<nav class="navbar navbar-expand-lg navbar-light shadow ">
  <div class="container">
    <a class="navbar-brand text-light ">DatagraphChart</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end text-danger-emphasis" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link btn  mr-3" href="index.php?home">Homedata</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn  mr-3" href="index.php?barchart">BarChart</a>
        </li>
       
        <li class="nav-item">
          <a class="nav-link btn  mr-3" href="index.php?groupbarchart">GroupBarChart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn  mr-3" href="index.php?piechart">PieChart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn  mr-4" href="index.php?scatterchart">ScatterPlotChart</a>
        </li>

      </ul>

    </div>
    <div> 
      <input type="text" id="search-input" placeholder="Search keyword..." class="">
      <button class="btn ml-6 shadow" id="search-btn">Search</button>
    </div>
  </div>
</nav>