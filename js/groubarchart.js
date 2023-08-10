$(document).ready(function() {
    const chartContainer = d3.select("#grouped-bar-chart");
    const prevButton = $("#prev-btn");
    const nextButton = $("#next-btn");

    let currentPage = 1;
    let totalPages = 0; // need to define totalPages

    const recordsPerPage = 50; // Number of records per chunk

    function loadChartData(page) {
        $.ajax({
            url: `functionphp/chartdata.php?page=${page}&limit=${recordsPerPage}`,
            type: "GET",
            dataType: "json",
            success: function(data) {
                // Call the function to update the grouped bar chart with new data
                updateGroupedBarChart(data);
            },
            error: function() {
                console.log("Error loading data");
            }
        });
    }
    loadChartData(currentPage);

    function updateGroupedBarChart(data) {
        // Clear previous chart content
        chartContainer.selectAll("*").remove();

        const margin = { top: 20, right: 20, bottom: 60, left: 60 }; // Increased left margin for y-axis label
        const containerWidth = chartContainer.node().getBoundingClientRect().width;
        const width = containerWidth - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = chartContainer
            .append("svg")
            .attr("viewBox", `0 0 ${containerWidth} 400`) // Responsive viewBox
            .attr("preserveAspectRatio", "xMidYMid meet");

        const sectors = data.map(d => d.sector);
        const intensityValues = data.map(d => +d.intensity);
        const likelihoodValues = data.map(d => +d.likelihood);

        const xScale = d3.scaleBand()
            .domain(sectors)
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max([...intensityValues, ...likelihoodValues])])
            .range([height, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        // Add x-axis label
        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Sector");

        // Add y-axis label
        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Value");

        const group = svg.selectAll(".bar-group")
            .data(data)
            .enter().append("g")
            .attr("class", "bar-group")
            .attr("transform", d => "translate(" + xScale(d.sector) + ",0)");

        group.append("rect")
            .attr("class", "intensity-bar")
            .attr("x", 0)
            .attr("y", d => yScale(d.intensity))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => height - yScale(d.intensity));

        group.append("rect")
            .attr("class", "likelihood-bar")
            .attr("x", xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.likelihood))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => height - yScale(d.likelihood));
    }

    // Update chart dimensions and re-render on window resize
    window.addEventListener("resize", function() {
        d3.selectAll(".bar-group, .x-axis, .y-axis, .x-axis-label, .y-axis-label").remove(); // Remove previous chart elements
        loadChartData(currentPage);
    });

    prevButton.click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadChartData(currentPage);
        }
    });

    nextButton.click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            loadChartData(currentPage);
        }
    });
});