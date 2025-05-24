package com.hamzaefe.Calorie_Calculation.controller;

import com.hamzaefe.Calorie_Calculation.model.User;
import com.hamzaefe.Calorie_Calculation.repository.UserRepository;
import com.hamzaefe.Calorie_Calculation.service.CalorieService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final CalorieService calorieService;

    public UserController(UserRepository userRepository, CalorieService calorieService) {
        this.userRepository = userRepository;
        this.calorieService = calorieService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Bu e-posta zaten kayıtlı.");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser.get());
        }
        return ResponseEntity.status(401).body("E-posta veya şifre hatalı.");
    }

    @PostMapping("/calories")
    public ResponseEntity<?> calculateCalories(@RequestBody User user) {
        double dailyCalories = calorieService.calculateDailyCalories(user);
        return ResponseEntity.ok("Günlük ihtiyacınız olan kalori: " + dailyCalories);
    }
}
