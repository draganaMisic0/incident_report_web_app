package com.example.pisio.incident_report.controllers;

import com.example.pisio.incident_report.exceptions.NotFoundException;
import com.example.pisio.incident_report.models.Incident;
import com.example.pisio.incident_report.models.Location;
import com.example.pisio.incident_report.models.LocationRequest;
import com.example.pisio.incident_report.models.SingleLocation;
import com.example.pisio.incident_report.service.IncidentService;
import com.example.pisio.incident_report.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    private final IncidentService incidentService;



    public LocationController(LocationService locationService, IncidentService incidentService){
        this.locationService = locationService;
        this.incidentService = incidentService;
    }

    @GetMapping
    public List<Location> findAll() {
        return locationService.findAll(Location.class);
    }

    @GetMapping("/{id}")
    public Location findById(@PathVariable Integer id) throws NotFoundException {
        return locationService.findById(id, Location.class);
    }
/*
    @GetMapping("/{id}/locations")
    @ApiOperation(value = "Returns all assets related to supplied location")
    public List<Incident> getAllIncidentsByLocationId(@ApiParam(value = "Location ID", required = true) @PathVariable Integer id) {
        return locationService.getAllIncidentsByLocationId(id);
    }

 */

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Location insert(@RequestBody LocationRequest location) throws NotFoundException, IOException {
        return locationService.insert(location, Location.class);
    }

    @PutMapping("/{id}")
    public Location update(@PathVariable Integer id, @RequestBody LocationRequest location) throws NotFoundException {
        return locationService.update(id, location, Location.class);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        locationService.delete(id);
    }

}
