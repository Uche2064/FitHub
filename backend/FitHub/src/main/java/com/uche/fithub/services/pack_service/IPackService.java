package com.uche.fithub.services.pack_service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uche.fithub.dto.pack_dto.AddPackSchema;
import com.uche.fithub.dto.pack_dto.PackDto;
import com.uche.fithub.dto.pack_dto.UpdatePackSchema;

@Service
public interface IPackService {
    public PackDto addPack(AddPackSchema pack);

    public List<PackDto> getPacks();

    public void deletePack(Long packId);

    public PackDto updatePack(Long packId, UpdatePackSchema pack);
}
