package com.uche.fithub.dto.user_dto;

import lombok.Data;

@Data
public class UpdateUserInfoSchema {
    private String username;
    private String email;
    private String fullName;
    private String phone;
}
