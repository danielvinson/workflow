window.onload = function() {

  connectElements(test1, test2, 'right','left',500,function(){

    $('#test2').animate({'opacity':'1'}, 500, function(){
      connectElements(test2, test21, 'right','left',500,function(){
        $('#test21').animate({'opacity':'1'}, 500);
      });
      connectElements(test2, test22, 'right','left',500,function(){
        $('#test22').animate({'opacity':'1'}, 500);
      });
      connectElements(test2, test23, 'right','left',500,function(){
        $('#test23').animate({'opacity':'1'}, 500, function(){
          connectElements(test23, test231, 'right','left',500,function(){
            $('#test231').animate({'opacity':'1'}, 500);
          });
          connectElements(test23, test232, 'right','left',500,function(){
            $('#test232').animate({'opacity':'1'}, 500);
          });
          connectElements(test23, test233, 'right','left',500,function(){
            $('#test233').animate({'opacity':'1'}, 500);
          });
        });
      });
    });
  });
  connectElements(test1, test3, 'right','left',500,function(){
    $('#test3').animate({'opacity':'1'}, 500);
  });
  connectElements(test1, test4, 'right','left',500,function(){
    $('#test4').animate({'opacity':'1'}, 500);
  });
  connectElements(test1, test5, 'right','left',500,function(){
    $('#test5').animate({'opacity':'1'}, 500);
  });
}

function getLocation(id){
  console.log("Location of: "+id+" is "+id.getBoundingClientRect());
  return id.getBoundingClientRect();
}

function connectElements(startElement, endElement, connectionPoint1, connectionPoint2, time, callback){
  if (!connectionPoint1){
    connectionPoint1 = 'right';
  }
  if (!connectionPoint2){
    connectionPoint2 = 'left';
  }
  if (!time){
    time = 500;
  }
  var loc1 = getLocation(startElement);
  var loc2 = getLocation(endElement);

  // Create a box containing the area between the elements
  var x = loc1.left+loc1.width;
  var y = loc1.top;
  var width = loc2.left - x;
  var height = loc1.height + loc2.height + (loc2.top - (loc1.top + loc1.height));

  // Calculate connector points
  if (connectionPoint1 == 'left'){
    var start = {'x': loc1.left,'y': loc1.top + (loc1.height / 2)};
  } else if (connectionPoint1 == 'right'){
    var start = {'x': x,'y': y + (loc1.height / 2)};
  } else if (connectionPoint1 == 'top'){
    var start = {'x': loc1.left + (loc1.width / 2),'y': loc1.top};
  } else if (connectionPoint1 == 'bottom'){
    var start = {'x': loc1.left + (loc1.width / 2),'y': loc1.top + loc1.height};
  } else if (connectionPoint1 == 'center'){
    var start = {'x': loc1.left + (loc1.width / 2),'y': loc1.top + (loc1.height / 2)};
  }

  if (connectionPoint2 == 'left'){
    var end = {'x': x + width,'y': loc2.top + (loc2.height / 2)};
  } else if (connectionPoint2 == 'right'){
    var end = {'x': loc2.left + loc2.width,'y': loc2.top + (loc2.height / 2)};
  } else if (connectionPoint2 == 'top'){
    var end = {'x': loc2.left + (loc2.width / 2),'y': loc2.top};
  } else if (connectionPoint2 == 'bottom'){
    var end = {'x': loc2.left + (loc2.width / 2),'y': loc2.top + loc2.height};
  } else if (connectionPoint2 == 'center'){
    var end = {'x': loc2.left + (loc2.width / 2),'y': loc2.top + (loc2.height / 2)};
  }

  // Add the Arrow
  drawArrow(start, end, 'leftToRight', 2, time,callback)
}

function drawArrow(startPosition, endPosition, orientation, numberOfCurves, time, callback){
  // 
  // orientation is either leftToRight or topToBottom
  // 
  // startPosition and endPosition are objects that look like: {'x': 0,'y': 0}
  // Start is absolute within the canvas, end is relative to that position.
  // numberOfCurves can be 1 or 2
  //

  if (!orientation){
    var orientation = 'leftToRight';
  }
  if (!numberOfCurves){
    var numberOfCurves = 0;
  }

  var arrowContainer = document.createElement('arrow');
  arrowContainer.style.position = 'absolute';
  arrowContainer.style.left = 0 + 'px';
  arrowContainer.style.top = 0 + 'px';
  document.body.appendChild(arrowContainer);

  sx = startPosition.x;
  sy = startPosition.y;
  ex = endPosition.x;
  ey = endPosition.y;
  sxy = sx + "," + sy;
  exy = ex + "," + ey;
  console.log("Creating Arrow starting at "+sxy+" ending at "+exy);

  var width = Math.max(ex,sx) + 15; // 15 px padding to make sure nothing is clipped
  var height = Math.max(ey,sy) + 15;

  var paper = new Raphael(arrowContainer, width, height);

  // Start the path at zero for animation
  var path = paper.path("M"+sx+","+sy);
  path.attr({
    'arrow-end': 'none',
    'arrow-start': 'none',
    'stroke': '#000',
    'stroke-width': '2px',
    'overflow': 'visible'
  });

  if (numberOfCurves == 0){
    var finalPathString = "M"+sxy+" "+"Q"+exy+" "+exy;
    path.animate({path: finalTransform}, 600, callback);
  }

  if (numberOfCurves == 1){
    var controlPoint1 = ex+","+sy;
    var finalPathString = "M"+sxy+" "+"Q"+controlPoint1+" "+exy;

    animatePath(paper, finalPathString, time, path.attr, callback);
  }

  if (numberOfCurves == 2){
    var controlPoint1 = ex+","+sy;
    var controlPoint2 = sx+","+ey;
    var finalPathString = "M"+sxy+" "+"C"+controlPoint1+" "+controlPoint2+" "+exy;
    
    animatePath(paper, finalPathString, time, path.attr, callback);
  }
}

function animatePath( canvas, pathstr, duration, attr, callback )
{
  var guide_path = canvas.path(pathstr).attr({stroke: "none", fill: "none"});
  var path = canvas.path(guide_path.getSubpath(0,1)).attr(attr);
  var total_length = guide_path.getTotalLength( guide_path );
  var last_point = guide_path.getPointAtLength(0);
  var start_time = new Date().getTime();
  var interval_length = 1;
  var result = path;

  var interval_id = setInterval( function()
  {
      var elapsed_time = new Date().getTime() - start_time;
      var this_length = elapsed_time / duration * total_length;
      var subpathstr = guide_path.getSubpath( 0, this_length );            
      attr.path = subpathstr;

      path.animate( attr, interval_length );
      if ( elapsed_time >= duration )
      {
          clearInterval( interval_id );
          if ( callback != undefined ) callback();
              guide_path.remove();
      }                                       
  }, interval_length );  
  return result;
}