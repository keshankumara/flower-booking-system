package com.flower_booking.flower_booking_system.controller;

import com.flower_booking.flower_booking_system.entity.Booking;
import com.flower_booking.flower_booking_system.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(
            @RequestParam String email,
            @RequestParam Long flowerId,
            @RequestParam Integer quantity
    ) {
        return bookingService.createBooking(email, flowerId, quantity);
    }

    @GetMapping("/user")
    public List<Booking> getUserBookings(@RequestParam String email) {
        return bookingService.getUserBookings(email);
    }

    @PutMapping("/cancel/{id}")
    public Booking cancel(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }
}
