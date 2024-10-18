package com.example.pisio.incident_report.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleLocation extends Location {
    private List<Incident> incidents    ;
}
