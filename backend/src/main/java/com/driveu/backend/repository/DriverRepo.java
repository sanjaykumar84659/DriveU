package com.driveu.backend.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.driveu.backend.model.Driver;

@Repository
public interface DriverRepo extends JpaRepository<Driver,Long>{

    Optional<Driver> findByLicenseNumber(String licenseNumber);
}