//initializing the deviceready eventlistener
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() 
{

   StatusBar.overlaysWebView(true);

     StatusBar.show();

}



var geocoder;
  var map;
  function initialize() {
    console.log('initialize');
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);



    var mapOptions = {

     
      zoom: 2,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);



  
      
    }





 


function listv()
{
	 $.getJSON("http://api.geonames.org/postalCodeCountryInfoJSON?formatted=true&&username=traineecgvak&style=full",function(result){
      $.each(result, function(i, field){


      	for(var i=0;i<=field.length;i++)
{
      
        $("#list1").append("<li><a href=>"+field[i].countryName+ "</a></li>");
        $("#list1").listview('refresh');

    }
      });
    });

	
}



function currentloc()
{
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var marker = new google.maps.Marker({
            map: map,
            position: pos,
            icon:"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            
        });



      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Current Location found'
      });

       google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);});

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


}




function code()
{

$.ajax({
  url: "http://api.geonames.org/postalCodeCountryInfo?&username=traineecgvak&style=full",
  context: document.body
}).done(function(data) {

 $(data).find('country').each(function(index, element){  
  
   var address=$(element).find('countryName').text();  

 var infowindow = new google.maps.InfoWindow({content:address});
  
  geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
            
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);});
      } 
    });
 
});



});


}










$(document).ready(function(){


$('#map').one('pageshow',function(){
  initialize();
  code();
  $(this).on('pageshow',function(){
     google.maps.event.trigger(map, 'resize');
   });
});



$('#lis').click(function(){
  listv();
});



$('#lct').click(function(){
  currentloc();
});


});