package com.example.pisio.incident_report.controllers;

import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.service.IncidentService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping("/incident/image")
public class ImageController {


    private final IncidentService incidentService;

    public ImageController(IncidentService incidentService) {

        this.incidentService = incidentService;
    }

    @GetMapping("/{id}")
    public Object getImageByIncidentId(@PathVariable int id) {


        String photoLink = incidentService.findById(id, Incident.class).getPhotoLink();
        if (photoLink != null) {
            File photoFile = new File(photoLink);
            if (photoFile.exists()) {
                if (photoLink.endsWith(".png")) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.IMAGE_PNG) // Change the content type based on your photo type
                            .body(new FileSystemResource(photoFile));
                } else if (photoLink.endsWith(".jpeg")) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.IMAGE_JPEG) // Change the content type based on your photo type
                            .body(new FileSystemResource(photoFile));
                }

            }
        }
       return ResponseEntity.notFound().build();
    }
}