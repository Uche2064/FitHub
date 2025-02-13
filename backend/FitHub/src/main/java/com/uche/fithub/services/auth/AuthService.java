package com.uche.fithub.services.auth;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.uche.fithub.dto.auth_dto.AuthSchema;
import com.uche.fithub.dto.auth_dto.LoginUserSchema;
import com.uche.fithub.entities.CustomUserDetails;
import com.uche.fithub.entities.RefreshToken;
import com.uche.fithub.entities.User;
import com.uche.fithub.repositories.UserRepository;
import com.uche.fithub.services.CustomUserDetailsService;
import com.uche.fithub.services.refresh_token_service.RefreshTokenService;
import com.uche.fithub.utils.JwtResponse;
import com.uche.fithub.utils.JwtUtils;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AuthService implements IAuthService {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Override
    public JwtResponse loginUser(LoginUserSchema user) {
        User dbUser = userRepository.findByUserName(user.getUserName());
        if (Objects.isNull(dbUser)) {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
        Authentication auth = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));

        if (auth.isAuthenticated()) {
            JwtResponse jwtResponse = new JwtResponse();
            SecurityContextHolder.getContext().setAuthentication(auth);
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.user.getId());
            String jwt = jwtUtils.generateToken(userDetails);
            jwtResponse.setAccessToken(jwt);
            jwtResponse.setRefreshToken(refreshToken.getToken());
            jwtResponse.setUserName(user.getUserName());
            jwtResponse.setUserId(refreshToken.getUser().getId());

            System.out.println("Jwt response: " + jwtResponse);

            return jwtResponse;
        } else {
            throw new RuntimeException("Nom d'utilisateur ou mot de passe invalide");
        }
    }

    @Override
    public String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    @Override
    public boolean isAuthenticated(AuthSchema schema) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(schema.getUserName());
        if (jwtUtils.validateToken(schema.getToken(), userDetails)) {
            return true;
        } else {
            throw new IllegalStateException("Non valid token");
        }
    }

}
