package com.flower_booking.flower_booking_system.service;


import com.flower_booking.flower_booking_system.entity.*;
import java.util.List;

public interface CategoryService {

    Category create(Category category);

    List<Category> getAll();

    Category getById(Long id);

    Category update(Long id, Category category);

    void delete(Long id);
}
