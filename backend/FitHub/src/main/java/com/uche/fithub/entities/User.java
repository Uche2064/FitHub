package com.uche.fithub.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.uche.fithub.dto.user_dto.UserDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String userName;

    private String password;

    @Enumerated(EnumType.STRING)
    private Roles role;

    @Column(unique = true)
    private String email;

    @Column(unique = true, nullable = true)
    private String phoneNumber;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime addedAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public UserDto getDto() {
        UserDto dto = new UserDto();
        dto.setId(this.id);
        dto.setUserName(this.userName);
        dto.setEmail(this.email);
        dto.setFullName(this.fullName);
        dto.setCreatedAt(this.addedAt);
        dto.setPhone(this.phoneNumber);
        dto.setUpdatedAt(this.updatedAt);
        dto.setRole(this.role);
        return dto;
    }
}
