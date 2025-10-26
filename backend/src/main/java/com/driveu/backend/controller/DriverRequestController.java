package com.driveu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.driveu.backend.model.DriverRequest;
import com.driveu.backend.service.DriverRequestService;

import java.util.List;
import java.util.Optional;
 
@RestController
@RequestMapping("/api/driver-requests")
public class DriverRequestController {

    @Autowired
    private DriverRequestService driverRequestService;
 
 
    // Add a new driver request
    @PostMapping()
    public ResponseEntity<DriverRequest> createDriverRequest(@RequestBody DriverRequest driverRequest) {
        DriverRequest savedRequest = driverRequestService.addDriverRequest(driverRequest);
        return ResponseEntity.ok(savedRequest);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DriverRequest> getDriverRequestById(@PathVariable Long id) {
        Optional<DriverRequest> requestOpt = driverRequestService.getDriverRequestById(id);
        return requestOpt.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }
 
    // Get all driver requests
    @GetMapping
    public ResponseEntity<List<DriverRequest>> getAllDriverRequests() {
        List<DriverRequest> requests = driverRequestService.getAllDriverRequests();
        return ResponseEntity.ok(requests);
    }
 
    // Update driver request
    @PutMapping("/{id}")
    public ResponseEntity<DriverRequest> updateDriverRequest(@PathVariable Long id, @RequestBody DriverRequest updatedRequest) {
        DriverRequest request = driverRequestService.updateDriverRequest(id, updatedRequest);
        if (request != null) {
            return ResponseEntity.ok(request);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
 
    // Delete driver request
    @DeleteMapping("/{id}")
    public ResponseEntity<DriverRequest> deleteDriverRequest(@PathVariable Long id) {
        DriverRequest deletedRequest = driverRequestService.deleteDriverRequest(id);
        if (deletedRequest != null) {
            return ResponseEntity.ok(deletedRequest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
 
    // Get driver requests by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DriverRequest>> getDriverRequestsByUserId(@PathVariable Long userId) {
        List<DriverRequest> requests = driverRequestService.findDriverRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }
 
    // Get driver requests by driver ID
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DriverRequest>> getDriverRequestsByDriverId(@PathVariable Long driverId) {
        List<DriverRequest> requests = driverRequestService.findDriverRequestsByDriverId(driverId);
        return ResponseEntity.ok(requests);
    }
    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkIfRequestExists(
        @RequestParam Long userId,
        @RequestParam Long driverId
    ) {
        boolean exists = driverRequestService.existsByUserIdAndDriverId(userId, driverId);
        return ResponseEntity.ok(exists);
    }



}
 
 
