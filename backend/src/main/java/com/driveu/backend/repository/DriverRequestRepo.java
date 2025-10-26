package com.driveu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.driveu.backend.model.DriverRequest;



@Repository
public interface DriverRequestRepo extends JpaRepository<DriverRequest,Long>{

    

 List<DriverRequest> findByUserUserId(Long userId);
 List<DriverRequest> findByDriverDriverId(Long driverId);

 boolean existsByUserUserIdAndDriverDriverId(Long userId, Long driverId);


}
