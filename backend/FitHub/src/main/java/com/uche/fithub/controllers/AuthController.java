package com.uche.fithub.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uche.fithub.dto.auth_dto.LoginUserSchema;
import com.uche.fithub.services.auth.AuthService;
import com.uche.fithub.services.refresh_token_service.RefreshTokenService;
import com.uche.fithub.utils.JwtResponse;
import com.uche.fithub.utils.TokenRefreshResponse;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    // Endpoint to check if user is logged in
    // authenticated.
    // Return true if the user is authenticated, false otherwise.
    @Autowired
    private AuthService authService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUserSchema user) {
        try {
            System.out.println("login user: " + user.toString());
            JwtResponse authData = authService.loginUser(user);
            return new ResponseEntity<>(authData, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/logout/{id}")
    public ResponseEntity<?> logoutUser(@PathVariable Long id) {
        try {
            refreshTokenService.deleteByUserId(id);
            return new ResponseEntity<>("Déconnexion", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/refresh/{refreshTokenUUID}")
    public ResponseEntity<?> refreshToken(@PathVariable String refreshTokenUUID) {
        try {
            TokenRefreshResponse refreshTokenResponse = refreshTokenService.refreshToken(refreshTokenUUID);
            return new ResponseEntity<>(refreshTokenResponse, HttpStatus.ACCEPTED);

        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

    }

}
