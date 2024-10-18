import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IncidentSelectionService } from 'app/services/incident-selection.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, RouterOutlet],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})


export class MapComponent implements OnInit{

  map: any;
  marker: any;
  lat!: number;
  lng!: number;
  locationName!: string;
  isButtonDisabled = true;
  

  constructor(private router:Router, public incidentSelector: IncidentSelectionService, private cdr: ChangeDetectorRef){}


  handleClickAddIncident = () => {
    console.log("Show add incident clicked")
    this.router.navigate(['/forms/select']);
  }


  ngOnInit(): void {
   this.initMap();
  }

 private initMap = async () => {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  this.map = new google.maps.Map(document.getElementById("map") as any, {
    mapId: "dragana",
    center: new google.maps.LatLng(44.77066596225198, 17.19084910773),

    zoom: 13,
    
  });

  this.map.addListener('click', (event: any) => {
    this.onMapClick(event);
  });
}

private onMapClick(event: any): void {
console.log(this.isButtonDisabled);
  this.isButtonDisabled = false;
  this.cdr.detectChanges();
  console.log(this.isButtonDisabled);
  this.lat = event.latLng.lat(); // Get the latitude of the clicked location
  this.lng = event.latLng.lng(); // Get the longitude of the clicked location
  
  if(this.incidentSelector.selectedIncident!=undefined){
     this.incidentSelector.selectedIncident.longitude = this.lng;
     this.incidentSelector.selectedIncident.latitude=this.lat;
  }
  console.log(`Map clicked at Latitude: ${  this.incidentSelector.selectedIncident?.latitude}, Longitude: ${this.incidentSelector.selectedIncident?.longitude}`);

  if (this.marker) {
    this.marker.setMap(null); // Remove the marker from the map
  }
  // Optional: Add a marker at the clicked location
  this.marker = new google.maps.Marker({
    position: { lat: this.lat, lng: this.lng },
    map: this.map,
    title: 'Clicked Location'
  });

 
}


}
