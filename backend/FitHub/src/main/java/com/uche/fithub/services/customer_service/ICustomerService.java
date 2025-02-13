package com.uche.fithub.services.customer_service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.uche.fithub.dto.customer_dto.CustomerDto;
import com.uche.fithub.dto.customer_dto.AddCustomerSchema;
import com.uche.fithub.dto.customer_dto.UpdateSchema;

@Service
public interface ICustomerService {
    public List<CustomerDto> getCustomers();

    public CustomerDto register(AddCustomerSchema customer);

    public CustomerDto updateCustomerInfo(UpdateSchema customer, Long id);

    public List<CustomerDto> getCustomersWithInctiveSubscription();

    public void deleteCustomer(Long id);

    public CustomerDto findCustomerById(Long id);

    public Page<CustomerDto> getPaginatedCustomers(Pageable pageable);

}
