package com.uche.fithub.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.uche.fithub.entities.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findFirstByPhoneNumber(String phoneNumber);

    @Query("SELECT c FROM Customer c WHERE c.activeSubscription = false")
    List<Customer> findAllByInactiveSubscription();

}
