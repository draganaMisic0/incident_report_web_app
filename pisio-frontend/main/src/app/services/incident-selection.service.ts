import { Injectable, OnInit } from '@angular/core';
import { Incident } from 'app/models/incident';
import { IncidentRequest } from 'app/models/incident_request';

@Injectable({
  providedIn: 'root'
})
export class IncidentSelectionService{


  public selectedIncident: IncidentRequest = {} as any;
  
  constructor(){}

}
