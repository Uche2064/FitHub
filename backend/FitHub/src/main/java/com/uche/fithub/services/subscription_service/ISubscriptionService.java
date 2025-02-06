package com.uche.fithub.services.subscription_service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uche.fithub.dto.subscription_dto.AddCustomerToPackSchema;
import com.uche.fithub.dto.subscription_dto.SubscriptionDto;

@Service
public interface ISubscriptionService {
    public SubscriptionDto subscribeCustomerToPack(AddCustomerToPackSchema sub);
    public SubscriptionDto getCustomerWithActiveSubscription(Long customerId);
    public void cancelSubscription(Long subscriptionId);
    public List<SubscriptionDto> getSubscriptions();
}
