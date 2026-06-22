package com.flower_booking.flower_booking_system.service;

import com.flower_booking.flower_booking_system.dto.*;
import com.flower_booking.flower_booking_system.dto.LoginRequest;
import com.flower_booking.flower_booking_system.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}