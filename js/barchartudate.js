$(document).ready(function() {
    const chartContainer = d3.select("#bar-chart");
    const prevButton = $("#prev-btn");
    const nextButton = $("#next-btn");

    let currentPage = 1;
    const recordsPerPage = 50; // Number of records per chunk

    function loadChartData(page) {
        $.ajax({
            url: `functionphp/chartdata.php?page=${page}&limit=${recordsPerPage}`,
            type: "GET",
            dataType: "json",
            success: function(data) {
                // Call the function to update the chart with new data
                updateBarChart(data);
            },
            error: function() {
                console.log("Error loading data");
            }
        });
    }

    // Function to update the bar chart with new data
    function updateBarChart(data) {

        // Fetch data from the server using AJAX
        $.ajax({
            url: `functionphp/chartdata.php?page=${data}&limit=50`, // Adjust the URL as needed
            type: "GET",
            dataType: "json",
            success: function(data) {
                // Extract sector and intensity data
                const sectors = data.map(item => item.sector);
                const intensities = data.map(item => parseFloat(item.intensity));

                // Set up the SVG container dimensions
                const svgWidth = 800;
                const svgHeight = 400;

                // Set up the margins
                const margin = { top: 20, right: 20, bottom: 30, left: 40 };
                const width = svgWidth - margin.left - margin.right;
                const height = svgHeight - margin.top - margin.bottom;

                // Create the SVG container
                const svg = d3.select("#bar-chart")
                    .append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                // Create the scales
                const xScale = d3.scaleBand()
                    .domain(sectors)
                    .range([0, width])
                    .padding(0.1);

                const yScale = d3.scaleLinear()
                    .domain([0, d3.max(intensities)])
                    .range([height, 0]);

                // Create the bars
                svg.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", d => xScale(d.sector))
                    .attr("y", d => yScale(d.intensity))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => height - yScale(d.intensity));

                // Add x-axis
                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(xScale));

                // Add y-axis
                svg.append("g")
                    .call(d3.axisLeft(yScale));
            },
            error: function() {
                console.log("Error loading data");
            }
        });

    }

    prevButton.click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadChartData(currentPage);
        }
    });

    nextButton.click(function() {
        // You should have a way to know the total number of pages
        // Assuming you have a variable totalPages defined somewhere
        if (currentPage < totalPages) {
            currentPage++;
            loadChartData(currentPage);
        }
    });

    // Initial chart load
    loadChartData(currentPage);
});