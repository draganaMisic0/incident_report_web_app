import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { Observable } from 'rxjs';
import {
  MtxDatetimepickerFilterType,
  MtxDatetimepickerModule,
} from '@ng-matero/extensions/datetimepicker';
import { PageHeaderComponent } from '@shared';
import { DataService, Person } from '../data.service';
import { FormsSelectEditComponent } from './edit/edit.component';
import { ToastrService } from 'ngx-toastr';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { IncidentSelectionService } from 'app/services/incident-selection.service';
import { Router } from '@angular/router';
import { IncidentAddedDialogComponent } from '../incident-added-dialog/incident-added-dialog.component';
import { AuthGoogleService } from 'app/auth-google.service';




@Component({
  selector: 'app-forms-selects',
  templateUrl: './select.component.html',
  
  styleUrl: './select.component.scss',
  providers: [DataService],
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MtxSelectModule,
    MtxDatetimepickerModule,
    PageHeaderComponent,
    ReactiveFormsModule, 
    MatDialogActions, 
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ]
})
export class FormsSelectComponent implements OnInit {

  userForm: FormGroup = {} as FormGroup;
  private readonly dialog = inject(MatDialog);
  private readonly dataService = inject(DataService);
  private readonly toast = inject(ToastrService);


  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);

  // Data source
 
  group: FormGroup;
  tomorrow: moment.Moment;
  today: moment.Moment;
  min: moment.Moment;
  max: moment.Moment;
  start: moment.Moment;
  filter: (date: moment.Moment | null, type: MtxDatetimepickerFilterType) => boolean;


  selectedSimpleItem = 'Two';
  simpleItems: any[] = [];
  disable = true;

  selectedCarId = 3;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  // Tags
  companies: any[] = [];
  loading = false;

  incidentTypes : any[]=[];
  selectedIncidentType: number | null=null;
  incidentSubtypes : any[]=[];
  filteredIncidentSubtypes: any[]=[];
  incidentDescription: string= "";
  imageUrl: string | ArrayBuffer | null = null;
  isSubmitDisabled=true;
  readonly incidentAddedDialog = inject(MatDialog);

 

  constructor(private incidentSelector: IncidentSelectionService, private authGoogle: AuthGoogleService,
    private fb: FormBuilder, private router:Router) {
    this.today = moment.utc();
    this.tomorrow = moment.utc().date(moment.utc().date() + 1);
    this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
    this.max = this.min.clone().date(4).minute(45);
    this.start = this.today.clone().year(1930).month(9).date(28);
    this.filter = (date: moment.Moment | null, type: MtxDatetimepickerFilterType) => {
      if (date === null) {
        return true;
      }
      switch (type) {
        case MtxDatetimepickerFilterType.DATE:
          return date.year() % 2 === 0 && date.month() % 2 === 0 && date.date() % 2 === 0;
        case MtxDatetimepickerFilterType.HOUR:
          return date.hour() % 2 === 0;
        case MtxDatetimepickerFilterType.MINUTE:
          return date.minute() % 2 === 0;
      }

      this.userForm = this.fb.group({
        incidentControl: ['', Validators.required],
        dateTimeControl: ['', Validators.required],
        subtypeControl: ['', Validators.required]

      })
    };

    this.group = this.fb.group({
      dateTime: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      dateTimeManual: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      dateTimeYear: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      timeAMPM: [null, Validators.required],
      timeAMPMManual: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      mintest: [this.today, Validators.required],
      filtertest: [this.today, Validators.required],
      touch: [null, Validators.required],
    });
    
  }
  ngOnInit() {

    if(this.incidentSelector.selectedIncident.longitude == undefined || this.incidentSelector.selectedIncident.latitude == undefined){
      alert('First click on the map to report an incident.');
      this.router.navigate(['/map']);
    }

   
    this.dataService.getIncidentTypes().subscribe((result: any[]) => {

      this.incidentTypes=result;
      
    });

    this.dataService.getIncidentSubtypes().subscribe((result: any[])=>{

      this.incidentSubtypes=result;

    })







    this.simpleItems = [true, 'Two', 3, {id: 1, name: "Solid"}];

    
  }
  onIncidentTypeChange(selectedId: number | null): void {
    // If you want to log the whole object
    const selectedIncidentType = this.incidentTypes.find(item => item.id === selectedId);
    if(this.incidentSelector.selectedIncident!=undefined){
      this.incidentSelector.selectedIncident.incidentSubtype=selectedIncidentType;
    }
    
  }
  onTypeChange(selectedValue: any){

    let incidentTypeId=selectedValue.id as number;
    
    this.filteredIncidentSubtypes=this.incidentSubtypes.filter(subtype=>{

      return subtype.incidentTypeId===incidentTypeId;
    });
    let selected_subtypeDOM:any=document.getElementById("subtype_select");
  }

  onSubtypeChange(selectedValue : any){

    console.log(selectedValue);
    if(this.incidentSelector.selectedIncident!=undefined){
      this.incidentSelector.selectedIncident.incidentSubtype=selectedValue;
    }

    this.checkIfFormValid();


  }
  
  dateTimeInput(event: any) {
    // Get the value from the datetime input (expected to be a string)
    const dateTimeString = event.target.value; // e.g., '2024-10-22T17:25'

    // Create a local date object from the string
    const localDate = new Date(dateTimeString); // Local date and time

    // Convert to UTC
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    // Store the UTC date in the selectedIncident's dateOfReport
    this.incidentSelector.selectedIncident.dateOfReport = utcDate.toISOString();;

    // Log the stored time for debugging
    console.log("Stored date and time (UTC):", utcDate);

    // Validate the form
    this.checkIfFormValid();
}


  checkIfFormValid(): void {
    if(this.incidentSelector.selectedIncident.incidentSubtype != null && this.incidentSelector.selectedIncident.dateOfReport != null)
    {
      this.isSubmitDisabled = false;
    }
    else{
      this.isSubmitDisabled = true;
    }
    
  }

   testMethod(){
    console.log("CLICKED");
   }

   textChanged(event: any){
     this.incidentDescription = event.target.value;
    if(this.incidentSelector.selectedIncident!=undefined){
      this.incidentSelector.selectedIncident.description=this.incidentDescription;
     
    }
    
   }
   cancelClick(){

    this.router.navigate(['/dashboard']);
   }
   submitclick(){

    console.log(this.group.get("dateTimeManual")?.value);
    console.log(this.incidentSelector.selectedIncident);
    this.incidentSelector.selectedIncident.approved = 0;
    if(this.incidentSelector.selectedIncident!=undefined){
      this.dataService.insertIncident(this.incidentSelector.selectedIncident).subscribe(result =>{
        console.log(result);
      });
    }
    this.isSubmitDisabled=true;
    this.afterButtonPress();

   }

   afterButtonPress(){

    this.incidentAddedDialog.open(IncidentAddedDialogComponent);
   }

   
   

   onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        // After file is loaded, assign it to the imageUrl
        this.imageUrl = reader.result;  // This will be the data URL of the image
        console.log('Image URL:', this.imageUrl);  // You can log it or use it further
        if(this.incidentSelector.selectedIncident !=undefined){
          this.incidentSelector.selectedIncident.photoLink=this.imageUrl as string;
        }
      
      };
      reader.readAsDataURL(file);  // Read the file as a data URL
    }
  }
   
















  displayCompany(company: any): string {
    return company ? company.name : '';
  }

  toggleDisabled() {
    const car: any = this.cars[1];
    car.disabled = !car.disabled;
  }

  addTag(name: string) {
    return { name, tag: true };
  }

  addTagPromise(name: string) {
    return new Promise(resolve => {
      this.loading = true;
      setTimeout(() => {
        resolve({ id: 5, name, valid: true });
        this.loading = false;
      }, 1000);
    });
  }

  openDialog() {
    this.dialog.open(FormsSelectEditComponent, {
      autoFocus: false,
    });
  }
  form = new FormGroup({});
  form2 = new FormGroup({});
  model = { email: 'email@gmail.com' };
  model2 = {};
  fields2: FormlyFieldConfig[] = [
    
    {
      type: 'textarea',
      key: 'otherInput',
      templateOptions: {
        label: 'Other Input',
      },
    },
    
  ];

  submit() {
    if (this.form.valid) {
      this.showToast(this.model);
    }
  }

  submit2() {
    if (this.form2.valid) {
      this.showToast(this.model2);
    }
  }

  showToast(obj: any) {
    this.toast.success(JSON.stringify(obj));
  }

  
}
