package com.hamzaefe.Calorie_Calculation.repository;

import com.hamzaefe.Calorie_Calculation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	
}