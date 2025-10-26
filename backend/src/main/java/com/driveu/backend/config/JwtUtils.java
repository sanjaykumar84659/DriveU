package com.driveu.backend.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
 
@Component
public class JwtUtils {
    public static final String SRT = "357638792F423F4428472B4B6250655368566D597133743677397A2443264629";
    
    public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
    }
    public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
    }
    public<T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
    }
    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SRT).parseClaimsJws(token).getBody();
    }
    private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
    }
    public Boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    public String generateToken(String username){
    Map<String, Object> claims = new HashMap<>();
    return createToken(claims, username);
    }
    public String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+1000*60*60))
            .signWith(SignatureAlgorithm.HS256, SRT).compact();
    }
}