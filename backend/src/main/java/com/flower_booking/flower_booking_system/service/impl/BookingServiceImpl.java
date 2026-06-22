package com.flower_booking.flower_booking_system.service.impl;

import com.flower_booking.flower_booking_system.entity.*;
import com.flower_booking.flower_booking_system.repository.*;
import com.flower_booking.flower_booking_system.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FlowerRepository flowerRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            FlowerRepository flowerRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.flowerRepository = flowerRepository;
    }

    @Override
    public Booking createBooking(String userEmail, Long flowerId, Integer quantity) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Flower flower = flowerRepository.findById(flowerId)
                .orElseThrow(() -> new RuntimeException("Flower not found"));

        if (flower.getStockQuantity() < quantity) {
            throw new RuntimeException("Not enough stock");
        }

        // reduce stock
        flower.setStockQuantity(flower.getStockQuantity() - quantity);
        flowerRepository.save(flower);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlower(flower);
        booking.setQuantity(quantity);
        booking.setTotalPrice(flower.getPrice() * quantity);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getUserBookings(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUser(user);
    }

    @Override
    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }
}
