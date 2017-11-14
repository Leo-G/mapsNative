import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { Component } from "@angular/core/";
 import { Platform } from 'ionic-angular';
 import { Geolocation } from '@ionic-native/geolocation';
 
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html'
 })
 export class HomePage {
   map: GoogleMap;
   lat: any;
   long: any;
   constructor(private googleMaps: GoogleMaps, public platform: Platform, private geolocation: Geolocation) { 
  
  
       this.platform.ready().then(() => {
                this.loadMap();
                     });

                    }

   
 
  loadMap() {

    console.log("1");

    this.geolocation.getCurrentPosition().then((resp) => {

      console.log("12");
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    
    console.log(this.lat);
 
     let mapOptions: GoogleMapOptions = {
       camera: {
         target: {
           lat: this.lat,
           lng: this.long
         },
         zoom: 18,
         tilt: 30
       }
     };

 
          
     this.map = GoogleMaps.create('map', mapOptions);


    console.log('123');

    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('Map is ready!');

      // Now you can use all methods safely.
      this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.long
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            });
        });

    });
   
  }).catch((error) => {
    console.log('Error getting location', error);
  });
  

   


 
    
   }
 }