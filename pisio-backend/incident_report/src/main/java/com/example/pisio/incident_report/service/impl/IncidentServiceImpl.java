package com.example.pisio.incident_report.service.impl;


import com.example.pisio.incident_report.base.CrudJpaService;
import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.models.IncidentRequest;
import com.example.pisio.incident_report.models.entities.IncidentEntity;
import com.example.pisio.incident_report.repositories.IncidentEntityRepository;
import com.example.pisio.incident_report.service.IncidentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class IncidentServiceImpl extends CrudJpaService<IncidentEntity, Integer>
                                                    implements IncidentService {

    private final ModelMapper modelMapper;
    private final IncidentEntityRepository repository;
    public final String incidentPhotoFilePath = ".//incident_images//";

    public IncidentServiceImpl(ModelMapper modelMapper, IncidentEntityRepository repository) {
        super(repository, IncidentEntity.class,  modelMapper);
        this.modelMapper=modelMapper;
        this.repository=repository;

    }
    @Override
    public List<Incident> getAllIncidentsByLocationId(Integer id) {
        return repository.getAllByLocation_Id(id).stream().map(a -> modelMapper.map(a, Incident.class)).collect(Collectors.toList());
    }

    @Override
    public List<Incident> findApprovedIncidents(){

        return repository.findByApproved(true).stream().map(a -> modelMapper.map(a, Incident.class)).collect(Collectors.toList());
    }
    @Override
    public List<Incident> findPendingIncidents(){

        return repository.findByApproved(false).stream().map(a->modelMapper.map(a, Incident.class)).collect(Collectors.toList());
    }




}
