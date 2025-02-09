package com.uche.fithub.dto.auth_dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthSchema {
    @NotBlank(message = "Username required")
    private String username;

    @NotBlank(message = "Token required")
    private String token;
}
