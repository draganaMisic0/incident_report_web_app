package com.example.pisio.incident_report.models;

import com.example.pisio.incident_report.models.entities.IncidentSubtypeEntity;
import com.example.pisio.incident_report.models.entities.LocationEntity;
import com.example.pisio.incident_report.models.entities.ModeratorEntity;
import lombok.Data;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Setter
public class IncidentRequest {


    private String description;
    private String photoLink;
    private LocalDateTime dateOfReport;
    //private LocalDate dateOfApproval;
    private Boolean approved;


   // private Integer subtypeId;

    private BigDecimal longitude;

    private BigDecimal latitude;


    private IncidentSubtype incidentSubtype;

    private Location location;


}
