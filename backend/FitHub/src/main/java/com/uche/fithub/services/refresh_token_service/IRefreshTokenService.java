package com.uche.fithub.services.refresh_token_service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.uche.fithub.entities.RefreshToken;
import com.uche.fithub.utils.TokenRefreshResponse;

@Service
public interface IRefreshTokenService {
    public RefreshToken createRefreshToken(Long userId);

    public Optional<RefreshToken> verifyRefreshToken(RefreshToken token) throws Exception;

    public TokenRefreshResponse refreshToken(String requestRefreshToken);
}
