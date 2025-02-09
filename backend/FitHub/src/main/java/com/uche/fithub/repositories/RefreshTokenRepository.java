package com.uche.fithub.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uche.fithub.entities.RefreshToken;
import com.uche.fithub.entities.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    void deleteByUser(User user);

    Optional<RefreshToken> findByToken(String token);

    RefreshToken findByUserId(Long userId);
    
}
