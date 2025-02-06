package com.uche.fithub.services.user_service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.uche.fithub.dto.user_dto.LoginUserSchema;
import com.uche.fithub.dto.user_dto.UpdateUserSchema;
import com.uche.fithub.dto.user_dto.UserDto;

@Service
public interface IUserService {
    public Map<String, Object> loginUser(LoginUserSchema user);
    public UserDto changePassword(UpdateUserSchema user);
}
