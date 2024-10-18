package com.example.pisio.incident_report.exceptions;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;


@Getter
@Setter
@ToString
public class HttpException extends RuntimeException{

    private HttpStatus status;
    private Object data;
    public HttpException(){
        this.status=HttpStatus.INTERNAL_SERVER_ERROR;
        this.data=null;
    }
    public HttpException(HttpStatus httpStatus, Object data) {

        this.status=httpStatus;
        this.data=data;
    }
}
