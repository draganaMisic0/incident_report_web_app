import { IncidentSubtype } from "./incident_subtype";
import { IncidentType } from "./incident_type";
import {Location} from "./location";


export interface IncidentRequest{

    id: number | null; 
    description : string;  
    incidentSubtype : IncidentSubtype; 
    photoLink: string | null; 
    longitude : number; 
    latitude: number;
    approved: number;
    dateOfReport: string;

}