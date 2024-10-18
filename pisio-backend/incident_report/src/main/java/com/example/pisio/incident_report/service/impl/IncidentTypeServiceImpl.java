package com.example.pisio.incident_report.service.impl;

import com.example.pisio.incident_report.base.CrudJpaService;
import com.example.pisio.incident_report.models.entities.IncidentEntity;
import com.example.pisio.incident_report.models.entities.IncidentTypeEntity;
import com.example.pisio.incident_report.repositories.IncidentEntityRepository;
import com.example.pisio.incident_report.repositories.IncidentTypeEntityRepository;
import com.example.pisio.incident_report.service.IncidentTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class IncidentTypeServiceImpl extends CrudJpaService<IncidentTypeEntity, Integer>
                                                    implements IncidentTypeService {

    private final ModelMapper modelMapper;
    private final IncidentTypeEntityRepository repository;

    public IncidentTypeServiceImpl(ModelMapper modelMapper, IncidentTypeEntityRepository repository) {
        super(repository, IncidentTypeEntity.class,  modelMapper);
        this.modelMapper=modelMapper;
        this.repository=repository;

    }
}
