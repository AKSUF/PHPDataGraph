$(document).ready(function() {
    const pieContainer = d3.select("#pie-chart");
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const svg = pieContainer
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Set viewBox for responsiveness
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    function loadPieChartData() {
        $.ajax({
            url: "functionphp/piechartdata.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                renderPieChart(data);
            },
            error: function() {
                console.log("Error loading data for Pie Chart");
            }
        });
    }

    function renderPieChart(data) {
        const pie = d3.pie()
            .value(d => d.count);

        const pieChartData = pie(data);

        const colorScale = d3.scaleOrdinal()
            .domain(data.map(d => d.sector))
            .range(d3.schemeCategory10);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const arcs = svg.selectAll("arc")
            .data(pieChartData)
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => colorScale(d.data.sector));

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => `${d.data.sector} (${d.data.count})`);
    }

    loadPieChartData();
});