package com.parkingsystem;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class ParkingSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(ParkingSystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(Environment env) {
        return args -> {
            String jwtSecret = env.getProperty("jwt.secret");
            String jwtExpiration = env.getProperty("jwt.expiration");
            if (jwtSecret == null || jwtExpiration == null) {
                throw new IllegalStateException("JWT configuration not found! Please check application.yml");
            }
            System.out.println("JWT Configuration loaded successfully!");
        };
    }
}