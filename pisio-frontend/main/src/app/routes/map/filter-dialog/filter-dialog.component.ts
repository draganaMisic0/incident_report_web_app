import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MtxDatetimepicker, MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxOption, MtxSelect } from '@ng-matero/extensions/select';
import { DataService } from 'app/routes/forms/data.service';
import { IncidentSelectionService } from 'app/services/incident-selection.service';
import moment from 'moment';
import { MapService } from '../map.service';
import { Incident } from 'app/models/incident';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSliderModule,FormsModule, MatButtonModule, FormsModule, ReactiveFormsModule, MtxDatetimepickerModule, MtxSelect, MtxOption],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
  providers: [DataService]
})
export class FilterDialogComponent implements OnInit {

  group: FormGroup;
  tomorrow: moment.Moment;
  today: moment.Moment;
  min: moment.Moment;
  max: moment.Moment;
  start: moment.Moment;
  private readonly dataService = inject(DataService);

  constructor(private incidentSelector: IncidentSelectionService, 
    private fb: FormBuilder, private mapService: MapService , 
    private dialogRef: MatDialogRef<FilterDialogComponent>, private router: Router){
    this.today = moment.utc();
    this.tomorrow = moment.utc().date(moment.utc().date() + 1);
    this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
    this.max = this.min.clone().date(4).minute(45);
    this.start = this.today.clone().year(1930).month(9).date(28);

    this.group = this.fb.group({
      typeControl: [null],  // Ensure this is initialized
      subtypeControl: [null],
    });
  }
  incidentTypes : any[]=[];
  selectedIncidentType: number | null=null;
  incidentSubtypes : any[]=[];
  filteredIncidentSubtypes: any[]=[];
  incidentDescription: string= "";
  selectedIncident: Incident | null=null;
  
  typeControl=new FormControl('',[]);
  subtypeControl=new FormControl('', []);
  datetimeControl=new FormControl('', []);
  distanceControl: FormControl<number | null>=new FormControl(null, []);
  


  ngOnInit() {
    
    this.dataService.getIncidentTypes().subscribe({
      next: (result: any[]) => {
        this.incidentTypes = result;
      },
      error: (error) => {
        console.error('Error fetching incident types:', error);
      }
    });
    
    this.dataService.getIncidentSubtypes().subscribe({
      next: (result: any[]) => {
        this.incidentSubtypes = result;

      },
      error: (error) => {
        console.error('Error fetching incident subtypes:', error);
      }
    });



  }
 

  onTypeChange(selectedValue: any){


    let incidentTypeId=selectedValue.id as number;
    
    this.filteredIncidentSubtypes=this.incidentSubtypes.filter(subtype=>{

      return subtype.incidentTypeId===incidentTypeId;
    });
    let selected_subtypeDOM:any=document.getElementById("subtype_select");
    if(this.selectedIncident!=null){
      this.selectedIncident.incidentType=selectedValue;
    }
    
  }

  formatLabel(value: number): string {


    return `${value}`;
  }

  onCancel(){

    this.dialogRef.close();

  }

  onFilter() {
    
    const incidents = this.mapService.approvedIncidents;

    const selectedIncidentType: any = this.typeControl.value;
    const selectedIncidentSubtype: any = this.subtypeControl.value;

    const selectedDate = this.datetimeControl.value; 
    const selectedDistance = this.distanceControl.value; 
    let filteredIncidents: any[] = this.mapService.approvedIncidents;

    if(selectedIncidentType){
      filteredIncidents = filteredIncidents.filter(incident => {
        return (incident.incidentSubtype as any).incidentTypeId==selectedIncidentType.id;
      });
    }
    
      if(selectedIncidentSubtype){
      filteredIncidents=filteredIncidents.filter(incident=>{
        return incident.incidentSubtype.id==selectedIncidentSubtype.id;
      })
    }
    if(selectedDate){

      filteredIncidents=filteredIncidents.filter(incident=>{
        return incident.dateOfReport=selectedDate;
      })
    }
    if(selectedDistance){
      
     
      const selectedOnMap = this.mapService.selectedLatLng;
      
      filteredIncidents=filteredIncidents.filter((incident : any) => {
        
        const incidentCoords = new google.maps.LatLng({lat: incident.location.latitude, lng: incident.location.longitude});

        const distanceToIncident = google.maps.geometry.spherical.computeDistanceBetween(selectedOnMap, incidentCoords);
        
  

        return distanceToIncident <= selectedDistance;
      });
    } 

    
    
    this.mapService.filteredIncidents=filteredIncidents;
    this.mapService.filterFlag=true;


    this.refreshMap();
    this.dialogRef.close();

  }

  
  refreshMap(){
    this.router.navigate(['/map-refresh']);
  }
  
  

}
