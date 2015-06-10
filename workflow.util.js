function getLocation(id) {
  return id.getBoundingClientRect();
}

function connectElements(startElement, endElement, connectionPoint1, connectionPoint2, time, callback) {
  // Create the Arrow
  var arrow = new Arrow();
  arrow.makeConnector(startElement, endElement, connectionPoint1,connectionPoint2);
  arrow.options.orientation = 'leftToRight';
  arrow.options.numberOfCurves = 2;
  arrow.options.animation.time = time;
  arrow.draw(callback);
}