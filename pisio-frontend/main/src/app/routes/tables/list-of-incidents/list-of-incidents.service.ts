import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RepoSearchList {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TablesRemoteDataService {
  constructor(private http: HttpClient){}
 
  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/incidents/approved');
  }

  getIncidentById(incidentId: number){

    return this.http.get<any>(`http://localhost:8080/incidents/${incidentId}`);
  }
    
}
