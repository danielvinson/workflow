window.onload = function() {

  var nodeOptions = {
    'location': 'flow',
    'style': {
      'position': 'absolute',
      'width': '100px',
      'height': '100px',
      'border-radius': '10px',
      'background': '#f0f0ff',
      'border': '1px solid rgba(255,0,0,.3)',
      'box-shadow': '1px 1px 1px rgba(0,0,0,0.3)',
      'opacity': '0'
    }
  }

  var arrowOptions = {
    'numberOfCurves': 2,
    'animation': {
      'type': 'progressive',
      'time': 1000,
    },
    'attr': {
      'arrow-start': 'none',
      'arrow-end': 'classic-wide-long',
      'stroke': '#000',
      'stroke-width': '2px',
      'overflow': 'visible'
    },
    'orientation': 'leftToRight'
  };

  var nodes = [];

  for (var i = 0; i < 4; i++){
    var node = new Node(nodeOptions);
    node.options.id = i;
    node.text('Node'+i);
    node.options.style.top = 200 + (Math.random(i) * 300) + 'px';
    node.options.style.left = 100 + i * 300 + 'px';
    nodes.push(node);
    node.draw();
  }

  nodes[0].options.style.opacity = '1';
  nodes[0].draw();

  for (node in nodes){
    $(nodes[node].domNode).click(function(){
      var arrow = new Arrow(arrowOptions);
      arrow.makeConnector(this,nodes[parseInt(this.id)+1].domNode,'6','4');
      arrow.draw();
      $(nodes[parseInt(this.id)+1].domNode).animate({opacity: 1}, 100, function(){

      });
    });
  }
}