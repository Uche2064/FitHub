package com.uche.fithub.dto.customer_dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddCustomerSchema {

    @NotBlank(message = "Champ obligatoire")
    private String firstName;
    @NotBlank(message = "Champ obligatoire")
    private String lastName;

    @Pattern(regexp = "^\\+?[0-9]{8}$", message = "Le numéro doit comporter 8 chiffres")
    private String phoneNumber;

    @NotBlank(message = "Champ obligatoire")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Le nom d'utilisateur ne peut contenir que des lettres et des chiffres")
    @Size(min = 6, max = 30, message = "Le nom d'utilisateur doit avoir au moins 6 caractères")
    private String username;

    @NotBlank(message = "Mot de passe obligatoire")
    @Size(min = 8, max = 20, message = "Le mot de passe doit avoir 8 à 20 caractères")
    private String password;
}
