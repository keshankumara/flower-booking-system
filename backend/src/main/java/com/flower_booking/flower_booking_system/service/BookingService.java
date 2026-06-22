package com.flower_booking.flower_booking_system.service;


import com.flower_booking.flower_booking_system.entity.Booking;

import java.util.List;

public interface BookingService {

    Booking createBooking(String userEmail, Long flowerId, Integer quantity);

    List<Booking> getUserBookings(String userEmail);

    Booking cancelBooking(Long bookingId);
}
