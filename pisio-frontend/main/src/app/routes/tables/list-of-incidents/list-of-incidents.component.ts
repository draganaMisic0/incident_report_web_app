import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';

import { PageHeaderComponent } from '@shared';
import { TablesRemoteDataService } from './list-of-incidents.service';
import { TablesDataService } from '../data.service';

@Component({
  selector: 'app-tables-remote-data',
  templateUrl: './list-of-incidents.component.html',
  styleUrl: './list-of-incidents.component.scss',
  providers: [TablesRemoteDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MtxGridModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    PageHeaderComponent,
  ],
})
export class TablesPendingIncidentsComponent implements OnInit {
  private readonly remoteSrv = inject(TablesRemoteDataService);
 //private readonly dataSrv = inject(TablesDataService);
  


  columns: MtxGridColumn[] = [
    
    {
      header: 'Location Latitude',
      field: 'location.latitude',
      minWidth: 180,
      width: '100px',
    },
    {
      header: 'Location Longitude',
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
   
  ];

  //approvedIncidents: any[] = [];
  list: any[] = [];
  total = 0;
  isLoading = true;

  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }

  ngOnInit() {
    this.getList(); // Fetch data when the component initializes
  }
  
  getList() {
    this.isLoading = true; // Set loading to true when starting the data-fetching process
  
    this.remoteSrv.getData().pipe(
      finalize(() => {
        this.isLoading = false; // Set loading to false once data is fetched
      })
    ).subscribe(
      result => {
        this.list = result; // Update your list with the fetched data
        this.total = this.list.length; // Set the total based on the data received
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoading = false; // Make sure to set loading to false if there's an error
      }
    );
  }
    
      

 
  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.per_page = e.pageSize;
    this.getList();
  }

  search() {
    this.query.page = 0;
    this.getList();
  }

  reset() {
    this.query.page = 0;
    this.query.per_page = 10;
     this.getList();
  }
     
}
