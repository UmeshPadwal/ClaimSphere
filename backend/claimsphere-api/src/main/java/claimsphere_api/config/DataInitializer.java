package claimsphere_api.config;

import claimsphere_api.entity.User;
import claimsphere_api.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createDefaultUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User user = new User();

                user.setUsername("admin");

                user.setPassword(
                        passwordEncoder.encode("admin123")
                );

                user.setRole("ADMIN");

                userRepository.save(user);

                System.out.println(
                        "Default admin user created successfully."
                );
            }
        };
    }
}