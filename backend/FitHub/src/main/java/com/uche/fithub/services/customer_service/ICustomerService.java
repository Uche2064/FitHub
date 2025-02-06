package com.uche.fithub.services.customer_service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uche.fithub.dto.customer_dto.CustomerDto;
import com.uche.fithub.dto.customer_dto.AddCustomerSchema;
import com.uche.fithub.dto.customer_dto.UpdateSchema;

@Service
public interface ICustomerService {
    public List<CustomerDto> getCustomers();
    public CustomerDto register(AddCustomerSchema customer); 
    public void login(String email, String password);
    public CustomerDto updateCustomerInfo(UpdateSchema customer, Long id);
    public void deleteCustomer(Long id);
    public void changePassword(String email, String password);  
    public void logout();
    public CustomerDto findClientByUsername(String username);
    public CustomerDto findCustomerById(Long id);
}
