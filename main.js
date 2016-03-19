(function() {
    function getData() {
        $.getJSON('data.json', function(json) {
            buildPieChart(json);
        });

        function buildPieChart(data) {
            var pie = d3.layout.pie()
                .value(function(d){
                    return d.count;
                }),
                slices = pie(data),
                arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(50),
                color = d3.scale.category10(),
                svg = d3.select('svg.pie'),
                g = svg.append('g')
                    .attr('transform', 'translate(200, 50)');

                g.selectAll('path.slice')
                    .data(slices)
                        .enter()
                            .append('path')
                                .attr('class', 'slice')
                                .attr('d', arc)
                                .attr('fill', function(d) {
                                    return color(d.data.product);
                                });

                svg.append('g')
                    .attr('class', 'legend')
                        .selectAll('text')
                        .data(slices)
                            .enter()
                                .append('text')
                                    .text(function(d) {
                                        return '. ' + d.data.product;
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