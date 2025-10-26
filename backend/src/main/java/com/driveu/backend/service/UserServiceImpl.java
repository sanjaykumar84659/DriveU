package com.driveu.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.driveu.backend.model.User;
import com.driveu.backend.repository.UserRepo;
 

 
@Service
public class UserServiceImpl implements UserService{
 
 
    @Autowired
    UserRepo userRepo;
 
    @Autowired
    PasswordEncoder encoder;
 
    @Override
    public User createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
 
    @Override
    public User loginUser(User user) {
        return userRepo.findByUsername(user.getUsername());
    }
 
    @Override
    public User findByUsername(String username){
        return userRepo.findByUsername(username);
    }
 
    @Override
    public User findByEmail(String email) {
       return userRepo.findByEmail(email);
    }
 
}
