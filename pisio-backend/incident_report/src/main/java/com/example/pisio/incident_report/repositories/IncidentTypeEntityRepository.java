package com.example.pisio.incident_report.repositories;

import com.example.pisio.incident_report.models.entities.IncidentTypeEntity;
import com.example.pisio.incident_report.models.entities.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentTypeEntityRepository extends JpaRepository<IncidentTypeEntity, Integer> {
}
