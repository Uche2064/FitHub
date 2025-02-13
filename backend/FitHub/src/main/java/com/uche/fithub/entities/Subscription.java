package com.uche.fithub.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.uche.fithub.dto.subscription_dto.SubscriptionDto;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subscriptions")
@EntityListeners(AuditingEntityListener.class)

public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pack_id", nullable = false)
    private Pack pack;

    @Column(nullable = false)
    private LocalDate startDate;

    private boolean active = true;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime addedAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public LocalDate getEndDate() {
        return startDate.plusMonths(pack.getDurationMonths());
    }

    public SubscriptionDto getDto() {
        SubscriptionDto dto = new SubscriptionDto();
        dto.setId(this.subscriptionId);
        dto.setCustomer(this.customer.getDto());
        dto.setPack(this.pack.getDto());
        dto.setStartDate(this.startDate);
        dto.setActive(this.active);
        dto.setEndDate(this.getEndDate());
        return dto;
    }
}
