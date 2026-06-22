package com.flower_booking.flower_booking_system.service.impl;

import com.flower_booking.flower_booking_system.dto.AuthResponse;
import com.flower_booking.flower_booking_system.dto.LoginRequest;
import com.flower_booking.flower_booking_system.dto.RegisterRequest;
import com.flower_booking.flower_booking_system.entity.Role;
import com.flower_booking.flower_booking_system.entity.User;
import com.flower_booking.flower_booking_system.repository.UserRepository;
import com.flower_booking.flower_booking_system.service.AuthService;
import com.flower_booking.flower_booking_system.security.JwtService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;


    public AuthServiceImpl(
        UserRepository userRepository,
        JwtService jwtService,
        BCryptPasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
}

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole(Role.USER);

        userRepository.save(user);

        return "User registered successfully";
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                request.getEmail()
        ).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(token);
    }


}