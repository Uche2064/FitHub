package com.uche.fithub.services.auth;

import com.uche.fithub.dto.auth_dto.AuthSchema;
import com.uche.fithub.dto.auth_dto.LoginUserSchema;
import com.uche.fithub.utils.JwtResponse;

public interface IAuthService {
     public JwtResponse loginUser(LoginUserSchema user);

     public String getAuthenticatedUsername();

     public boolean isAuthenticated(AuthSchema schema);

}
