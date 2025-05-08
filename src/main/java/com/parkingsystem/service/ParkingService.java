package com.parkingsystem.service;

import com.parkingsystem.entity.ParkingArea;
import com.parkingsystem.entity.ParkingSlot;
import com.parkingsystem.repository.ParkingAreaRepository;
import com.parkingsystem.repository.ParkingSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParkingService {
    private final ParkingAreaRepository parkingAreaRepository;
    private final ParkingSlotRepository parkingSlotRepository;

    @Transactional
    public ParkingArea createParkingArea(String name, String location, Integer totalSlots) {
        if (parkingAreaRepository.existsByNameAndLocation(name, location)) {
            throw new IllegalStateException("Parking area already exists at this location");
        }

        ParkingArea parkingArea = new ParkingArea();
        parkingArea.setName(name);
        parkingArea.setLocation(location);
        parkingArea.setTotalSlots(totalSlots);
        parkingArea.setIsActive(true);
        
        ParkingArea savedArea = parkingAreaRepository.save(parkingArea);

        // Create parking slots for the area
        for (int i = 1; i <= totalSlots; i++) {
            ParkingSlot slot = new ParkingSlot();
            slot.setParkingArea(savedArea);
            slot.setSlotNumber(String.format("%03d", i));
            slot.setIsAvailable(true);
            slot.setVehicleType("CARS_ONLY");
            parkingSlotRepository.save(slot);
        }

        return savedArea;
    }

    public List<ParkingArea> getAllActiveParkingAreas() {
        return parkingAreaRepository.findByIsActiveTrue();
    }

    public List<ParkingSlot> getAvailableSlots(ParkingArea parkingArea, LocalDateTime startTime, LocalDateTime endTime) {
        return parkingSlotRepository.findAvailableSlots(parkingArea, startTime, endTime);
    }

    @Transactional
    public void deactivateParkingArea(Long parkingAreaId) {
        ParkingArea parkingArea = parkingAreaRepository.findById(parkingAreaId)
                .orElseThrow(() -> new IllegalArgumentException("Parking area not found"));
        
        parkingArea.setIsActive(false);
        parkingAreaRepository.save(parkingArea);
    }

    @Transactional
    public void updateSlotStatus(Long slotId, boolean isAvailable) {
        ParkingSlot slot = parkingSlotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Parking slot not found"));
        
        slot.setIsAvailable(isAvailable);
        parkingSlotRepository.save(slot);
    }

    public Optional<ParkingSlot> findSlotById(Long slotId) {
        return parkingSlotRepository.findById(slotId);
    }

    public Optional<ParkingArea> findParkingAreaById(Long areaId) {
        return parkingAreaRepository.findById(areaId);
    }

    public long getAvailableSlotsCount(ParkingArea parkingArea) {
        return parkingSlotRepository.countByParkingAreaAndIsAvailableTrue(parkingArea);
    }

    public long getTotalSlotsCount(ParkingArea parkingArea) {
        return parkingSlotRepository.getTotalSlotCount(parkingArea);
    }
    public List<ParkingSlot> getParkingSlotsByAreaId(Long areaId) {
        ParkingArea parkingArea = parkingAreaRepository.findById(areaId)
                .orElseThrow(() -> new IllegalArgumentException("Parking area not found"));
        return parkingSlotRepository.findByParkingArea(parkingArea);
    }

    @Transactional
    public void addParkingSlotsToArea(Long areaId, Integer additionalSlots) {
        ParkingArea parkingArea = parkingAreaRepository.findById(areaId)
                .orElseThrow(() -> new IllegalArgumentException("Parking area not found"));
        
        int currentTotalSlots = parkingArea.getTotalSlots();
        int startNumber = currentTotalSlots + 1;

        for (int i = startNumber; i < startNumber + additionalSlots; i++) {
            ParkingSlot slot = new ParkingSlot();
            slot.setParkingArea(parkingArea);
            slot.setSlotNumber(String.format("%03d", i));
            slot.setIsAvailable(true);
            slot.setVehicleType("CARS_ONLY");
            parkingSlotRepository.save(slot);
        }

        parkingArea.setTotalSlots(currentTotalSlots + additionalSlots);
        parkingAreaRepository.save(parkingArea);
    }
}