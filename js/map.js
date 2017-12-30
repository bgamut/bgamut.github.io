
var ZOOM = 15;

$.fn.modalMap = function(lat, lng) {
   var latlng = new google.maps.LatLng(lat, lng);
   var myOptions = {
     zoom: ZOOM,
     center: latlng,
     mapTypeControlOptions: { 
       mapTypeIds: ['mapstyle', google.maps.MapTypeId.ROADMAP] 
     }
  };
  
  // マーカーアイコン設定
  var icon = new google.maps.MarkerImage('img/map_pin.png',
    new google.maps.Size(52,90),	// アイコンサイズ設定
    new google.maps.Point(0,0)		// アイコン位置調整
  );
  
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: icon
  });
  
  //マップデザインの貼り付け
  var styleOptions = [ ];
  var sampleType = new google.maps.StyledMapType(styleOptions);
  map.mapTypes.set('mapstyle', sampleType);
  map.setMapTypeId('mapstyle');
};
