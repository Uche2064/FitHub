package com.uche.fithub.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.uche.fithub.dto.customer_dto.CustomerDto;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "customers")
@EntityListeners(AuditingEntityListener.class)

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String firstName;

    @Column(unique = true)
    private String username;

    @Column(nullable = false)
    private LocalDate registrationDate;

    private String password;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private boolean activeSubscription;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime addedAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public CustomerDto getDto() {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(this.customerId);
        customerDto.setFirstName(this.firstName);
        customerDto.setLastName(this.lastName);
        customerDto.setRegistrationDate(this.registrationDate);
        customerDto.setUsername(this.username);
        customerDto.setPhoneNumber(this.phoneNumber);
        customerDto.setActiveSubscription(this.activeSubscription);

        return customerDto;

    }

}
