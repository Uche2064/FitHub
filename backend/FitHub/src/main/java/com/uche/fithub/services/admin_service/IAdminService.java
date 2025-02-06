package com.uche.fithub.services.admin_service;

import org.springframework.stereotype.Service;

import com.uche.fithub.dto.user_dto.AddUserSchema;
import com.uche.fithub.dto.user_dto.UserDto;

@Service
public interface IAdminService {
    public UserDto createUser(AddUserSchema user);
}
