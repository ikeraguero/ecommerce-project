package com.shoppingsystem.shopping_system.auth.controller;

import com.shoppingsystem.shopping_system.user.model.User;
import com.shoppingsystem.shopping_system.user.repository.UserRepository;
import com.shoppingsystem.shopping_system.user.service.UserService;
import com.shoppingsystem.shopping_system.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        List<String> roles = new LinkedList<>();
        roles.add("USER");

        if (userService.loginUser(password, email)) {
            String token = jwtUtil.generateToken(email, roles);
            return ResponseEntity.ok(new JwtResponse(token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken.");
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setFirstName(registerRequest.getFirst_name());
        newUser.setLastName(registerRequest.getLast_name());

        newUser.setRole("USER");
        newUser.setActive(true);
        newUser.setCreatedAt(new Date());
        newUser.setUpdatedAt(new Date());
        userRepository.save(newUser);

        List<String> roles = new LinkedList<>();
        roles.add("USER");

        String token = jwtUtil.generateToken(newUser.getEmail(), roles);

        return ResponseEntity.status(HttpStatus.CREATED).body(new JwtResponse(token));
    }

}