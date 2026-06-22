package com.flower_booking.flower_booking_system.repository;

import com.flower_booking.flower_booking_system.entity.Flower;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Long> {

    List<Flower> findByCategoryId(Long categoryId);

    List<Flower> findByNameContainingIgnoreCase(String name);

    List<Flower> findByPriceBetween(Double min, Double max);
}