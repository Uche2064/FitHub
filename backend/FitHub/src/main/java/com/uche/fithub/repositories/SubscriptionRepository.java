package com.uche.fithub.repositories;

import java.util.List;
import java.util.Optional;

import org.springdoc.core.converters.models.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.uche.fithub.entities.Pack;
import com.uche.fithub.entities.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    @Query("SELECT s FROM Subscription s WHERE s.customer.id = ?1")
    Optional<Subscription> findByCustomerId(@Param("customerId") Long customerId);

    List<Subscription> findAllByActiveTrue();

    @Query("SELECT s FROM Subscription s WHERE s.pack.id = ?1")
    List<Subscription> findByPack(@Param("packId") Long packId);



}
