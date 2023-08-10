$(document).ready(function() {
    const lineChartContainer = d3.select("#line-chart");

    function loadLineChartData() {
        $.ajax({
            url: "functionphp/linechart.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                renderLineChart(data);
            },
            error: function() {
                console.log("Error loading data for Line Chart");
            }
        });
    }
    loadLineChartData();

    function renderLineChart(data) {
        const margin = { top: 20, right: 20, bottom: 60, left: 60 };
        const containerWidth = lineChartContainer.node().getBoundingClientRect().width;
        const width = containerWidth - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.sector))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([height, 0]);

        const line = d3.line()
            .x(d => xScale(d.sector) + xScale.bandwidth() / 2)
            .y(d => yScale(d.intensity));

        const svg = lineChartContainer
            .append("svg")
            .attr("viewBox", `0 0 ${containerWidth} 400`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5) // Adjust the y-coordinate
            .attr("text-anchor", "middle")
            .text("Sector");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Intensity");
    }

    // Update chart dimensions and re-render on window resize
    window.addEventListener("resize", function() {
        d3.selectAll(".line, .x-axis, .y-axis, .x-axis-label, .y-axis-label").remove();
        loadLineChartData();
    });
});
