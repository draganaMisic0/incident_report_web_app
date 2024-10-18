package com.example.pisio.incident_report.exceptions;

import org.springframework.http.HttpStatus;

public class ConflictException extends HttpException{

    public ConflictException(){

        super(HttpStatus.CONFLICT, null);
    }
    public ConflictException(Object data){

        super(HttpStatus.CONFLICT, data);
    }
}
