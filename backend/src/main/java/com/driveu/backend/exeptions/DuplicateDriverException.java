package com.driveu.backend.exeptions;


public class DuplicateDriverException extends RuntimeException{

    public DuplicateDriverException(String errorMessage){
        super(errorMessage);

    }
}
