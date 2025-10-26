package com.driveu.backend.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.driveu.backend.model.User;


public class UserPrinciple implements UserDetails {

    // IMPORTANT: Spring will treat this as the "username" (principal).
    // We store the user's EMAIL here because we authenticate by email.
    private String username; 
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(User user) {
        this.username = user.getEmail();   // principal is email
        this.password = user.getPassword();
        List<GrantedAuthority> auths = new ArrayList<>();
        if (user.getUserRole() != null && !user.getUserRole().isBlank()) {
            auths.add(new SimpleGrantedAuthority("ROLE_" + user.getUserRole()));
        }
        this.authorities = auths;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return username; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
