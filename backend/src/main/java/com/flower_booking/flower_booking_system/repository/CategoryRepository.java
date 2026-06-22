package com.flower_booking.flower_booking_system.repository;


import com.flower_booking.flower_booking_system.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}