package com.example.pisio.incident_report.models.entities;

import com.example.pisio.incident_report.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "location")
public class LocationEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "longitude", nullable = false, precision = 13, scale = 10)
    private BigDecimal longitude;

    @Column(name = "latitude", nullable = false, precision = 13, scale = 10)
    private BigDecimal latitude;

    @Column(name = "name", length = 200)
    private String name;

}