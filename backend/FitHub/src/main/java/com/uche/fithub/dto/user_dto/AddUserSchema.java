package com.uche.fithub.dto.user_dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddUserSchema {

    @Email(message = "E-mail invalide")
    @NotBlank(message = "E-mail est obligatoire")
    private String email;
    private String phoneNumber;
    @NotBlank(message = "Champ obligatoire")
    private String fullName;
    @NotNull(message = "Champ obligatoire")
    @Size(min = 5, message = "Le nom d'utilisateur doit contenir au moins 5 caractères")
    private String username;
    @NotNull(message = "Champ obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;
}
