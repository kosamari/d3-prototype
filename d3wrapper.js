/*
* D3 CONSTRUCTION FUNCTIONS
*/
function datasetPluck(data, key){
  return data.map(function(d) { return d[key]; });
}

function createTimeScale(range){
  return d3.time.scale().range(range);
}

function createLinearScale(range){
  return d3.scale.linear().range(range);
}

function createOrdinalScale(range){
  return d3.scale.ordinal().rangePoints(range);
}

function createXDomain(timelineData, graphData, key, padding){
  var domain = datasetPluck(timelineData,key).concat(datasetPluck(graphData,key));
  return  [d3.min(domain)-padding, d3.max(domain)-0+padding];
}

function createAxis(scale, orient){
  return d3.svg.axis().scale(scale).orient(orient);
}

function drawSVG(el, width, height, margin, id) {
  return d3.select(el).append('svg').attr('width', width).attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .append('g')
      .attr('id', id);
}

//if interplate is undefined, there will be no smoothing
function createLineGraph(xScale, xKey, yScale, yKey, interpolate){
  return d3.svg.line()
    .interpolate(interpolate)
    .x(function(d) { return xScale(d[xKey]); })
    .y(function(d) { return yScale(d[yKey]); });
}

//if interplate is undefined, there will be no smoothing
function createAreaGraph(xScale, xKey, yScale, yKey, interpolate){
  return d3.svg.area()
    .interpolate(interpolate)
    .x(function(d) { return xScale(d[xKey]); })
    .y0(100)
    .y1(function(d) { return yScale(d[yKey]); });
}

function drawclipPath(canvas, width, height, id){
  return canvas.append('defs').append('clipPath')
    .attr('id', id)
    .append('rect')
      .attr('width', width)
      .attr('height', height);
}

function drawRectangle(canvas, width, height){
  return canvas.append('rect')
    .attr('width', width)
    .attr('height', height);
}

function drawAxis(canvas, axisGenerator, attrClass, translateLoc) {
  return canvas.append('g')
    .attr('class', attrClass)
    .attr('transform', 'translate('+translateLoc+ ')')
    .call(axisGenerator);
}

/* TODO:
add brush const.
add charting options
*/
