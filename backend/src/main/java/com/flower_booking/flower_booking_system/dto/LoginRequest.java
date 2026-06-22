package com.flower_booking.flower_booking_system.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}