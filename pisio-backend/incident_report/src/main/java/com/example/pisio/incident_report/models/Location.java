package com.example.pisio.incident_report.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
@Data
public class Location {


    private Integer id;

    private BigDecimal longitude;

    private BigDecimal latitude;

   // private String name;
}
