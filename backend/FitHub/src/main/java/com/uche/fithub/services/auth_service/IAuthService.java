package com.uche.fithub.services.auth_service;

import org.springframework.stereotype.Service;

@Service
public interface IAuthService {
    public String getAuthenticatedUsername();    
}
