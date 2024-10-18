package com.example.pisio.incident_report.service;

import com.example.pisio.incident_report.base.CrudService;
import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.models.IncidentRequest;
import com.example.pisio.incident_report.models.entities.IncidentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IncidentService extends CrudService<Integer> {

    List<Incident> getAllIncidentsByLocationId(Integer id);
    <T> Page<T> findAll(Pageable page, Class<T> resultDtoClass);
    List<Incident> findApprovedIncidents();

    List<Incident> findPendingIncidents();
}
