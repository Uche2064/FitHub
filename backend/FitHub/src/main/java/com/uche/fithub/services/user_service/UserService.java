package com.uche.fithub.services.user_service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.uche.fithub.entities.User;
import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.LoginUserSchema;
import com.uche.fithub.dto.user_dto.UpdateUserSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.entities.Roles;
import com.uche.fithub.repositories.UserRepository;
import com.uche.fithub.services.auth_service.AuthService;
import com.uche.fithub.utils.JwtUtils;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository mRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Override
    public Map<String, Object> loginUser(LoginUserSchema user) {
        Authentication auth = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (auth.isAuthenticated()) {
            @SuppressWarnings({ "rawtypes", "unchecked" })
            Map<String, Object> authData = new HashMap();
            User user_ = new User();
            user_.setUsername(user.getUsername());
            // user_.setPassword(user.getPassword());
            authData.put("token", jwtUtils.generateToken(user_));
            authData.put("type", "Bearer");

            return authData;
        } else {
            throw new RuntimeException("Nom d'utilisateur ou mot de passe invalide");
        }
    }

    @Override
    public UserDto changePassword(UpdateUserSchema user) {
        String username = authService.getAuthenticatedUsername();
        User dbUser = mRepository.findByUsername(username);

        if (!bCryptPasswordEncoder.matches(user.getOldPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }

        dbUser.setPassword(bCryptPasswordEncoder.encode(user.getNewPassword()));
        User savedUser = mRepository.save(dbUser);
        return savedUser.getDto();
    }

}
