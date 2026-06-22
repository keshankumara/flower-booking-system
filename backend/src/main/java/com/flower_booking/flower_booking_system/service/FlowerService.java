package com.flower_booking.flower_booking_system.service;

import com.flower_booking.flower_booking_system.entity.Flower;

import java.util.List;

public interface FlowerService {

    Flower create(Flower flower);

    List<Flower> getAll();

    Flower getById(Long id);

    Flower update(Long id, Flower flower);

    void delete(Long id);

    List<Flower> getByCategory(Long categoryId);

    List<Flower> searchByName(String name);

    List<Flower> filterByPrice(Double min, Double max);

    List<Flower> filterByCategory(Long categoryId);
}