package com.hamzaefe.Calorie_Calculation.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;import jakarta.persistence.*;
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
    private double height; // boy (cm)
    private double weight; // kilo (kg)
    private String gender; // "male" / "female"
    private String activityLevel; // "low", "moderate", "high"
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Meal> meals;


}