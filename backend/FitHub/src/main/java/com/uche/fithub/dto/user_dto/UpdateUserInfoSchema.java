package com.uche.fithub.dto.user_dto;

import lombok.Data;

@Data
public class UpdateUserInfoSchema {
    private String userName;
    private String email;
    private String fullName;
    private String phone;
}
