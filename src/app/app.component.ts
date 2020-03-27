/// <reference types="@types/googlemaps" />
import { Component, ViewChild } from '@angular/core';
declare let google : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('gmap', {static: false}) gmapElement: any;
  map: google.maps.Map;
  latitude : number;
  longitude: number;
  title = 'user-location';


  ngOnInit() {
    this.findMe();
  }
  
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          console.log("Latitude: " + position.coords.latitude)
          console.log("Longitude: " + position.coords.longitude)
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.showPosition(position);
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    
    let mapProp = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    var flightPlanCoordinates = [
      {lat: 28.3991744, lng: 77.0365766},
      {lat: position.coords.latitude, lng: position.coords.longitude},
      {lat: 28.74939, lng: 77.1023706},
      {lat: 28.699581, lng: 77.2549423}
    ];

    let marker;
    for (let i = 0; i < flightPlanCoordinates.length; i++) {
        location = new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng);
        marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }

    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(this.map);

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
 }

 simpleMarkerHandler() {
  alert('Simple Component\'s function...');
}

markerHandler(marker: google.maps.Marker) {
  alert('Marker\'s Title: ' + marker.getTitle());
}
}
