<style>
 #scatterplot-chart {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }

        circle {
            fill: #e74c3c; 
            opacity: 0.7;
            transition: fill-opacity 0.3s;
        }

        circle:hover {
            fill-opacity: 1;
        }

        .axis path,
        .axis line {
            fill: none;
            stroke: #000;
            shape-rendering: crispEdges;
        }

        .axis text {
            font-size: 12px;
        }

</style>

<div class="container text-center mt-5">
  <div class="row">
    <div class="col-md-2">
    </div>
    <div class="col-md-8">
    <div id="scatterplot-chart"></div>
    </div>
    <div class="col-md-2">
    </div>
  </div>
</div>
