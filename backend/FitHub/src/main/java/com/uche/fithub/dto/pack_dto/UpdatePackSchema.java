package com.uche.fithub.dto.pack_dto;

import lombok.Data;

@Data
public class UpdatePackSchema {
    private String offerName;

    private int durationMonths;

    private double monthlyPrice;
}
