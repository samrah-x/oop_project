package com.parkingshistem.oopproject00.Repositories;

import com.parkingshistem.oopproject00.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByParkingAreaAndStatus(ParkingArea parkingArea, ParkingSlot.ParkingSlotStatus status);

    List<ParkingSlot> findByParkingAreaId(Long parkingAreaId);

    List<ParkingSlot> findByParkingAreaIdAndStatus(Long parkingAreaId, ParkingSlot.ParkingSlotStatus status);

    @Query("SELECT COUNT(ps) FROM ParkingSlot ps WHERE ps.parkingArea.id = ?1 AND ps.status = 'AVAILABLE'")
    long countAvailableSlotsByParkingAreaId(Long parkingAreaId);

    @Query("SELECT ps FROM ParkingSlot ps WHERE ps.status = 'AVAILABLE'")
    List<ParkingSlot> findAllAvailableSlots();

    // (asked AI to make these methods, some might be redundant ;P)
}