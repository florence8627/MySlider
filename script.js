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

    $( "button" ).click( function( event ) {
      TogetherJS(this); 
      return false;
    } );

  } );