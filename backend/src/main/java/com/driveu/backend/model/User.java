package com.driveu.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    private String password;

    private String username;
    private String mobileNumber;
    private String userRole;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    private String token; // retained if you want, but not used for stateless JWT

}