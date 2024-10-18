package com.example.pisio.incident_report;

import ch.qos.logback.classic.pattern.MessageConverter;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class IncidentReportApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncidentReportApplication.class, args);
	}


	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setAmbiguityIgnored(true);
		return mapper;
	}

}
