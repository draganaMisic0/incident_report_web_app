import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

import { PageHeaderComponent } from '@shared';
import { TablesDataService } from '../data.service';

import { IncidentRequest } from 'app/models/incident_request';
import { Incident } from 'app/models/incident';
import { TablesRemoteDataService } from '../list-of-incidents/list-of-incidents.service';
import { GoogleAuthService } from 'app/routes/sessions/login/google-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-pending-incidents',
  templateUrl: './pending-incidents.component.html',
  styleUrl: './pending-incidents.component.scss',
  providers: [TablesDataService, TablesRemoteDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
  ],
})
export class TablesKitchenSinkComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly dataSrv = inject(TablesDataService);
  private readonly dialog = inject(MtxDialog);
  private readonly remoteSrv = inject(TablesRemoteDataService);
  private readonly authGoogle= inject(GoogleAuthService);
  private readonly router = inject(Router);

  columns: MtxGridColumn[] = [
    
    {
      header: this.translate.stream('Location Latitude'),
      field: 'location.latitude',
      minWidth: 180,
      width: '100px',
    },
    {
      header: this.translate.stream('Location Longitude'),
      field: 'location.longitude',
      minWidth: 180,
      width: '100px',

      
    },
    { 
      header: 'Incident type', 
      field: 'incidentSubtype.incidentTypeId', 
      width:'70px' 

    },
    { 
      header: 'Incident Subtype', 
      field: 'incidentSubtype.name',
       width: '200px'
    },
    { 
      header: 'Description', 
      field: 'description',
       width: '150px' 
    },
    { 
      header: 'Date of creation', 
      field: 'dateOfReport', 
      width: '130px'
    },
    { 
      header: 'Image link', 
      field: 'photoLink', 
      type: 'link', 
      width:'200px'
    },
   
    {
      header: this.translate.stream('operation'),
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'check_small',
          tooltip: this.translate.stream('approve'),
          pop: {
            title: this.translate.stream('confirm_approve'),
            closeText: this.translate.stream('cancel'),
            okText: this.translate.stream('ok'),
          },
          click: record => this.edit(record.id, {id: record.id as number, approved: true} as any),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('cancel'),
            okText: this.translate.stream('ok'),
          },
          click: record => this.delete(record.id),
        },
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  approvedIncidents: any[] = [];

  ngOnInit() {

    if(!this.authGoogle.loggedIn()){
      alert('User MUST be logged in to access.');
      this.router.navigate(['/dashboard']);
    }
    this.dataSrv.getData().subscribe(result => {this.list=result;});
    this.isLoading = false;
  }

  edit(id: number, incidentRequest: IncidentRequest) {

    this.dataSrv.update(id, incidentRequest ).subscribe();
    
    this.dialog.alert("Incident "+id+" is approved and moved to the 'List of incidents' table.");
   

   
  }

  delete(id: number) {

    console.log("id"+id);
    
    this.dataSrv.delete(id).subscribe();
    this.dialog.alert(`Incident deleted!`);
    this.refreshPage();

  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }

  refreshPage() {
    this.router.navigateByUrl('/tables/refresh');
  }
}
