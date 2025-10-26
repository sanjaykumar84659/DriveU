package com.driveu.backend.exeptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String emsg){
        super(emsg);
    }
    
}
