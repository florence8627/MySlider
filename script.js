  $( function() {
    var azi_handle = $( "#azi_handle" );

    $( "#azi_slider" ).slider({
      create: function() {
        azi_handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        azi_handle.text( ui.value );
        fireSliderChange($(this), ui.value);
      }
    
    });
   $("#azi_slider").slider("option","min", 0);
   $("#azi_slider").slider("option", "max", 360 );

    var ele_handle = $( "#ele_handle" );

    $( "#ele_slider" ).slider({
      create: function() {
        ele_handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        ele_handle.text( ui.value );
        fireSliderChange($(this), ui.value);
      }
    
    });
   $("#ele_slider").slider("option","min", 0);
   $("#ele_slider").slider("option", "max", 90 );





   $( "button" ).click( function( event ) {
      TogetherJS(this); 
      return false;
    });




  });

//togetherjs config //
window.TogetherJSConfig = {
	
	suppressJoinConfirmation: true
};

var sliderChangeFromRemote = false;

//fire custom togetherjs event
function fireSliderChange(element, value) {
  if(sliderChangeFromRemote){
  	return;
  }
  var elementFinder = TogetherJS.require("elementFinder");
  var location = elementFinder.elementLocation(element);
  TogetherJS.send({type: "sliderChange", value: value, element: location});
}



//listen to togetherjs event
TogetherJS.hub.on("sliderChange", function (msg) {
  if(!msg.sameUrl){
  	return;
  }
  var elementFinder = TogetherJS.require("elementFinder");
  // If the element can't be found this will throw an exception:
  var element = elementFinder.findElement(msg.element);
  sliderChangeFromRemote = true;
  try{
   
     
	   updateSlider(element, msg.value);
	 
   }
  finally{
  	sliderChangeFromRemote = false;
  }
});



function updateSlider(element,value){

	  // console.log($(element));

	  $(element).slider("value", value);
	  handle = $(element).children()[0];
	  handle.text($(element).slider("value"));

}