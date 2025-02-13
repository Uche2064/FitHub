package com.uche.fithub.dto.auth_dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginUserSchema {
    @Size(min = 2, message = "Nom d'utilisateur court")
    private String userName;

    @Size(min = 8, message = "Mot de passe court")
    private String password;
}
