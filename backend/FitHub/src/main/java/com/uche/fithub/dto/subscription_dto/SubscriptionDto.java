package com.uche.fithub.dto.subscription_dto;

import java.time.LocalDate;

import com.uche.fithub.dto.customer_dto.CustomerDto;
import com.uche.fithub.dto.pack_dto.PackDto;
import lombok.Data;

@Data
public class SubscriptionDto {
    private Long id;

    private CustomerDto customer;

    private PackDto pack;

    private LocalDate startDate;
    private boolean active;
}
