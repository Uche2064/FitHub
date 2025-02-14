package com.uche.fithub.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String accessToken;
    private String refreshToken;
    private Long userId;
    private String userName;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String accessTokenType = "Bearer";
}
