package com.driveu.backend.service;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveu.backend.exeptions.DriverNotFoundException;
import com.driveu.backend.exeptions.DriverRequestDeletionException;
import com.driveu.backend.exeptions.UserNotFoundException;
import com.driveu.backend.model.Driver;
import com.driveu.backend.model.DriverRequest;
import com.driveu.backend.model.User;
import com.driveu.backend.repository.DriverRepo;
import com.driveu.backend.repository.DriverRequestRepo;
import com.driveu.backend.repository.UserRepo;



@Service
public class DriverRequestServiceImpl implements DriverRequestService {

    @Autowired
    private DriverRequestRepo driverRequestRepository;

    @Autowired
    private DriverRepo driverRepository;

    @Autowired
    private UserRepo userRepository;

    // Adds a new driver request
    @Override
    public DriverRequest addDriverRequest(DriverRequest driverRequest) {
        // Fetch User and Driver from DB using IDs
        User user = userRepository.findById(driverRequest.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Driver driver = null;
        if (driverRequest.getDriverId() != null) {
            driver = driverRepository.findById(driverRequest.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        }

        driverRequest.setUser(user);
        driverRequest.setDriver(driver);

        // Calculate paymentAmount and actual drop details
        if (driver != null && driverRequest.getEstimatedDuration() != null && driverRequest.getTimeSlot() != null) {
            try {
                
                    String estimatedDuration = driverRequest.getEstimatedDuration();
                    Pattern pattern = Pattern.compile("(\\d+(\\.\\d+)?)");
                    Matcher matcher = pattern.matcher(estimatedDuration);
                    double durationHours = 0;
                    if (matcher.find()) {
                        durationHours = Double.parseDouble(matcher.group(1));
                    }

                    
                    int hours = (int) durationHours;
                    int minutes = (int) Math.round((durationHours - hours) * 60);


                // Calculate payment
                double rate = driver.getHourlyRate();
                driverRequest.setPaymentAmount(durationHours * rate);

                // Set actualDuration
                driverRequest.setActualDuration(driverRequest.getEstimatedDuration());

                // Calculate actualDropTime
                
                LocalTime dropTime = driverRequest.getTimeSlot()
                .plusHours(hours)
                .plusMinutes(minutes);

                driverRequest.setActualDropTime(dropTime);

                // Set actualDropDate same as tripDate
                driverRequest.setActualDropDate(driverRequest.getTripDate());

            } catch (NumberFormatException e) {
                throw new NumberFormatException("Invalid estimated duration format: " + driverRequest.getEstimatedDuration());
            }
        }

        return driverRequestRepository.save(driverRequest);
    }

    // Retrieves a driver request by ID
    @Override
    public Optional<DriverRequest> getDriverRequestById(Long driverRequestId) {
        return driverRequestRepository.findById(driverRequestId);
    }

    // Retrieves all driver requests
    @Override
    public List<DriverRequest> getAllDriverRequests() {
        return driverRequestRepository.findAll();
    }

    // Updates an existing driver request
    @Override
    public DriverRequest updateDriverRequest(Long id, DriverRequest updatedRequest) {
        Optional<DriverRequest> existingOpt = driverRequestRepository.findById(id);
        if (existingOpt.isPresent()) {
            DriverRequest existing = existingOpt.get();
    
            // Update basic fields
            existing.setPickupLocation(updatedRequest.getPickupLocation());
            existing.setDropLocation(updatedRequest.getDropLocation());
            existing.setTripDate(updatedRequest.getTripDate());
            existing.setTimeSlot(updatedRequest.getTimeSlot());
            existing.setEstimatedDuration(updatedRequest.getEstimatedDuration());
            existing.setComments(updatedRequest.getComments());
            existing.setStatus(updatedRequest.getStatus());
    
            // Update driver if provided
            if (updatedRequest.getDriverId() != null) {
                Driver driver = driverRepository.findById(updatedRequest.getDriverId())
                    .orElseThrow(() -> new DriverNotFoundException("Driver not found"));
                existing.setDriver(driver);
            }
    
            // Update user if provided
            if (updatedRequest.getUserId() != null) {
                User user = userRepository.findById(updatedRequest.getUserId())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
                existing.setUser(user);
            }
    
            return driverRequestRepository.save(existing);
        }
        return null;
    }

    // Deletes a driver request by ID
    @Override
    public DriverRequest deleteDriverRequest(Long driverRequestId) {
        Optional<DriverRequest> requestOpt = driverRequestRepository.findById(driverRequestId);
        if (requestOpt.isPresent()) {
            try {
                DriverRequest request = requestOpt.get();
                driverRequestRepository.deleteById(driverRequestId);
                return request;
            } catch (Exception e) {
                throw new DriverRequestDeletionException("Failed to delete driver request with ID: " + driverRequestId);
            }
        }
        return null;
    }

    // Retrieves driver requests submitted by a specific user
    @Override
    public List<DriverRequest> findDriverRequestsByUserId(Long userId) {
        return driverRequestRepository.findByUserUserId(userId);
    }

    // Retrieves driver requests assigned to a specific driver
    @Override
    public List<DriverRequest> findDriverRequestsByDriverId(Long driverId) {
        return driverRequestRepository.findByDriverDriverId(driverId);
    }

    
    @Override
    public boolean existsByUserIdAndDriverId(Long userId, Long driverId) {
        return driverRequestRepository.existsByUserUserIdAndDriverDriverId(userId, driverId);
    }

    


}
