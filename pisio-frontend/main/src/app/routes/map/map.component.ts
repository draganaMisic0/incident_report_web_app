import { AfterViewInit, ChangeDetectorRef, Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';


import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IncidentSelectionService } from 'app/services/incident-selection.service';
import { MapService } from './map.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { Incident } from 'app/models/incident';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { AppComponent } from 'app/app.component';
import { GoogleMapsModule } from '@angular/google-maps';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
   
    GoogleMapsModule,
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'] // Corrected to "styleUrls"
})



export class MapComponent implements OnInit, AfterViewInit, OnDestroy{

  map: any;
  marker: any;
  lat!: number;
  lng!: number;
  locationName!: string;
  public isButtonDisabled = true;
  displayedColumns: string[] = ['category', 'value'];
  incidentToDisplay: Incident | undefined;
 
  private subscription!: Subscription;
  private changeSubscription!: Subscription;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);


  constructor(private router:Router, public incidentSelector: IncidentSelectionService, 
    private cdr: ChangeDetectorRef, 
    public mapService: MapService){

      
    }



  ngOnInit(): void {

  
   this.initMap();

   this.subscription = this.mapService.selectedLatLng$.subscribe(latLng => {
    if (latLng) {
      this.lat = latLng.lat();
      console.log("ispisujem lat "+this.lat);
      this.lng = latLng.lng();
      this.isButtonDisabled = false;
      
      this.incidentSelector.selectedIncident.longitude = this.lng;
      this.incidentSelector.selectedIncident.latitude=this.lat;
    } 
    else{

      this.isButtonDisabled=true;
    }
    this.cdr.detectChanges();
  });
  this.changeSubscription = this.mapService.markerUpdatedObservable$.subscribe(result => {
    if(result == true){
      console.log("Change happened");
      this.cdr.detectChanges();
    }
  })
  }

  ngAfterViewInit(): void {
    this.isButtonDisabled=true;
    this.cdr.detectChanges();
  }

  
 private initMap = async () => {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
 
    this.mapService.initialize(new google.maps.LatLng(44.77066596225198, 17.19084910773), document.getElementById("map") as HTMLElement);
    this.mapService.incidentToDisplay$.subscribe(incident=>{

      this.incidentToDisplay=incident as Incident;
      console.log(this.incidentToDisplay);
      this.cdr.detectChanges();
    })
  
}
 

  handleClickAddIncident = () => {


    this.isButtonDisabled=true;
    this.router.navigate(['/forms/select']);
    
    
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
    this.changeSubscription.unsubscribe();
  }
  onCancelFilter(){

    this.mapService.filterFlag=false;
    this.refreshMap();
  }


  openFilterDialog(){
    console.log("filter");
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '60rem',
      data: {name: this.name(), animal: this.animal()},
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

  refreshMap(){
   
    this.router.navigate(['/map-refresh']);
  }
  }

 

 