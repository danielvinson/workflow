# workflow
Flowcharts using Raphael.js

Example: http://ec2-52-8-148-38.us-west-1.compute.amazonaws.com/flow/example/index.html

## Arrow

This will let you create arbitrary SVG arrows.  The built-in function makeConnector() will do the math for you to allow you to connect any DOM elements with an arrow.

### Options

##### .startPosition and .endPosition
Format: {'x': value,'y' value}
Location of the start and end of an arrow.

##### .numberOfCurves
Must be 0, 1, or 2.  Default is 2.  0 makes your arrow a straight line.

##### .orientation
Default: 'leftToRight'.  No other options are implemented.

##### .animation.time
Changes length of animate-in.  Set to 0 for no animation.

##### .attr
Change any standard SVG attribute for the arrow.

#### makeConnector(node1, node2, connectingPoint1, connectingPoint2)
Makes the arrow into a connector between any two DOM elements.
The location grid system is the same layout as a keypad:
```
7 8 9
4 5 6
1 2 3
```
#### draw(callback)
Draws the arrow, then calls the callback function after the animation is finished.

Example usage:
```
var arrow = new Arrow();
arrow.makeConnector(test1, test2, '6','4');
arrow.options.animation.time = 500;
arrow.options.attr['arrow-start'] = 'classic-wide-long';
arrow.options.attr['stroke-width'] = '3px';
arrow.draw();
```
