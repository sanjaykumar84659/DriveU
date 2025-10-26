package com.driveu.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.driveu.backend.model.Driver;
import com.driveu.backend.service.DriverService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "https://8081-facbdcbadfbcbdccbfbadafacfdab.premiumproject.examly.io")
@RestController
@RequestMapping("/api/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    // Add a new driver
    @PostMapping
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver) {
        Driver savedDriver = driverService.addDriver(driver);
        return ResponseEntity.ok(savedDriver);
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable Long id) {
        Optional<Driver> driverOpt = driverService.getDriverById(id);
        return driverOpt.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all drivers
    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        return ResponseEntity.ok(drivers);
    }

    

    // Update driver
    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Long id, @RequestBody Driver updatedDriver) {
        Driver driver = driverService.updateDriver(id, updatedDriver);
        if (driver != null) {
            return ResponseEntity.ok(driver);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete driver
    @DeleteMapping("/{id}")
    public ResponseEntity<Driver> deleteDriver(@PathVariable Long id) {
        Driver deletedDriver = driverService.deleteDriver(id);
        if (deletedDriver != null) {
            return ResponseEntity.ok(deletedDriver);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
