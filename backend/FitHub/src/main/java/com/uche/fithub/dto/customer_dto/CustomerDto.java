package com.uche.fithub.dto.customer_dto;

import java.time.LocalDate;


import lombok.Data;

@Data
public class CustomerDto {

    private Long id;
    private String lastName;

    private String firstName;

    private LocalDate registrationDate;

    private String phoneNumber;
    private boolean activeSubscription;

}
