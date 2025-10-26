package com.driveu.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveu.backend.exeptions.DriverDeletionException;
import com.driveu.backend.exeptions.DuplicateDriverException;
import com.driveu.backend.model.Driver;
import com.driveu.backend.repository.DriverRepo;



@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepository;

    // Adds a new driver to the system
    @Override
    public Driver addDriver(Driver driver) {
        Optional<Driver> existingDriver = driverRepository.findByLicenseNumber(driver.getLicenseNumber());
        if (existingDriver.isPresent()) {
            throw new DuplicateDriverException("Driver with this license number already exists.");
        }
        return driverRepository.save(driver);
    }

    
    // Retrieves a driver by ID
    @Override
    public Optional<Driver> getDriverById(Long driverId) {
        return driverRepository.findById(driverId);
    }

    // Retrieves all drivers
    @Override
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Updates an existing driver
    @Override
    public Driver updateDriver(Long id, Driver updatedDriver) {
        Optional<Driver> existingDriverOpt = driverRepository.findById(id);
        if (existingDriverOpt.isPresent()) {
            Driver existingDriver = existingDriverOpt.get();
    
            // Update only the fields you want to allow changes to
            existingDriver.setDriverName(updatedDriver.getDriverName());
            existingDriver.setLicenseNumber(updatedDriver.getLicenseNumber());
            existingDriver.setExperienceYears(updatedDriver.getExperienceYears());
            existingDriver.setContactNumber(updatedDriver.getContactNumber());
            existingDriver.setVehicleType(updatedDriver.getVehicleType());
            existingDriver.setHourlyRate(updatedDriver.getHourlyRate());
            existingDriver.setAddress(updatedDriver.getAddress());
            existingDriver.setAvailabilityStatus(updatedDriver.getAvailabilityStatus());
            existingDriver.setImage(updatedDriver.getImage());
    
            return driverRepository.save(existingDriver);
        }
        return null;
    }

    // Deletes a driver by ID
    @Override
    public Driver deleteDriver(Long driverId) {
        Optional<Driver> driverOpt = driverRepository.findById(driverId);
        if (driverOpt.isPresent()) {
            try {
                Driver driver = driverOpt.get();
                driverRepository.deleteById(driverId);
                return driver;
            } catch (Exception e) {
                throw new DriverDeletionException("Failed to delete driver with ID: " + driverId);
            }
        }
        return null;
    }
}