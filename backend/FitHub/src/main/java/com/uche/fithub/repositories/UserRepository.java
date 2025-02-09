package com.uche.fithub.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uche.fithub.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);

    public User findByPhoneNumber(String phoneNumber);

    public User findByUsername(String username);
}
