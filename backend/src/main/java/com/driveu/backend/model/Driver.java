package com.driveu.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverId;
    
    private String driverName;
    private String licenseNumber;
    private int experienceYears;
    private String contactNumber;
    private String availabilityStatus;
    private String address;
    private String vehicleType;
    private double hourlyRate;
    
    @Lob
    @Column(columnDefinition = "LONGTEXT", nullable = true)
    private String image;
    
}
