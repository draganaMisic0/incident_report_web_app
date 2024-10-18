package com.example.pisio.incident_report.models;

import com.example.pisio.incident_report.models.entities.IncidentSubtypeEntity;
import com.example.pisio.incident_report.models.entities.LocationEntity;
import com.example.pisio.incident_report.models.entities.ModeratorEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
@Data
public class Incident {


    private Integer id;
    private String description;
    private String photoLink;
    private String dateOfReport;
    //private LocalDate dateOfApproval;
    private Boolean approved;
    private Location location;
    //private ModeratorEntity moderator;
    private IncidentSubtype incidentSubtype;
    //private IncidentSubtypeEntity incidentSubtype;
}
