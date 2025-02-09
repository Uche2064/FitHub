package com.uche.fithub.utils.error;

import lombok.Data;

@Data
public class TokenRefreshException {
    private String token;
    private String message;
    private Integer errorCode;
}
