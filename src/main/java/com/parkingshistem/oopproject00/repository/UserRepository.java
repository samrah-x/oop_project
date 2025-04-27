package com.parkingshistem.oopproject00.repository;

import com.parkingshistem.oopproject00.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByEmail(String email);
}
