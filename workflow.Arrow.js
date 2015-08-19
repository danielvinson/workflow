function Arrow(options) {

  this.defaults = {
    'startPosition': {},
    'endPosition': {},
    'numberOfCurves': 2,
    'orientation': 'leftToRight',
    'animation': {
      'time': 1000,
      'type': 'progressive',
    },
    'attr': {
      'arrow-start': 'none',
      'arrow-end': 'classic-wide-long',
      'stroke': '#000',
      'stroke-width': '2px',
      'overflow': 'visible',
    }
  }

  this.options = $.extend(true, {}, this.defaults, options);

  this.makeConnector = function(node1, node2, connectingPoint1, connectingPoint2) {
    // Makes the arrow into a connector between any two DOM elements.
    // The location grid system is the same layout as a keypad:
    // 7 8 9
    // 4 5 6
    // 1 2 3
    //

    var loc1 = node1.getBoundingClientRect();
    var loc2 = node2.getBoundingClientRect();
    var start, end;

    // Calculate connector points

    // Start...
    if (connectingPoint1 == '1') {
      start = {
        'x': loc1.left,
        'y': loc1.top + loc1.height
      };
    } else if (connectingPoint1 == '2') {
      start = {
        'x': loc1.left + (loc1.width / 2),
        'y': loc1.top + loc1.height
      };
    } else if (connectingPoint1 == '3') {
      start = {
        'x': loc1.left + loc1.width,
        'y': loc1.top + loc1.height
      };
    } else if (connectingPoint1 == '4') {
      start = {
        'x': loc1.left,
        'y': loc1.top + (loc1.height / 2)
      };
    } else if (connectingPoint1 == '5') {
      start = {
        'x': loc1.left + (loc1.width / 2),
        'y': loc1.top + (loc1.height / 2)
      };
    } else if (connectingPoint1 == '6') {
      start = {
        'x': loc1.left + loc1.width,
        'y': loc1.top + (loc1.height / 2)
      };
    } else if (connectingPoint1 == '7') {
      start = {
        'x': loc1.left,
        'y': loc1.top
      };
    } else if (connectingPoint1 == '8') {
      start = {
        'x': loc1.left + (loc1.width / 2),
        'y': loc1.top
      };
    } else if (connectingPoint1 == '9') {
      start = {
        'x': loc1.left + loc1.width,
        'y': loc1.top
      };
    }

    // End...
    if (connectingPoint2 == '1') {
      end = {
        'x': loc2.left,
        'y': loc2.top + loc2.height
      };
    } else if (connectingPoint2 == '2') {
      end = {
        'x': loc2.left + (loc2.width / 2),
        'y': loc2.top + loc2.height
      };
    } else if (connectingPoint2 == '3') {
      end = {
        'x': loc2.left + loc2.width,
        'y': loc2.top + loc2.height
      };
    } else if (connectingPoint2 == '4') {
      end = {
        'x': loc2.left,
        'y': loc2.top + (loc2.height / 2)
      };
    } else if (connectingPoint2 == '5') {
      end = {
        'x': loc2.left + (loc2.width / 2),
        'y': loc2.top + (loc2.height / 2)
      };
    } else if (connectingPoint2 == '6') {
      end = {
        'x': loc2.left + loc2.width,
        'y': loc2.top + (loc2.height / 2)
      };
    } else if (connectingPoint2 == '7') {
      end = {
        'x': loc2.left,
        'y': loc2.top
      };
    } else if (connectingPoint2 == '8') {
      end = {
        'x': loc2.left + (loc2.width / 2),
        'y': loc2.top
      };
    } else if (connectingPoint2 == '9') {
      end = {
        'x': loc2.left + loc2.width,
        'y': loc2.top
      };
    }

    this.options.startPosition = start;
    this.options.endPosition = end;
    return [start, end];
  }

  this.draw = function(callback) {

    if (!callback) callback = function() {};

    options = this.options;

    // Create a DOM element <arrow> to contain the arrow.
    var arrowContainer = document.createElement('arrow');
    arrowContainer.style.position = 'absolute';
    arrowContainer.style.left = 0 + 'px';
    arrowContainer.style.top = 0 + 'px';
    document.body.appendChild(arrowContainer);

    // Raphael markers go beyond the SVG element, so padding is needed
    if (options.attr['arrow-start'] != 'none') {
      sx = options.startPosition.x + (parseInt(options.attr['stroke-width']) * 2);
    } else {
      sx = options.startPosition.x;
    }
    sy = options.startPosition.y;
    if (options.attr['arrow-end'] != 'none') {
      ex = options.endPosition.x - (parseInt(options.attr['stroke-width']) * 2);
    } else {
      ex = options.endPosition.x;
    }
    ey = options.endPosition.y;
    sxy = sx + "," + sy;
    exy = ex + "," + ey;

    // Create Raphael canvas
    var width = Math.max(ex, sx) + 15; // 15 px padding to make sure nothing is clipped
    var height = Math.max(ey, sy) + 15;
    var paper = new Raphael(arrowContainer, width, height);

    var controlPoint1 = ex + "," + sy;
    var controlPoint2 = sx + "," + ey;

    if (options.numberOfCurves == 0) {
      var pathString = "M" + sxy + " " + "Q" + exy + " " + exy;
    }
    if (options.numberOfCurves == 1) {
      var pathString = "M" + sxy + " " + "Q" + controlPoint1 + " " + exy;
    }
    if (options.numberOfCurves == 2) {
      var pathString = "M" + sxy + " " + "C" + controlPoint1 + " " + controlPoint2 + " " + exy;
    }

    // Other animation options TBD
    if (options.animation.type == 'progressive'){
      progressiveDraw(paper, pathString, options.animation.time, options.attr, callback);
    } else {
      // No Animation
      var path = paper.path(pathString);
      path.attr(options.attr);
      if (callback != undefined) callback();
    }

    function progressiveDraw(canvas, pathstr, duration, attr, callback) {
      // From http://stackoverflow.com/questions/4631019/how-to-draw-a-vector-path-progressively-raphael-js
      // This will break the line into small pieces and draw them one by one.
      var guide_path = canvas.path(pathstr).attr({
        stroke: "none",
        fill: "none"
      });
      var path = canvas.path(guide_path.getSubpath(0, 1)).attr(attr);
      var total_length = guide_path.getTotalLength(guide_path);
      var last_point = guide_path.getPointAtLength(0);
      var start_time = new Date().getTime();
      var interval_length = 1;
      var result = path;

      var interval_id = setInterval(function() {
        var elapsed_time = new Date().getTime() - start_time;
        var this_length = elapsed_time / duration * total_length;
        var subpathstr = guide_path.getSubpath(0, this_length);
        attr.path = subpathstr;

        path.animate(attr, interval_length);
        if (elapsed_time >= duration) {
          clearInterval(interval_id);
          if (callback != undefined) callback();
          guide_path.remove();
        }
      }, interval_length);
      return result;
    }
  }
}