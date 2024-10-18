package com.example.pisio.incident_report.util;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

//import org.apache.juli.logging.Log;

public class LoggingUtil {

    public static void logException(Throwable e, Log log){

        StringBuilder builder = new StringBuilder();
        builder.append(e);
        builder.append(System.lineSeparator());
        for(StackTraceElement stackTraceElement : e.getStackTrace()){

            builder.append(stackTraceElement);
            builder.append(System.lineSeparator());
        }
        log.error(builder);
    }

    public static <T> void logException(Throwable e, Class<T> clazz){

        logException(e, LogFactory.getLog(clazz));
    }
}
