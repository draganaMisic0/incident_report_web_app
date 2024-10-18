package com.example.pisio.incident_report.repositories;

import com.example.pisio.incident_report.models.entities.IncidentSubtypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentSubtypeEntityRepository extends
        JpaRepository<IncidentSubtypeEntity, Integer> {
}
