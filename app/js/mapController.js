//This Class manage the Map.
export default class MapController {
  
  //Constructo of the Class, it recieve the container id and the initial center
  constructor (container,center = undefined, markerName){
    this.container = container;
    this.center = center;
    this.markerName = markerName;
        
    //This initialize the map
    this.initMap();
  }

  //This initialize the map with the default center.
  initMap(){
    let self = this;
    this.map = new google.maps.Map(document.getElementById(self.container), {
      zoom: 17,
      center: this.center
    });
    
    this.setMarker(this.center);
  }

  setMarker(position){
    let marker = new google.maps.Marker({
      position: this.center,
      map: this.map,
      title: this.markerName
    });
  }
  
}