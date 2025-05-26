package com.hamzaefe.Calorie_Calculation.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private int age;
    private double height; // cm
    private double weight; // kg
    private String gender; // "male" / "female"

    private String activityLevel; // "low", "moderate", "high"
}
