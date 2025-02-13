package com.uche.fithub.dto.pack_dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddPackSchema {
    @NotNull(message = "Champ obligatoire")
    @Size(min = 2, message = "Le nom du pack doit contenir au moins 5 caractères")
    private String offerName;

    @NotNull(message = "Champ obligatoire")
    @Min(1)
    private int durationMonths;

    @NotNull(message = "Champ obligatoire")
    private double monthlyPrice;
}
