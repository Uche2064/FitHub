package com.uche.fithub.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uche.fithub.entities.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findFirstByPhoneNumber(String phoneNumber);

    Customer findCustomerByUsername(String username);

}
