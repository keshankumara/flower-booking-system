package com.flower_booking.flower_booking_system.controller;

import com.flower_booking.flower_booking_system.dto.AuthResponse;
import com.flower_booking.flower_booking_system.dto.LoginRequest;
import com.flower_booking.flower_booking_system.dto.RegisterRequest;
import com.flower_booking.flower_booking_system.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}