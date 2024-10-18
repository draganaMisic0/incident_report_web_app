package com.example.pisio.incident_report.base;

import java.io.Serializable;

public interface BaseEntity <ID extends Serializable> {

    void setId(ID id);
    ID getId();
}
