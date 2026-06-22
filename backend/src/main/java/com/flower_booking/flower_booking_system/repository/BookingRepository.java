package com.flower_booking.flower_booking_system.repository;

import com.flower_booking.flower_booking_system.entity.Booking;
import com.flower_booking.flower_booking_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);
}
