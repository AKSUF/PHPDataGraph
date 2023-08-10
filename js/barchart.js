$(document).ready(function() {
    // Function to fetch data and create the bar chart
    function createBarChart(page) {
        // Fetch data from the server using AJAX
        $.ajax({
            url: `functionphp/chartdata.php?page=${page}&limit=50`, // Adjust the URL as needed
            type: "GET",
            dataType: "json",
            success: function(data) {
                // Extract sector and intensity data
                const sectors = data.map(item => item.sector);
                const intensities = data.map(item => parseFloat(item.intensity));

                // Remove previous SVG element
                d3.select("#bar-chart").selectAll("svg").remove();

                // Set up the SVG container dimensions
                const svgWidth = 1000;
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

    // Call the function to create the initial bar chart
    createBarChart(1);

    // Update chart dimensions and re-render on window resize
    window.addEventListener("resize", function() {
        d3.selectAll(".bar, .x-axis, .y-axis").remove();
        createBarChart(1);
    });
});