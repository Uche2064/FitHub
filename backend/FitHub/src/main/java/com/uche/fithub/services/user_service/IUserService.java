package com.uche.fithub.services.user_service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.uche.fithub.dto.auth_dto.LoginUserSchema;
import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.UpdatePasswordUserSchema;
import com.uche.fithub.dto.user_dto.UpdateUserInfoSchema;
import com.uche.fithub.dto.user_dto.UserDto;
import com.uche.fithub.utils.JwtResponse;

@Service
public interface IUserService {
    public UserDto changePassword(UpdatePasswordUserSchema user);
    public UserDto addUser(AddUserSchema user);
    public UserDto updateUserInfo(UpdateUserInfoSchema user);
}
