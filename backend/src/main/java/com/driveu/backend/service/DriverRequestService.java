package com.driveu.backend.service;


import java.util.List;
import java.util.Optional;

import com.driveu.backend.model.DriverRequest;


public interface DriverRequestService {

    DriverRequest addDriverRequest(DriverRequest driverRequest);

    Optional<DriverRequest> getDriverRequestById(Long driverRequestId);

    List<DriverRequest> getAllDriverRequests();
    
    DriverRequest updateDriverRequest(Long driverRequestId, DriverRequest driverRequest);

    DriverRequest deleteDriverRequest(Long driverRequestId);

    List<DriverRequest> findDriverRequestsByUserId(Long userId);

    List<DriverRequest> findDriverRequestsByDriverId(Long driverId);

    boolean existsByUserIdAndDriverId(Long userId, Long driverId);
}
