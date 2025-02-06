package com.uche.fithub.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.uche.fithub.dto.pack_dto.PackDto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "packs")
@EntityListeners(AuditingEntityListener.class)

public class Pack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packId;

    @Column(nullable = false, unique = true)
    private String offerName;

    @Column(nullable = false)
    private int durationMonths;

    @Column(nullable = false)
    private double monthlyPrice;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime addedAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public PackDto getDto() {
        PackDto packDto = new PackDto();
        packDto.setId(this.packId);
        packDto.setOfferName(this.offerName);
        packDto.setDurationMonths(this.durationMonths);
        packDto.setMonthlyPrice(this.monthlyPrice);
        return packDto;
    }
}
