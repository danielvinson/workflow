# workflow
Flowcharts using Raphael.js



Project named workflow until I figure out a real name.

I started this project after spending a very long time making an interactive flowchart for a different project and being frustrated at how hard it was to do something that should be simple.

The goal is two steps:
* Create a javascript library which will handle all of the hard parts - the hardest parts being SVG paths to connect elements gracefully and animations between SVG elements.
* Use a file called *.flow which will define in plain text the exact type of chart that the user would like.  This can be added to a page with one line of javascript.

Currently this project is about 50% completed, which the schema parser being the final major component to be added.

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
