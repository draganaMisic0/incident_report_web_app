package com.example.pisio.incident_report.service.impl;

import com.example.pisio.incident_report.base.CrudJpaService;
import com.example.pisio.incident_report.models.entities.IncidentSubtypeEntity;
import com.example.pisio.incident_report.models.entities.IncidentTypeEntity;
import com.example.pisio.incident_report.repositories.IncidentSubtypeEntityRepository;
import com.example.pisio.incident_report.repositories.IncidentTypeEntityRepository;
import com.example.pisio.incident_report.service.IncidentSubtypeService;
import com.example.pisio.incident_report.service.IncidentTypeService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class IncidentSubtypeServiceImpl extends CrudJpaService<   IncidentSubtypeEntity, Integer>
        implements IncidentSubtypeService {


    private final ModelMapper modelMapper;
    private final IncidentSubtypeEntityRepository repository;

    public IncidentSubtypeServiceImpl(ModelMapper modelMapper, IncidentSubtypeEntityRepository repository) {
        super(repository, IncidentSubtypeEntity.class,  modelMapper);
        this.modelMapper=modelMapper;
        this.repository=repository;

    }
}
