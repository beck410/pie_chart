(function() {
    function getData() {
        $.getJSON('data.json', function(json) {
            buildPieChart(json);
        });

        function buildPieChart(data) {
            var pie = createPie(),
                slices = pie(data),
                arc = createArc(),
                color = d3.scale.category10(),
                svg = d3.select('svg.pie'),
                g = addgElement(svg),
                dataTotal = getTotal(data),
                dataWithPercentages = getDataWithPercentage(data, dataTotal);

                g.selectAll('path.slice')
                    .data(slices)
                        .enter()
                            .append('path')
                                .attr('class', 'slice')
                                .attr('d', arc)
                                .attr('fill', function(d) {
                                    return color(d.data.product);
                                });

                addLegend(svg, dataWithPercentages, slices);

    }

    function createPie() {
        return d3.layout.pie()
            .value(function(d){
                return d.count;
            });
    }

    function getDataWithPercentage(data, dataTotal) {
        return data.forEach(function(d) {
            d.percentage = Math.floor((d.count  / dataTotal) * 100);
        });
    }

    function createArc() {
        return d3.svg.arc()
            .innerRadius(0)
            .outerRadius(100);
    }

    function addgElement(svg) {
        return svg.append('g')
            .attr('transform', 'translate(200, 100)');
    }

    function getTotal(data) {
        return d3.sum(data, function(d) {
            return d.count;
        });
    }

    function addLegend(svg, data, slices) {
        var color = d3.scale.category10();
        svg.append('g')
            .attr('class', 'legend')
                .selectAll('text')
                .data(slices)
                    .enter()
                        .append('text')
                            .text(function(d) {
                                return '. ' + d.data.product + ' - ' + d.data.percentage + '%';
                            })
                            .attr('fill', function(d) {
                                return color(d.data.product);
                            })
                            .attr('y', function(d, i) {
                                return 20 * (i + 1);
                            });
                        }
    }
    getData();
})();
