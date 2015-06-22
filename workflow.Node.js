function Node(options){

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
    },
  }
  
  if (options){this.options = options;} else {this.options = {};}
  for (option in this.defaults) {
    if (option instanceof Object) {
      for (subOption in option) {
        if (!this.options[option][subOption]) {
          this.options[option][subOption] = option[subOption];
        }
      }
    } else {
      if (!this.options[option]) {
        this.options[option] = this.defaults[option];
      }
    }
  }

  this.domNode = document.createElement('node');

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
}