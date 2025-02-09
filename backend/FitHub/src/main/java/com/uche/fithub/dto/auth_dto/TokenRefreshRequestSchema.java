package com.uche.fithub.dto.auth_dto;

import lombok.Data;

@Data
public class TokenRefreshRequestSchema {
    private String refreshToken;    
}
