package com.driveu.backend.exeptions;

public class DriverDeletionException extends RuntimeException{

    public DriverDeletionException(String errorMessage){
        super(errorMessage);
    }
}
