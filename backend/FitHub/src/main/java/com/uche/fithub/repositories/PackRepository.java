package com.uche.fithub.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uche.fithub.entities.Pack;

@Repository
public interface PackRepository extends JpaRepository<Pack, Long>{
    Optional<Pack> findByOfferName(String offerName);
}
