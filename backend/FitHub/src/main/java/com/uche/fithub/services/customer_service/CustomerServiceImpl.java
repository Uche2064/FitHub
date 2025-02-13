package com.uche.fithub.services.customer_service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public CustomerDto updateCustomerInfo(UpdateSchema customer, Long id) {
        Customer dbCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Le client n'est pas enregisté"));
                System.out.println(dbCustomer);

        Optional.ofNullable(customer.getFirstName()).ifPresent(dbCustomer::setFirstName);
        Optional.ofNullable(customer.getLastName()).ifPresent(dbCustomer::setLastName);
        Optional.ofNullable(customer.getPhoneNumber()).ifPresent(dbCustomer::setPhoneNumber);
        customerRepository.save(dbCustomer);

        return dbCustomer.getDto();
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer dbCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Le client n'est pas enregistrer"));

        if (dbCustomer.isActiveSubscription()) {
            throw new IllegalStateException("Impossible de supprimer un client avec une souscription active");
        }

        customerRepository.deleteById(id);
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

    @Override
    public List<CustomerDto> getCustomersWithInctiveSubscription() {
        List<Customer> customers = customerRepository.findAllByInactiveSubscription();

        return customers.stream().map(Customer::getDto).collect(Collectors.toList());
    }

}
