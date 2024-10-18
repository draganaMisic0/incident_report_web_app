package com.example.pisio.incident_report.service.impl;


import com.example.pisio.incident_report.base.CrudJpaService;
import com.example.pisio.incident_report.models.entities.LocationEntity;
import com.example.pisio.incident_report.repositories.LocationEntityRepository;
import com.example.pisio.incident_report.service.LocationService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LocationServiceImpl extends CrudJpaService<LocationEntity, Integer> implements LocationService {

    public LocationServiceImpl(LocationEntityRepository repository, ModelMapper modelMapper) {

        super(repository,LocationEntity.class, modelMapper);
    }
}
