  $( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
      }
    });

    handle.on("sliderChange", function (){
      MyApp.emit("sliderChange", this, $(this).slider("value"));
    });

    $( "button" ).click( function( event ) {
      TogetherJS(this); 
      return false;
    });

TogetherJSConfig_on_ready = function () {
  MyApp.on("sliderChange", fireTogetherJSVisibility);

};
TogetherJSConfig_on_close = function () {
  MyApp.off("sliderChange", fireTogetherJSVisibility);
};



  } );

var sliderChangeFromRemote = false;

function fireTogetherJSVisibility(element, value) {
  if(sliderChangeFromRemote){
  	return;
  }
  var elementFinder = TogetherJS.require("elementFinder");
  var location = elementFinder.elementLocation(element);
  TogetherJS.send({type: "sliderChange", value: value, element: location});
}


TogetherJS.hub.on("sliderChange", function (msg) {
  if(!msg.sameUrl){
  	return;
  }
  var elementFinder = TogetherJS.require("elementFinder");
  // If the element can't be found this will throw an exception:
  var element = elementFinder.findElement(msg.element);
  sliderChangeFromRemote = true;
  try{
   
	    $('#custom-handle').slider('value', msg.value);


   }
  finally{
  	sliderChangeFromRemote = false;
  }
});


