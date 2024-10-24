import { ChangeDetectorRef, inject, Injectable, OnInit } from '@angular/core';
import { Incident } from 'app/models/incident';
import { BehaviorSubject } from 'rxjs';
import { TablesRemoteDataService } from '../tables/list-of-incidents/list-of-incidents.service';
import { MatDialogModule } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})



export class MapService {

  private map: any;
  public approvedIncidents: Incident[]=[];
  public filteredIncidents: Incident[]=[];
  private mapOptions: google.maps.MapOptions={ }
  
  

  public selectedLatLng: google.maps.LatLng={} as any;
  private selectedLatLngSubject = new BehaviorSubject<google.maps.LatLng | null >(null);
  public selectedLatLng$ = this.selectedLatLngSubject.asObservable();

  private markerUpdatedSubject = new BehaviorSubject<boolean | null >(null);
  public markerUpdatedObservable$ = this.markerUpdatedSubject.asObservable();
  
  private marker : google.maps.marker.AdvancedMarkerElement={} as any;
  public markerList: google.maps.marker.AdvancedMarkerElement[] =[];

  private incidentToDisplaySubject= new BehaviorSubject<Incident | null> (null);
  public incidentToDisplay$= this.incidentToDisplaySubject.asObservable();
  public filterFlag = false; 

  constructor(
    private remoteSrv: TablesRemoteDataService) {
   }

  async initialize(lat_lng: google.maps.LatLng, mapDiv: HTMLElement){

    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    this.mapOptions={
      mapId :"draganina_mapa",
      center: lat_lng,
      clickableIcons: false,
      zoom: 14
    }

    this.map=new google.maps.Map(mapDiv, this.mapOptions);
    this.map.addListener("click", (event: any)=>{

      this.onMapClick(event);
    });
    if(!this.filterFlag){

      this.remoteSrv.getData().subscribe((result: any) =>{
        console.log('result');
        console.log(result);
          let tempResults=result;
          this.approvedIncidents=result;
          this.loadMarkers(tempResults);
      });
    }
    else{

      this.loadMarkers(this.filteredIncidents);
    }
    


  }

  async loadMarkers(incidents: Incident[]){
    const { AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    incidents.forEach((element: any)=>{
  
      const pinBackground = new PinElement({
        background: "#40e0d0",
      });
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: { lat: element.location.latitude, lng: element.location.longitude },
        gmpClickable: true,
        content : pinBackground.element, 
        zIndex: 999

      });
      marker['id'] = element.id; 

      // Add click listener for the marker
      marker.addListener('click', () => {
          this.markerClicked(element); // Call the function to handle marker click
      });


      this.markerUpdatedSubject.next(true);
      this.markerList.push(marker);
    });

  }
  

  markerClicked(incident: Incident) {
    console.log(incident);
    this.incidentToDisplaySubject.next(incident);
   
  }
  getIncidentById(incidentId: number){

    return this.remoteSrv.getIncidentById(incidentId);
  }
 
  setIncidentToDisplay(incident: Incident) {
    this.incidentToDisplaySubject.next(incident);
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
      this.markerUpdatedSubject.next(true);
    }
  }

