package com.uche.fithub.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uche.fithub.dto.user_dto.LoginUserSchema;
import com.uche.fithub.dto.user_dto.UpdateUserSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.services.user_service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/user/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginUserSchema user) {
        try {
            Map<String, Object> authData = userService.loginUser(user);
            return new ResponseEntity<>(authData, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/user/update")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdateUserSchema entity) {
        try {
            UserDto userDto = userService.changePassword(entity);
            return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
