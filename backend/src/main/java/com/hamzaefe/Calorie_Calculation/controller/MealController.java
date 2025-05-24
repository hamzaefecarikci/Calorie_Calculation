package com.hamzaefe.Calorie_Calculation.controller;

import com.hamzaefe.Calorie_Calculation.model.Meal;
import com.hamzaefe.Calorie_Calculation.model.User;
import com.hamzaefe.Calorie_Calculation.repository.MealRepository;
import com.hamzaefe.Calorie_Calculation.repository.UserRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealRepository mealRepository;
    private final UserRepository userRepository;

    public MealController(MealRepository mealRepository, UserRepository userRepository) {
        this.mealRepository = mealRepository;
        this.userRepository = userRepository;
    }

    // 🥗 1. Yemek ekleme
    @PostMapping("/add")
    public ResponseEntity<?> addMeal(@RequestBody Meal meal) {
        if (meal.getUser() == null || meal.getUser().getId() == null) {
            return ResponseEntity.badRequest().body("Kullanıcı bilgisi eksik.");
        }

        Optional<User> userOpt = userRepository.findById(meal.getUser().getId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Kullanıcı bulunamadı.");
        }

        meal.setUser(userOpt.get());
        meal.setDate(LocalDateTime.now());
        mealRepository.save(meal);
        return ResponseEntity.ok("Yemek kaydedildi.");
    }

    // 📃 2. Kullanıcının tüm yemekleri
    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAllMeals(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Kullanıcı bulunamadı.");
        }

        List<Meal> meals = mealRepository.findByUser(userOpt.get());
        return ResponseEntity.ok(meals);
    }

    // 📊 3. Kullanıcının bugünkü toplam kalorisi
    @GetMapping("/today-total/{userId}")
    public ResponseEntity<?> getTodayCalories(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Kullanıcı bulunamadı.");
        }

        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        List<Meal> meals = mealRepository.findByUserAndDateBetween(userOpt.get(), startOfDay, endOfDay);

        double totalCalories = meals.stream().mapToDouble(Meal::getCalories).sum();

        return ResponseEntity.ok("Bugünkü toplam kalori: " + totalCalories + " kcal");
    }
}
