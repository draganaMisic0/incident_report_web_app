package com.example.pisio.incident_report.models.entities;

import com.example.pisio.incident_report.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "incident")
public class IncidentEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "photo_link", length = 500)
    private String photoLink;

    @Column(name = "date_of_report", nullable = false)
    private LocalDateTime dateOfReport;



    @Column(name = "approved", nullable = false)
    private Boolean approved;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "location_id", nullable = false, referencedColumnName = "id")
    private LocationEntity location;



    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "incident_subtype_id", nullable = false, referencedColumnName = "id")
    private IncidentSubtypeEntity incidentSubtype;

}