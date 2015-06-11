window.onload = function() {
  connectElements(test1, test2, '6','4',500,function(){
    $('#test2').animate({'opacity':'1'}, 500, function(){
      connectElements(test2, test21, '6','4',500,function(){
        $('#test21').animate({'opacity':'1'}, 500);
      });
      connectElements(test2, test22, '6','4',500,function(){
        $('#test22').animate({'opacity':'1'}, 500);
      });
      connectElements(test2, test23, '6','4',500,function(){
        $('#test23').animate({'opacity':'1'}, 500, function(){
          connectElements(test23, test231, '6','4',500,function(){
            $('#test231').animate({'opacity':'1'}, 500);
          });
          connectElements(test23, test232, '6','4',500,function(){
            $('#test232').animate({'opacity':'1'}, 500);
          });
          connectElements(test23, test233, '6','4',500,function(){
            $('#test233').animate({'opacity':'1'}, 500, function(){
              connectElements(test233, test6, '7', '7', 1000, function(){
                connectElements(test6, test7, '9','1', 1000);
              });
            });
          });
        });
      });
    });
  });
  connectElements(test1, test3, '6','4',500,function(){
    $('#test3').animate({'opacity':'1'}, 500);
  });
  connectElements(test1, test4, '6','4',500,function(){
    $('#test4').animate({'opacity':'1'}, 500);
  });
  connectElements(test1, test5, '6','4',500,function(){
    $('#test5').animate({'opacity':'1'}, 500);
  });
}

function connectElements(startElement, endElement, connectionPoint1, connectionPoint2, time, callback) {
  // Create the Arrow
  var options = {
    'numberOfCurves': 2,
    'animation': {
      'time': time,
    },
    'orientation': 'leftToRight'
  };

  var arrow = new Arrow(options);
  arrow.makeConnector(startElement, endElement, connectionPoint1,connectionPoint2);
  arrow.draw(callback);
}