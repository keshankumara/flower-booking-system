package com.flower_booking.flower_booking_system.controller;

import com.flower_booking.flower_booking_system.entity.Booking;
import com.flower_booking.flower_booking_system.entity.Category;
import com.flower_booking.flower_booking_system.entity.Flower;
import com.flower_booking.flower_booking_system.repository.BookingRepository;
import com.flower_booking.flower_booking_system.repository.CategoryRepository;
import com.flower_booking.flower_booking_system.repository.FlowerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final FlowerRepository flowerRepository;
    private final CategoryRepository categoryRepository;
    private final BookingRepository bookingRepository;

    public AdminController(
            FlowerRepository flowerRepository,
            CategoryRepository categoryRepository,
            BookingRepository bookingRepository) {
        this.flowerRepository = flowerRepository;
        this.categoryRepository = categoryRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/flowers")
    public Flower addFlower(@RequestBody Flower flower) {
        return flowerRepository.save(flower);
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
}