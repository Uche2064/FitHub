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
    @Size(min = 5, max = 30, message = "Le nom d'utilisateur doit avoir au moins 5 caractères")
    private String username;

}
