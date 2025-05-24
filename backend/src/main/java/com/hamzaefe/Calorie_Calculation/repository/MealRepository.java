package com.hamzaefe.Calorie_Calculation.repository;

import com.hamzaefe.Calorie_Calculation.model.Meal;
import com.hamzaefe.Calorie_Calculation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByUser(User user);
    List<Meal> findByUserAndDateBetween(User user, LocalDateTime start, LocalDateTime end);
}