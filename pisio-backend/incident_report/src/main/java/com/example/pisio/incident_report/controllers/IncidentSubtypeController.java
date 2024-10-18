package com.example.pisio.incident_report.controllers;


import com.example.pisio.incident_report.exceptions.NotFoundException;
import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.models.IncidentSubtype;
import com.example.pisio.incident_report.models.IncidentSubtypeRequest;
import com.example.pisio.incident_report.models.IncidentType;
import com.example.pisio.incident_report.service.IncidentSubtypeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/incident_subtypes")
public class IncidentSubtypeController {

    private final IncidentSubtypeService incidentSubtypeService;
    public IncidentSubtypeController(IncidentSubtypeService incidentSubtypeService) {
        this.incidentSubtypeService = incidentSubtypeService;
    }
    @GetMapping
    List<IncidentSubtype> findAll(){
        return incidentSubtypeService.findAll(IncidentSubtype.class);
    }
    @GetMapping("/{id}")
    IncidentSubtype findById(@PathVariable Integer id) throws NotFoundException {
        return incidentSubtypeService.findById(id, IncidentSubtype.class);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    IncidentSubtype insert(@RequestBody IncidentSubtypeRequest incidentSubtypeRequest) throws NotFoundException, IOException {
        return incidentSubtypeService.insert(incidentSubtypeRequest, IncidentSubtype.class);
    }




}
