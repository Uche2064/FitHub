package com.uche.fithub.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uche.fithub.dto.customer_dto.CustomerDto;
import com.uche.fithub.dto.subscription_dto.AddCustomerToPackSchema;
import com.uche.fithub.dto.subscription_dto.SubscriptionDto;

import com.uche.fithub.services.subscription_service.SubscriptionService;

import io.jsonwebtoken.JwtException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/subscription")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<?> get(@PageableDefault(size = 5, sort = "customer") Pageable pageable) {
        try {
            Page<SubscriptionDto> customers = subscriptionService.getPaginatedSubscription(pageable);
            return new ResponseEntity<>(customers, HttpStatus.OK);

        } catch (JwtException e) {
            System.err.println("Error getting subscription: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getSubscriptionss() {
        return new ResponseEntity<>(subscriptionService.getSubscriptions(), HttpStatus.OK);
    }


    @PostMapping("/")
    public ResponseEntity<?> addCustomerToSub(@RequestBody @Valid AddCustomerToPackSchema subscription) {
        try {
            SubscriptionDto newSub = subscriptionService.subscribeCustomerToPack(subscription);
            return new ResponseEntity<>(newSub, HttpStatus.ACCEPTED);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelSubscription(@PathVariable Long id) {
        try {
            subscriptionService.cancelSubscription(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
