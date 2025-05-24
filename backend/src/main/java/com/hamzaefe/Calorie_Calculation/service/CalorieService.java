package com.hamzaefe.Calorie_Calculation.service;

import com.hamzaefe.Calorie_Calculation.model.User;
import org.springframework.stereotype.Service;

@Service
public class CalorieService {

    public double calculateDailyCalories(User user) {
        double bmr;

        if (user.getGender().equalsIgnoreCase("male")) {
            bmr = 10 * user.getWeight()
                + 6.25 * user.getHeight()
                - 5 * user.getAge()
                + 5;
        } else {
            bmr = 10 * user.getWeight()
                + 6.25 * user.getHeight()
                - 5 * user.getAge()
                - 161;
        }

        double activityMultiplier = switch (user.getActivityLevel().toLowerCase()) {
            case "low" -> 1.2;
            case "moderate" -> 1.55;
            case "high" -> 1.9;
            default -> 1.0;
        };

        return bmr * activityMultiplier;
    }
}