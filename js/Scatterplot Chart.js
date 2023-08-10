$(document).ready(function() {
    const scatterplotContainer = d3.select("#scatterplot-chart");
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const width = scatterplotContainer.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = scatterplotContainer
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    function loadScatterplotChartData() {
        $.ajax({
            url: "functionphp/Scatterplot Chart.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                renderScatterplotChart(data);
            },
            error: function() {
                console.log("Error loading data for Scatterplot Chart");
            }
        });
    }

    function renderScatterplotChart(data) {
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.likelihood)])
            .range([height, 0]);

        svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => xScale(d.intensity))
            .attr("cy", d => yScale(d.likelihood))
            .attr("r", 5)
            .attr("fill", "#3498db") // Blue color

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 40)
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .text("Intensity");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -height / 2)
            .attr("dy", "1em")
            .attr("fill", "#000")
            .attr("text-anchor", "middle")
            .text("Likelihood");
    }

    loadScatterplotChartData();
});