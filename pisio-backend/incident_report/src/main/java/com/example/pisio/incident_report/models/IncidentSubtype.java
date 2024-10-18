package com.example.pisio.incident_report.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
public class IncidentSubtype {


    private Integer id;

    private String name;

    private Integer incidentTypeId;
}
