package com.uche.fithub.utils.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FieldErrorException {
    private String field;
    private String message;
    private Integer errorCode;
}
