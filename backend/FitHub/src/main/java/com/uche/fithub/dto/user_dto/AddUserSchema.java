package com.uche.fithub.dto.user_dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddUserSchema {

    @NotNull(message = "Champ obligatoire")
    @Size(min = 5, message = "Le nom d'utilisateur doit contenir au moins 5 caractères")
    private String username;
    @NotNull(message = "Champ obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;
}
