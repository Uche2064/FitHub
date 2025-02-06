package com.uche.fithub.services;

import com.uche.fithub.entities.Roles;
import com.uche.fithub.entities.User;
import com.uche.fithub.repositories.UserRepository;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class DataInitializerService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void init() {
        try {
            if (Objects.isNull(userRepository.findByUsername("admin"))) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(bCryptPasswordEncoder.encode("password"));
                admin.setRole(Roles.ROLE_ADMIN);
                userRepository.save(admin);
            } else {
                log.error("⚠️ Admin user already exists. Skipping creation.");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
