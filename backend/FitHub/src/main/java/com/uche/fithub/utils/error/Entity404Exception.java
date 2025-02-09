package com.uche.fithub.utils.error;

import lombok.Data;

@Data
public class Entity404Exception {
    private String message;
    private Integer errorCode;    
}
