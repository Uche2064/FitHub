package com.uche.fithub.dto.subscription_dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddCustomerToPackSchema {

    @NotNull(message = "Champ obligatoire")
    private Long customerId;

    @NotNull(message = "Champ obligatoire")
    private Long packId;

    @NotNull(message = "Champ obligatoire")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
}
