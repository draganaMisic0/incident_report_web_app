package com.example.pisio.incident_report.controllers;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("dev")
public class HelloController {

    @GetMapping("/hello-world")
    public String helloWorld(){
        return "Hello world from spring boot";
    }
}
