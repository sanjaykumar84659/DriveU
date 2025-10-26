package com.driveu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.driveu.backend.model.User;

 
@Repository
public interface UserRepo extends JpaRepository<User,Long> {
 
    User findByUsername(String username);
    User findByEmail(String email);
    User findByUsernameAndPassword(String username , String password);
 
}
