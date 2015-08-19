function Node(options){

  this.domNode = document.createElement('node');

  this.defaults = {
    'location': 'body',
    'class': 'node',
    'id': 'node',
    'style': {
      'position': 'absolute',
      'left': '50px',
      'top': '50px',
      'width': '150px',
      'height': '150px',
      'background': '#000',
      'border': '1px solid black',
      'text-align': 'center',
      'padding': '10px'
    },
  }

  this.options = $.extend(true, {}, this.defaults, options);

  this.applyOptions = function(){

    this.domNode.className = this.options.class;
    this.domNode.id = this.options.id;

    for (style in this.options.style){
      this.domNode.style[style] = this.options.style[style];
    }
  }
  
  this.draw = function(){
    
    this.applyOptions();
    if (this.options.location == 'body'){
      document.body.appendChild(this.domNode);
    } else {
      document.getElementById(this.options.location).appendChild(this.domNode);
    }
  }

  this.text = function(text){

    var textNode = document.createTextNode(text);
    var container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style['width'] = this.options.style.width;
    container.style['height'] = this.options.style.height;
    container.style.margin = '0';
    container.style.textAlign = 'center';
    container.style['vertical-align'] = 'middle';
    container.style.overflow = 'hidden';
    container.style['line-height'] = this.options.style.height;

    
    if (this.domNode.hasChildNodes()){
      this.domNode.removeChild(this.domNode.firstChild);
    }
    
    container.appendChild(textNode);
    this.domNode.appendChild(container);

    return container;
  }
}