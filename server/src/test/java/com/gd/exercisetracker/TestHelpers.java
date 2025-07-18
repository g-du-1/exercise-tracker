package com.gd.exercisetracker;

import com.gd.exercisetracker.security.role.AppRole;
import com.gd.exercisetracker.security.role.Role;
import com.gd.exercisetracker.security.role.RoleRepository;
import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class TestHelpers {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;
    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String getTestJwt(String username) {
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));

        return Jwts.builder().subject(username).issuedAt(new Date()).expiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(key).compact();
    }

    public User saveTestUser() {
        String username = "user";

        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER).orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

        User user = new User(username, "user@example.com", passwordEncoder.encode("password"));

        user.setEnabled(true);
        user.setSignUpMethod("From Test");
        user.setRole(userRole);

        return userRepository.save(user);
    }
}
