package com.driveu.backend.exeptions;


public class DriverNotFoundException extends RuntimeException {
    public DriverNotFoundException(String emsg){
        super(emsg);
    }
}