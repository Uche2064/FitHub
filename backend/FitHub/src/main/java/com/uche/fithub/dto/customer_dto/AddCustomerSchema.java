package com.uche.fithub.dto.customer_dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AddCustomerSchema {

    @NotBlank(message = "Champ obligatoire")
    private String firstName;
    @NotBlank(message = "Champ obligatoire")
    private String lastName;

    @Pattern(regexp = "^\\+?[0-9]{8}$", message = "Le numéro doit comporter 8 chiffres")
    private String phoneNumber;

}
