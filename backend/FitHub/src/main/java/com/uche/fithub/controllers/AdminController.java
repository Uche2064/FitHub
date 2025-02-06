package com.uche.fithub.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.services.admin_service.AdminService;
import com.uche.fithub.services.auth_service.AuthService;
import com.uche.fithub.services.user_service.UserService;

import jakarta.persistence.EntityExistsException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/auth/admin")
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register-user")
    public ResponseEntity<?> createUser(@RequestBody @Valid AddUserSchema user) {
        try {
            UserDto createUser = adminService.createUser(user);
            return new ResponseEntity<>(createUser, HttpStatus.CREATED);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
