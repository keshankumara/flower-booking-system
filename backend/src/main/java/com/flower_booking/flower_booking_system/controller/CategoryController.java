package com.flower_booking.flower_booking_system.controller;

import com.flower_booking.flower_booking_system.entity.Category;
import com.flower_booking.flower_booking_system.service.CategoryService;
import com.flower_booking.flower_booking_system.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final FileStorageService fileStorageService;

    // Constructor injection
    public CategoryController(CategoryService categoryService,
                              FileStorageService fileStorageService) {
        this.categoryService = categoryService;
        this.fileStorageService = fileStorageService;
    }

    // 🟢 CREATE CATEGORY WITH IMAGE UPLOAD
    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image
    ) {

        // 1. Save image to backend folder
        String imageUrl = fileStorageService.saveCategoryImage(image);

        // 2. Create Category entity
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        category.setImageUrl(imageUrl);

        // 3. Save to database
        Category savedCategory = categoryService.create(category);

        // 4. Return response
        return ResponseEntity.ok(savedCategory);
    }

    // 🟢 GET ALL CATEGORIES
    @GetMapping
    public List<Category> getAll() {
        return categoryService.getAll();
    }

    // 🟢 GET CATEGORY BY ID
    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return categoryService.getById(id);
    }

    // 🟢 UPDATE CATEGORY (NO IMAGE UPDATE YET)
    @PutMapping("/{id}")
    public Category update(@PathVariable Long id,
                           @RequestBody Category category) {
        return categoryService.update(id, category);
    }

    // 🟢 DELETE CATEGORY
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        categoryService.delete(id);
        return "Category deleted";
    }
    
}