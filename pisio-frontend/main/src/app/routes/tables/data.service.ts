import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable
import { IncidentRequest } from 'app/models/incident_request';

@Injectable()
export class TablesDataService {

  private approvedIncidents: any[]=[];
  
  constructor(private http: HttpClient) {} // Use constructor injection

  
  
  getData(): Observable<any> { // Corrected return type syntax
    return this.http.get<any>('http://localhost:8080/incidents/pending');
  }

  delete(incidentId: number): Observable<void>{

    return this.http.delete<void>(`http://localhost:8080/incidents/${incidentId}`);

  } 

  update(incidentId: number, incidentRequest: IncidentRequest): Observable<any>{

    return this.http.put<any>(`http://localhost:8080/incidents/${incidentId}`, incidentRequest);
  }


}
