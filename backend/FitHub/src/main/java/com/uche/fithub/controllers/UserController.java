package com.uche.fithub.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uche.fithub.dto.auth_dto.LoginUserSchema;
import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.UpdatePasswordUserSchema;
import com.uche.fithub.dto.user_dto.UpdateUserInfoSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.services.auth.AuthService;
import com.uche.fithub.services.user_service.UserService;
import com.uche.fithub.utils.JwtResponse;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    AuthService authService;

    @PostMapping("register")
    public ResponseEntity<?> register(@Valid @RequestBody AddUserSchema user) {
        try {
            UserDto userDto = userService.addUser(user);
            return new ResponseEntity<>(userDto, HttpStatus.CREATED);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("change-password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdatePasswordUserSchema entity) {
        try {
            UserDto userDto = userService.changePassword(entity);
            return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("update")
    public ResponseEntity<?> updateInfo(@RequestBody UpdateUserInfoSchema entity) {
        try {
            UserDto userDto = userService.updateUserInfo(entity);
            return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);

        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
