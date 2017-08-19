var width = 700,
    height = 500;

var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height)
            .style('border', '1px solid black');

d3.json('data.json', arr=> {
  console.log(arr);
  var circle = d3.select('svg')
                  .selectAll('circle')
                  .data(arr)
                  .enter()
                  .append('circle');

  var scale = d3.scaleLinear()
                .domain([1, 10])
                .range([20, width-40]);
  var color = d3.scaleLinear()
                .domain([1, 200])
                .range(['green', 'red']);

  circle.attr('cx', d=>scale(d.magnitude))
        .attr('cy', 40)
        .attr('r', 40)
        .attr('fill', d=>color(d))
        .attr('fill-opacity', '0.5')

  var v  =300;
  console.log(v, scale(v));
});
