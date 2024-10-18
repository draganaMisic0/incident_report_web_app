package com.example.pisio.incident_report.repositories;

import com.example.pisio.incident_report.models.entities.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationEntityRepository extends JpaRepository<LocationEntity, Integer> {
}
