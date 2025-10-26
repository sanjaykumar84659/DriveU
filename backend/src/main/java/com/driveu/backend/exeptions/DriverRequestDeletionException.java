package com.driveu.backend.exeptions;

public class DriverRequestDeletionException extends RuntimeException{

    public DriverRequestDeletionException(String errorMessage){
        super(errorMessage);

    }
}
