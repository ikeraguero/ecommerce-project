package com.shoppingsystem.shopping_system.user.repository;

import com.shoppingsystem.shopping_system.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}