  $( function() {
    var handle = $( "#custom-handle" );

    $( "#slider" ).slider({
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
        fireSliderChange($(this), ui.value);
      }
    
    });


    $( "button" ).click( function( event ) {
      TogetherJS(this); 
      return false;
    });




  });

//togetherjs config //
window.TogetherJSConfig = {
	cloneClicks: "#custom-handle",
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

	  console.log(element);

	  $("#slider").slider("value", value);
	  $("#custom-handle").text($("#slider").slider("value"))

}