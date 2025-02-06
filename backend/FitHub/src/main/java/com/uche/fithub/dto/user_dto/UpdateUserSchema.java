package com.uche.fithub.dto.user_dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserSchema {

    @Size(min = 8)
    @NotBlank(message = "Le champ ne doit pas être vide")
    private String oldPassword;
    @NotNull(message = "Champ obligatoire")
    @NotBlank(message = "Le champ ne doit pas être vide")
    @Size(min = 8)
    String newPassword;
}
