package com.flower_booking.flower_booking_system.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    // 👇 EXACT YOUR REQUIRED PATH
    private final String uploadDir = "backend/uploads/categories/";

    public String saveCategoryImage(MultipartFile file) {
        try {

            // 1. Create folder if not exists
            Path folder = Paths.get(uploadDir);
            if (!Files.exists(folder)) {
                Files.createDirectories(folder);
            }

            // 2. Unique filename
            String fileName = System.currentTimeMillis()
                    + "_" + file.getOriginalFilename();

            // 3. Save file
            Path filePath = folder.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // 4. Return URL (IMPORTANT: NOT FILE PATH)
            return "/uploads/categories/images/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }
}