package com.example.pisio.incident_report.repositories;

import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.models.IncidentRequest;
import com.example.pisio.incident_report.models.entities.IncidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface IncidentEntityRepository extends JpaRepository<IncidentEntity, Integer> {

    List<IncidentEntity> getAllByLocation_Id(Integer id);
    List<IncidentEntity> findByApproved(boolean approved);

}
