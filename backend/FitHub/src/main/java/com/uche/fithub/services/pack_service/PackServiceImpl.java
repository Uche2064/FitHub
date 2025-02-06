package com.uche.fithub.services.pack_service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uche.fithub.dto.pack_dto.AddPackSchema;
import com.uche.fithub.dto.pack_dto.PackDto;
import com.uche.fithub.dto.pack_dto.UpdatePackSchema;
import com.uche.fithub.entities.Pack;
import com.uche.fithub.repositories.PackRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PackServiceImpl implements IPackService {

    @Autowired
    private PackRepository packRepository;

    @Override
    public PackDto addPack(AddPackSchema pack) {
        if (packRepository.findByOfferName(pack.getOfferName()).isPresent()) {
            throw new EntityExistsException("L'offre avec le nom '" + pack.getOfferName() + "' existe déjà");
        }
        Pack newPack = new Pack();
        newPack.setMonthlyPrice(pack.getMonthlyPrice());
        newPack.setOfferName(pack.getOfferName());
        newPack.setDurationMonths(pack.getDurationMonths());
        Pack savedPack = packRepository.save(newPack);
        return savedPack.getDto();
    }

    @Override
    public List<PackDto> getPacks() {
        List<Pack> packs = packRepository.findAll();
        return packs.stream().map(Pack::getDto).toList();
    }

    @Override
    public void deletePack(Long packId) {
        if (packRepository.findById(packId).isEmpty()) {
            throw new EntityNotFoundException("L'offre avec l'id '" + packId + "' n'existe pas");
        }
        packRepository.deleteById(packId);
    }

    @Override
    public PackDto updatePack(Long packId, UpdatePackSchema pack) {
        Pack dbPack = packRepository
                .findById(packId)
                .orElseThrow(() -> new EntityNotFoundException("L'offre avec l'id '" + packId + "' n'existe pas"));

        if (pack.getOfferName() != null && pack.getOfferName().compareToIgnoreCase(dbPack.getOfferName()) == 0) {
            throw new EntityExistsException("L'offre avec le nom du pack '" + dbPack.getOfferName() + "' existe déjà");
        }
        Optional.ofNullable(pack.getOfferName()).ifPresent(dbPack::setOfferName);
        Optional.ofNullable(pack.getDurationMonths()).ifPresent(dbPack::setDurationMonths);
        Optional.ofNullable(pack.getMonthlyPrice()).ifPresent(dbPack::setMonthlyPrice);
        packRepository.save(dbPack);
        return dbPack.getDto();
    }

}
