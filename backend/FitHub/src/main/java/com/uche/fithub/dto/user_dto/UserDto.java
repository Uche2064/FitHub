package com.uche.fithub.dto.user_dto;

import java.time.LocalDateTime;

import com.uche.fithub.entities.Roles;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String username;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Roles role;
}
