import { Injectable, OnInit } from '@angular/core';
import { Incident } from 'app/models/incident';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: any;
  private approvedIncidents: Incident[]=[];
  private mapOptions: google.maps.MapOptions={ }
  public selectedLatLng: google.maps.LatLng={} as any;
  private selectedLatLngSubject = new BehaviorSubject<google.maps.LatLng | null >(null);
  public selectedLatLng$ = this.selectedLatLngSubject.asObservable();
  
  private marker : google.maps.marker.AdvancedMarkerElement={} as any;


  constructor() { }

  async initialize(lat_lng: google.maps.LatLng, mapDiv: HTMLElement){

    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.mapOptions={
      mapId :"draganina_mapa",
      center: lat_lng,
      clickableIcons: false,
      zoom: 14
    }

    this.map=new google.maps.Map(mapDiv, this.mapOptions);
    this.map.addListener("click", (event: any)=>{
      console.log(event);

      this.onMapClick(event);
    })

  }

  private async onMapClick(event: any) {
    
    const { AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
     this.selectedLatLng=event.latLng;
     this.selectedLatLngSubject.next(this.selectedLatLng);
      console.log(this.selectedLatLng?.toJSON());
      
    
      if (this.marker) {
        this.marker.map=null; // Remove the marker from the map
      }
      // Optional: Add a marker at the clicked location
      this.marker = new google.maps.marker.AdvancedMarkerElement({
        position: this.selectedLatLng,
        map: this.map,
        title: 'Selected Location'
      });
    
     
    }

  


  }

