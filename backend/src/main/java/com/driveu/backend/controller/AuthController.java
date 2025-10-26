package com.driveu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.driveu.backend.config.JwtUtils;
import com.driveu.backend.dto.LoginResponse;
import com.driveu.backend.model.LoginDTO;
import com.driveu.backend.model.User;
import com.driveu.backend.service.UserService;



@RestController
public class AuthController {

    @Autowired
    private UserService userservice;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtil;

    // SIGN-UP
    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User u = userservice.createUser(user); 
        return ResponseEntity.status(201).body(u);
    }

    // LOGIN
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
            );
            String token = jwtUtil.generateToken(authentication.getName());

            // find user so we can return role/userId/etc.
            User user = userservice.findByEmail(loginDTO.getEmail());

            LoginResponse resp = new LoginResponse();
            resp.setToken(token);
            resp.setRole(user.getUserRole());    // <-- frontend expects "role"
            resp.setUserId(user.getUserId());
            resp.setEmail(user.getEmail());
            resp.setUsername(user.getUsername());

            // NOTE: We are NOT saving the token in DB — JWT is stateless.
            return ResponseEntity.ok(resp);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid email or password");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Authentication failed");
        }
    }
}