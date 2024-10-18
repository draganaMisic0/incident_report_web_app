package com.example.pisio.incident_report.controllers;

import com.example.pisio.incident_report.exceptions.NotFoundException;
import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.models.IncidentType;
import com.example.pisio.incident_report.models.IncidentTypeRequest;
import com.example.pisio.incident_report.service.IncidentService;
import com.example.pisio.incident_report.service.IncidentTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/incident_types")
public class IncidentTypeController {

    private final IncidentTypeService incidentTypeService;
    public IncidentTypeController(IncidentTypeService incidentTypeService) {
        this.incidentTypeService = incidentTypeService;
    }

    @GetMapping
    List<IncidentType> findAll(){
        return incidentTypeService.findAll(IncidentType.class);
    }

    @GetMapping("/{id}")
    IncidentType findById(@PathVariable Integer id) throws NotFoundException {
        return incidentTypeService.findById(id, IncidentType.class);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public IncidentType insert(@RequestBody IncidentTypeRequest object) throws NotFoundException, IOException {
        return incidentTypeService.insert(object, IncidentType.class);
    }
}
