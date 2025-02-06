package com.uche.fithub.services.admin_service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.entities.Roles;
import com.uche.fithub.entities.User;
import com.uche.fithub.repositories.UserRepository;

import jakarta.persistence.EntityExistsException;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(AddUserSchema user) {
        User dbUser = userRepository.findByUsername(user.getUsername());

        if (!Objects.isNull(dbUser)) {
            throw new EntityExistsException(
                    "Un utilisateur avec le nom d'utilisateur " + user.getUsername() + " existe déjà");
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setRole(Roles.ROLE_USER);
        User savedManager = userRepository.save(newUser);
        return savedManager.getDto();
    }
}
