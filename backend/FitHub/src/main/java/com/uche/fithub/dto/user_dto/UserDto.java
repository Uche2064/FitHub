package com.uche.fithub.dto.user_dto;

import java.time.LocalDateTime;

import com.uche.fithub.entities.Roles;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String userName;
    private String email;
    private String fullName;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Roles role;
}
