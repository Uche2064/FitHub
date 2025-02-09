package com.uche.fithub.services.refresh_token_service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uche.fithub.entities.RefreshToken;
import com.uche.fithub.entities.User;
import com.uche.fithub.repositories.RefreshTokenRepository;
import com.uche.fithub.repositories.UserRepository;
import com.uche.fithub.utils.JwtUtils;
import com.uche.fithub.utils.TokenRefreshResponse;
import com.uche.fithub.utils.error.TokenRefreshException;

import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class RefreshTokenService implements IRefreshTokenService {
    @Value("${app.refresh-token.expiration-ms}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public TokenRefreshResponse refreshToken(String requestRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(requestRefreshToken)
                .orElseThrow(() -> new EntityNotFoundException("Jeton de rafraîchissement invalide. Veuillez vous connectez"));

        RefreshToken verifyRefreshToken = this.verifyRefreshToken(refreshToken)
                .orElseThrow(() -> new EntityNotFoundException("Jeton de rafraîchissement invalide" ));
        if (Objects.isNull(verifyRefreshToken)) {
            throw new RuntimeException(
                    "Refresh token has expired! Please generate a new one.");
        }
        String newAccessToken = jwtUtils.generateTokenFromUsername(refreshToken.getUser().getUsername());
        return new TokenRefreshResponse(newAccessToken, requestRefreshToken);
    }

    @Override
    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();
        User dbUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));
        RefreshToken dbRefreshToken = refreshTokenRepository.findByUserId(userId);
        if (!Objects.isNull(dbRefreshToken)) {
            refreshTokenRepository.delete(dbRefreshToken);
        }
        refreshToken.setUser(dbUser);
        refreshToken.setExpiryDate(new Date(System.currentTimeMillis() + refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    @Override
    public Optional<RefreshToken> verifyRefreshToken(RefreshToken token) {
        if (token.getExpiryDate().compareTo(new Date(0)) < 0) {
            refreshTokenRepository.delete(token);
            return null;
        }
        return Optional.ofNullable(token);
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        User dbUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));
        refreshTokenRepository.deleteByUser(dbUser);
    }
}
