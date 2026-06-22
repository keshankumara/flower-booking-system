package com.flower_booking.flower_booking_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "flowers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Flower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Integer stockQuantity;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}