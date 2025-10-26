package com.driveu.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverRequestId;
    
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "driverId", nullable = true)
    private Driver driver;

    @Transient
    private Long userId;

    @Transient
    private Long driverId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    
    private LocalDate requestDate;
    private String status;
    private LocalDate tripDate;
    private LocalTime timeSlot;
    private String pickupLocation;
    private String dropLocation;
    private String estimatedDuration;

    @Column(nullable = true)
    private double paymentAmount;

    private String comments;

    @Column(nullable = true)
    private LocalTime actualDropTime;

    @Column(nullable = true)
    private LocalDate actualDropDate;

    @Column(nullable = true)
    private String actualDuration;
 
}
