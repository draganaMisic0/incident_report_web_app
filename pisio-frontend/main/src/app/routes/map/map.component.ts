import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IncidentSelectionService } from 'app/services/incident-selection.service';
import { MapService } from './map.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, RouterOutlet],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})


export class MapComponent implements OnInit, OnDestroy{

  map: any;
  marker: any;
  lat!: number;
  lng!: number;
  locationName!: string;
  isButtonDisabled = true;
 
  private subscription!: Subscription;
  

  constructor(private router:Router, public incidentSelector: IncidentSelectionService, 
    private cdr: ChangeDetectorRef, 
    private mapService: MapService){}



  ngOnInit(): void {
   this.initMap();

   this.subscription = this.mapService.selectedLatLng$.subscribe(latLng => {
    if (latLng) {
      this.lat = latLng.lat();
      console.log("ispisujem lat "+this.lat);
      this.lng = latLng.lng();
      this.isButtonDisabled = false;
      this.cdr.detectChanges();
      this.incidentSelector.selectedIncident.longitude = this.lng;
      this.incidentSelector.selectedIncident.latitude=this.lat;
    } 
    else{

      this.isButtonDisabled=true;
    }
  });
  }

 private initMap = async () => {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
 
    this.mapService.initialize(new google.maps.LatLng(44.77066596225198, 17.19084910773), document.getElementById("map") as HTMLElement);

  
}


  handleClickAddIncident = () => {
    this.router.navigate(['/forms/select']);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }



}
