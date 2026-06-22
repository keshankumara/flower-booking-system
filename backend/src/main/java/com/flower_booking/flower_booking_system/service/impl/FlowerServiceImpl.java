package com.flower_booking.flower_booking_system.service.impl;

import com.flower_booking.flower_booking_system.entity.Flower;
import com.flower_booking.flower_booking_system.repository.FlowerRepository;
import com.flower_booking.flower_booking_system.service.FlowerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlowerServiceImpl implements FlowerService {

    private final FlowerRepository flowerRepository;

    public FlowerServiceImpl(FlowerRepository flowerRepository) {
        this.flowerRepository = flowerRepository;
    }

    @Override
    public Flower create(Flower flower) {
        return flowerRepository.save(flower);
    }

    @Override
    public List<Flower> getAll() {
        return flowerRepository.findAll();
    }

    @Override
    public Flower getById(Long id) {
        return flowerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flower not found"));
    }

    @Override
    public Flower update(Long id, Flower flower) {
        Flower existing = getById(id);

        existing.setName(flower.getName());
        existing.setDescription(flower.getDescription());
        existing.setPrice(flower.getPrice());
        existing.setStockQuantity(flower.getStockQuantity());
        existing.setImageUrl(flower.getImageUrl());
        existing.setCategory(flower.getCategory());

        return flowerRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        flowerRepository.deleteById(id);
    }

    @Override
    public List<Flower> getByCategory(Long categoryId) {
        return flowerRepository.findByCategoryId(categoryId);
    }

    @Override   
    public List<Flower> searchByName(String name) {
        return flowerRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Flower> filterByPrice(Double min, Double max) {
        return flowerRepository.findByPriceBetween(min, max);
    }

    @Override
    public List<Flower> filterByCategory(Long categoryId) {
        return flowerRepository.findByCategoryId(categoryId);
    }
}