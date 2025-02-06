package com.uche.fithub.services.subscription_service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

@Service
public class SubscriptionService implements ISubscriptionService {

    @Autowired
    SubscriptionRepository subscriptionRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PackRepository packRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void checkSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAllByActiveTrue();
        for (Subscription sub : subscriptions) {
            if (sub.getEndDate().isBefore(LocalDate.now()) || sub.getEndDate().isEqual(LocalDate.now())) {
                sub.setActive(false);
                subscriptionRepository.save(sub);
            }
        }
    }

    @Override
    public SubscriptionDto subscribeCustomerToPack(AddCustomerToPackSchema sub) {
        // find customer
        Customer customer = customerRepository.findById(sub.getCustomerId())
                .orElseThrow(() -> new EntityNotFoundException("Le client n'est pas enregistré"));
        // find pack
        Pack pack = packRepository.findById(sub.getPackId())
                .orElseThrow(() -> new EntityNotFoundException("Le pack n'est pas enregistré"));

        // check if customer is already subscribed to a pack
        if (customer.isActiveSubscription()) {
            throw new EntityExistsException("L'abonné '" + customer.getUsername() + "' est déjà souscrit à un pack");
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
    public SubscriptionDto getCustomerWithActiveSubscription(Long customerId) {
        return subscriptionRepository.findByCustomerId(customerId).orElseThrow(
                () -> new EntityNotFoundException("Le client avec l'id '" + customerId + "' n'est pas enregistré"))
                .getDto();
    }

    @Override
    public void cancelSubscription(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        // Update the customer's active subscription status
        Customer customer = subscription.getCustomer();
        customer.setActiveSubscription(false);
        customerRepository.save(customer);

        // Delete the subscription
        subscriptionRepository.delete(subscription);
    }

    @Override
    public List<SubscriptionDto> getSubscriptions() {
        return subscriptionRepository.findAll().stream().map(Subscription::getDto).toList();
    }

}
