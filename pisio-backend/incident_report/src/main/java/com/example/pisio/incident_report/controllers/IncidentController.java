package com.example.pisio.incident_report.controllers;

import com.example.pisio.incident_report.exceptions.NotFoundException;
import com.example.pisio.incident_report.models.*;
import com.example.pisio.incident_report.models.entities.IncidentSubtypeEntity;
import com.example.pisio.incident_report.models.entities.LocationEntity;
import com.example.pisio.incident_report.service.IncidentService;
import com.example.pisio.incident_report.service.IncidentSubtypeService;
import com.example.pisio.incident_report.service.LocationService;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/incidents")

public class IncidentController {

    private final IncidentService incidentService;
    private final LocationService locationService;
    private final IncidentSubtypeService incidentSubtypeService;

    @Value("${photo.storage.directory}")
    private String photoStorageDirectory;




    public IncidentController(IncidentService incidentService, LocationService locationService,
                              IncidentSubtypeService incidentSubtypeService) {
        this.incidentService = incidentService;
        this.locationService = locationService;
        this.incidentSubtypeService = incidentSubtypeService;
    }
    @GetMapping
    List<Incident> findAll(){
        return incidentService.findAll(Incident.class);
    }
    @GetMapping("/{id}")
    Incident findById(@PathVariable Integer id) throws NotFoundException {
        return incidentService.findById(id, Incident.class);
    }
    @DeleteMapping("/{id}")
    void delete(@PathVariable Integer id) throws NotFoundException {
        incidentService.delete(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Incident insert(@RequestBody IncidentRequest incidentRequest)
            throws NotFoundException, IOException {


        LocationRequest locationRequest=new LocationRequest();
        locationRequest.setLatitude(incidentRequest.getLatitude());
        locationRequest.setLongitude(incidentRequest.getLongitude());
        Location location= locationService.insert(locationRequest, Location.class);

        IncidentSubtypeRequest incidentSubtypeRequest=new IncidentSubtypeRequest();
        incidentSubtypeRequest.setIncidentTypeId(incidentRequest.getIncidentSubtype().getIncidentTypeId());
        IncidentSubtype incidentSubtype=incidentSubtypeService.insert(incidentSubtypeRequest, IncidentSubtype.class);

        IncidentSubtypeEntity subtypeEntity=new IncidentSubtypeEntity();
        subtypeEntity.setId(incidentSubtype.getId());

        String photoLink=incidentRequest.getPhotoLink();
        incidentRequest.setPhotoLink(null);
        incidentRequest.setLocation(location);
        Incident reportedIncident=incidentService.insert(incidentRequest, Incident.class);
        int reportedIncidentId=reportedIncident.getId();
        photoLink = saveBase64Photo(photoLink, reportedIncidentId);
        incidentRequest.setPhotoLink(photoLink);

        return incidentService.update(reportedIncidentId, incidentRequest, Incident.class);
    }


    @PutMapping("/{id}")
    public Incident update(@PathVariable Integer id, @RequestBody IncidentRequest incidentRequest) throws NotFoundException {

        Incident tempIncident=incidentService.findById(id, Incident.class);
        if(incidentRequest.getLocation()==null){
            incidentRequest.setLocation(tempIncident.getLocation());
        }
        if(incidentRequest.getLongitude()==null){
            incidentRequest.setLongitude(tempIncident.getLocation().getLongitude());
        }
        if(incidentRequest.getLatitude()==null){
            incidentRequest.setLatitude(tempIncident.getLocation().getLatitude());
        }
        if(incidentRequest.getDescription()==null){
            incidentRequest.setDescription(tempIncident.getDescription());
        }
        if(incidentRequest.getPhotoLink()==null){
            incidentRequest.setPhotoLink(tempIncident.getPhotoLink());
        }
        if(incidentRequest.getDateOfReport()==null){
            incidentRequest.setDateOfReport(LocalDate.parse(tempIncident.getDateOfReport()));
        }
        if(incidentRequest.getApproved()==null){
            incidentRequest.setApproved(tempIncident.getApproved());
        }
        if(incidentRequest.getIncidentSubtype()==null){
            incidentRequest.setIncidentSubtype(tempIncident.getIncidentSubtype());
        }

        return incidentService.update(id, incidentRequest, Incident.class);
    }

    private String saveBase64Photo(String base64Photo, int id) throws IOException {

        if(base64Photo==null){
            return null;
        }

        String[] photoParts = base64Photo.split(",");
        String metadata = photoParts[0];
        String payload = photoParts[1];
        byte[] photoBytes = Base64.getDecoder().decode(payload);

        String regex = "image/(\\w*)";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(metadata);

        String photoType;

        if (matcher.find()) {
            photoType = matcher.group(1);
        } else {
            photoType = "";
        }
        // Generate a unique file name
        String fileName =  id + "."+photoType;


        // Create a new file in the specified directory
        File photoFile = new File(photoStorageDirectory, fileName);
        try (FileOutputStream fos = new FileOutputStream(photoFile)) {
            fos.write(photoBytes);
        }

        // Return the absolute path of the saved file as the photo link
        return photoFile.getPath();
    }

    @GetMapping("/approved")
    List<Incident> findApprovedIncidents() {

        return incidentService.findApprovedIncidents();
    }

    @GetMapping("/pending")
    List<Incident> findPendingIncidents() {

        return incidentService.findPendingIncidents();
    }



}
