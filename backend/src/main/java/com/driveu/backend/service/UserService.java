package com.driveu.backend.service;

import com.driveu.backend.model.User;

public interface UserService {
 
   User createUser(User user);
   User loginUser(User user);
   User findByUsername(String username);
   User findByEmail(String email);
 
}
