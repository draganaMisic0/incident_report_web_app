import { IncidentType } from "./incident_type";


export interface IncidentSubtype{

    id: number; 
    name: string; 
    incidentType: IncidentType;
}