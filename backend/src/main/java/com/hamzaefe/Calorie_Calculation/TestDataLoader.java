//package com.hamzaefe.Calorie_Calculation;
//
//import com.hamzaefe.Calorie_Calculation.model.User;
//import com.hamzaefe.Calorie_Calculation.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class TestDataLoader implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//
//    public TestDataLoader(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Eğer veritabanında hiç kullanıcı yoksa, bir tane ekle
//        if (userRepository.count() == 0) {
//            User user = User.builder()
//                    .name("Deneme Kullanıcı")
//                    .email("deneme@example.com")
//                    .password("123456")
//                    .age(25)
//                    .height(175)
//                    .weight(70)
//                    .gender("male")
//                    .activityLevel("moderate")
//                    .build();
//
//            userRepository.save(user);
//
//            System.out.println("📦 Test kullanıcısı eklendi!");
//        } else {
//            System.out.println("✅ Kullanıcı zaten mevcut.");
//        }
//    }
//}
