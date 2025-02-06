package com.uche.fithub.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uche.fithub.dto.pack_dto.AddPackSchema;
import com.uche.fithub.dto.pack_dto.PackDto;
import com.uche.fithub.dto.pack_dto.UpdatePackSchema;
import com.uche.fithub.services.pack_service.PackServiceImpl;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/pack")
public class PackController {
    @Autowired
    private PackServiceImpl packService;

    @GetMapping("/")
    public ResponseEntity<?> getPacks() {
        return new ResponseEntity<>(packService.getPacks(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> savePack(@RequestBody @Valid AddPackSchema pack) {
        try {
            PackDto newPack = packService.addPack(pack);
            return new ResponseEntity<>(newPack, HttpStatus.ACCEPTED);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePack(@PathVariable Long id) {
        try {
            packService.deletePack(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePack(@PathVariable Long id, @RequestBody @Valid UpdatePackSchema pack) {
        try {
            PackDto updatePack = packService.updatePack(id, pack);
            return new ResponseEntity<>(updatePack, HttpStatus.ACCEPTED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
