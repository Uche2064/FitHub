package com.uche.fithub.services.customer_service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uche.fithub.dto.customer_dto.CustomerDto;
import com.uche.fithub.dto.customer_dto.AddCustomerSchema;
import com.uche.fithub.dto.customer_dto.UpdateSchema;
import com.uche.fithub.entities.Customer;
import com.uche.fithub.repositories.CustomerRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Pageable;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Page<CustomerDto> getPaginatedCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable).map(Customer::getDto);
    }

    @Override
    public CustomerDto register(AddCustomerSchema customer) {
        if (customerRepository.findFirstByPhoneNumber(customer.getPhoneNumber()).isPresent()) {
            throw new EntityExistsException("Le client avec le numéro " + customer.getPhoneNumber() + " existe déjà");
        }

        Customer newCustomer = new Customer();
        newCustomer.setFirstName(customer.getFirstName());
        newCustomer.setLastName(customer.getLastName());
        newCustomer.setPhoneNumber(customer.getPhoneNumber());
        newCustomer.setRegistrationDate(LocalDate.now());
        Customer createdCustomer = customerRepository.save(newCustomer);
        return createdCustomer.getDto();
    }

    @Override
    public void login(String email, String password) {
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    @Override
    public CustomerDto updateCustomerInfo(UpdateSchema customer, Long id) {
        Customer dbCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Le client n'est pas enregisté"));

        Optional.ofNullable(customer.getFirstName()).ifPresent(dbCustomer::setFirstName);
        Optional.ofNullable(customer.getLastName()).ifPresent(dbCustomer::setLastName);
        Optional.ofNullable(customer.getPhoneNumber()).ifPresent(dbCustomer::setPhoneNumber);
        customerRepository.save(dbCustomer);

        return dbCustomer.getDto();
    }

    @Override
    public void deleteCustomer(Long id) {
        if (customerRepository.findById(id).isEmpty()) {
            throw new EntityNotFoundException("Le client n'est pas enregistrer");
        }
        customerRepository.deleteById(id);
    }

    @Override
    public void changePassword(String email, String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'changePassword'");
    }

    @Override
    public void logout() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'logout'");
    }

    @Override
    public List<CustomerDto> getCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(Customer::getDto).collect(Collectors.toList());
    }

    @Override
    public CustomerDto findCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Le client n'est pas trouvé")).getDto();
    }

}
