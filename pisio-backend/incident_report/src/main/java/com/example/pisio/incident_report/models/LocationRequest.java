package com.example.pisio.incident_report.models;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LocationRequest {


    private BigDecimal longitude;

    private BigDecimal latitude;

}
