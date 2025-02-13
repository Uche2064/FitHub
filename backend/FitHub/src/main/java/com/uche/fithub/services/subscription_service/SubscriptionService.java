package com.uche.fithub.services.subscription_service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.uche.fithub.dto.subscription_dto.AddCustomerToPackSchema;
import com.uche.fithub.dto.subscription_dto.SubscriptionDto;
import com.uche.fithub.entities.Customer;
import com.uche.fithub.entities.Pack;
import com.uche.fithub.entities.Subscription;
import com.uche.fithub.repositories.CustomerRepository;
import com.uche.fithub.repositories.PackRepository;
import com.uche.fithub.repositories.SubscriptionRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;

@Service
public class SubscriptionService implements ISubscriptionService {

    @Autowired
    SubscriptionRepository subscriptionRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PackRepository packRepository;



    @Override
    public Page<SubscriptionDto> getPaginatedSubscription(Pageable pageable) {
        return subscriptionRepository.findAll(pageable).map(Subscription::getDto);
    }


    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void checkSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAllByActiveTrue();

        // Collect subscriptions to deactivate
        List<Subscription> expiredSubscriptions = subscriptions.stream()
            .filter(sub -> !sub.getEndDate().isAfter(LocalDate.now()))
            .collect(Collectors.toList());

        // Deactivate subscriptions and save
        for (Subscription sub : expiredSubscriptions) {
            sub.setActive(false);
        }

        // Save all changes in bulk
        subscriptionRepository.saveAll(expiredSubscriptions);
    }

    @Override
    public SubscriptionDto subscribeCustomerToPack(AddCustomerToPackSchema sub) {
        Customer customer = customerRepository.findById(sub.getCustomerId())
                .orElseThrow(() -> new EntityNotFoundException("Le client n'est pas enregistré"));
        Pack pack = packRepository.findById(sub.getPackId())
                .orElseThrow(() -> new EntityNotFoundException("Le pack n'est pas enregistré"));

        if (customer.isActiveSubscription()) {
            throw new EntityExistsException("L'abonné '" + customer.getFirstName() + ' ' + customer.getLastName()
                    + "' est déjà souscrit à un pack");
        }

        // create new sub
        Subscription newSub = new Subscription();
        newSub.setCustomer(customer);
        newSub.setPack(pack);
        newSub.setStartDate(sub.getStartDate());
        Subscription savedSub = subscriptionRepository.save(newSub);
        // update customers activeSubuscription field to true
        customer.setActiveSubscription(true);
        customerRepository.save(customer);

        // save new sub
        return savedSub.getDto();

    }

    @Override
    public void cancelSubscription(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        Customer customer = subscription.getCustomer();
        customer.setActiveSubscription(false);
        customerRepository.save(customer);

        subscriptionRepository.delete(subscription);
    }

    @Override
    public List<SubscriptionDto> getSubscriptions() {
        return subscriptionRepository.findAll().stream().map(Subscription::getDto).toList();
    }



}
