package com.driveu.backend.service;

import java.util.List;
import java.util.Optional;

import com.driveu.backend.model.Driver;



public interface DriverService {

    Driver addDriver(Driver driver);
     Optional<Driver> getDriverById(Long driverId);
    List<Driver> getAllDrivers();
    Driver updateDriver(Long driverId,Driver driver);
    Driver deleteDriver(Long driverId);
    
}