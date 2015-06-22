window.onload = function() {

  for (var i = 0; i < 150; i++){
    var node = new Node();
    node.options.location = 'flow2';
    node.options.style.width = '25px';
    node.options.style.height = '25px';
    node.options.style.left = (i * 5) + 'px';
    node.options.style.top = (i * 2) + 'px';
    node.options.style.background = 'none';
    node.options.style.border = 'none';
    node.options.class = 'flowBlock';
    node.options.id = i;
    node.draw();

    var options = {
      'numberOfCurves': 0,
      'animation': {
        'time': 1000,
      },
      'attr': {
        'arrow-start': 'none',
        'arrow-end': 'none',
        'stroke': '#000',
        'stroke-width': '1px',
        'overflow': 'visible'
      },
      'orientation': 'leftToRight'
    };

    if (i > 2){
      var arrow = new Arrow(options);
      arrow.makeConnector(document.getElementById(1),document.getElementById(i),'6','4');
      arrow.draw();
    }
  }
}