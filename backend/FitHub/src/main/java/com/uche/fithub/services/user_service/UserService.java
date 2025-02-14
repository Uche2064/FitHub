package com.uche.fithub.services.user_service;

import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.uche.fithub.entities.Roles;
import com.uche.fithub.entities.User;
import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.UpdatePasswordUserSchema;
import com.uche.fithub.dto.user_dto.UpdateUserInfoSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.repositories.UserRepository;
import com.uche.fithub.services.auth.AuthService;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthService authService;

    @Override
    public UserDto changePassword(UpdatePasswordUserSchema user) {
        String userName = authService.getAuthenticatedUsername();
        User dbUser = userRepository.findByUserName(userName);
        if (Objects.isNull(dbUser)) {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }

        dbUser.setPassword(bCryptPasswordEncoder.encode(user.getNewPassword()));
        User savedUser = userRepository.save(dbUser);
        return savedUser.getDto();

    }

    @Override
    public UserDto addUser(AddUserSchema user) {
        User dbUser = userRepository.findByUserName(user.getUserName());

        if (!Objects.isNull(dbUser)) {
            throw new EntityExistsException(
                    "Un utilisateur avec le nom d'utilisateur " + user.getUserName() + " existe déjà");
        }
        dbUser = userRepository.findByEmail(user.getEmail());

        if (!Objects.isNull(dbUser)) {
            throw new EntityExistsException("Un utilisateur avec l'email " + user.getEmail() + " existe déjà");
        }

        if (!Objects.isNull(user.getPhoneNumber())) {
            dbUser = userRepository.findByPhoneNumber(user.getPhoneNumber());
            if (!Objects.isNull(dbUser)) {
                throw new EntityExistsException(
                        "Un utilisateur avec le numéro de téléphone " + user.getPhoneNumber() + " existe déjà");
            }
        }

        User newUser = new User();
        newUser.setFullName(user.getFullName());
        newUser.setUserName(user.getUserName());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setRole(Roles.ROLE_USER);
        User savedUser = userRepository.save(newUser);
        return savedUser.getDto();
    }

    @Override
    public UserDto updateUserInfo(UpdateUserInfoSchema user) {
        String userName = authService.getAuthenticatedUsername();
        User dbUser = userRepository.findByUserName(userName);
        if (Objects.isNull(dbUser)) {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }

        Optional.ofNullable(user.getEmail()).ifPresent(dbUser::setEmail);
        Optional.ofNullable(user.getUserName()).ifPresent(dbUser::setUserName);
        Optional.ofNullable(user.getFullName()).ifPresent(dbUser::setFullName);
        Optional.ofNullable(user.getPhone()).ifPresent(dbUser::setPhoneNumber);
        userRepository.save(dbUser);
        return dbUser.getDto();

    }

    @Override
    public UserDto getCurrentUser() {
        String userName = authService.getAuthenticatedUsername();
        User dbUser = userRepository.findByUserName(userName);
        if (Objects.isNull(dbUser)) {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
        return dbUser.getDto();
    }

    @Override
    public void deleteUser() {
        String userName = authService.getAuthenticatedUsername();
        User dbUser = userRepository.findByUserName(userName);
        if (Objects.isNull(dbUser)) {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
        userRepository.delete(dbUser);
    }

    

}
