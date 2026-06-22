package com.flower_booking.flower_booking_system.controller;

import com.flower_booking.flower_booking_system.entity.Flower;
import com.flower_booking.flower_booking_system.service.FlowerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flowers")
public class FlowerController {

    private final FlowerService flowerService;

    public FlowerController(FlowerService flowerService) {
        this.flowerService = flowerService;
    }

    @PostMapping
    public Flower create(@RequestBody Flower flower) {
        return flowerService.create(flower);
    }

    @GetMapping
    public List<Flower> getAll() {
        return flowerService.getAll();
    }

    @GetMapping("/{id}")
    public Flower getById(@PathVariable Long id) {
        return flowerService.getById(id);
    }

    @PutMapping("/{id}")
    public Flower update(@PathVariable Long id,
                         @RequestBody Flower flower) {
        return flowerService.update(id, flower);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        flowerService.delete(id);
        return "Flower deleted";
    }

    @GetMapping("/category/{categoryId}")
    public List<Flower> getByCategory(@PathVariable Long categoryId) {
        return flowerService.getByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<Flower> search(@RequestParam String name) {
        return flowerService.searchByName(name);
    }

    @GetMapping("/filter/price")
    public List<Flower> filterByPrice(
        @RequestParam Double min,
        @RequestParam Double max
    ) {
        return flowerService.filterByPrice(min, max);
    }

    @GetMapping("/filter/category/{id}")
    public List<Flower> filterByCategory(@PathVariable Long id) {
        return flowerService.filterByCategory(id);
    }
}