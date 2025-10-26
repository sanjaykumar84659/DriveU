package com.driveu.backend.exeptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DriverDeletionException.class)
    public ResponseEntity<String> handleDriverDeletionException(DriverDeletionException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(DuplicateDriverException.class)
    public ResponseEntity<String> handleDuplicateDriverException(DuplicateDriverException e) {
        return ResponseEntity.status(409).body(e.getMessage());
    }

    @ExceptionHandler(DriverRequestDeletionException.class)
    public ResponseEntity<String> handleDriverRequestDeletionException(DriverRequestDeletionException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
    
    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<String> handleNumberFormatException(NumberFormatException e) {
        return ResponseEntity.status(400).body("Invalid number format: " + e.getMessage());
    }

    @ExceptionHandler(DriverNotFoundException.class)
    public ResponseEntity<String> handleDriverNotFoundException(DriverNotFoundException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(404).body(e.getMessage());
}

}
