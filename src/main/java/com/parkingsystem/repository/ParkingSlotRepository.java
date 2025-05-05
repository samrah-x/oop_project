package com.parkingsystem.repository;

import com.parkingsystem.entity.ParkingArea;
import com.parkingsystem.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByParkingAreaAndIsAvailableTrue(ParkingArea parkingArea);
    
    @Query("SELECT ps FROM ParkingSlot ps WHERE ps.parkingArea = :parkingArea " +
           "AND ps.isAvailable = true " +
           "AND NOT EXISTS (SELECT b FROM Booking b WHERE b.parkingSlot = ps " +
           "AND b.startTime <= :endTime AND b.endTime >= :startTime AND b.isActive = true)")
    List<ParkingSlot> findAvailableSlots(ParkingArea parkingArea, LocalDateTime startTime, LocalDateTime endTime);
    
    long countByParkingAreaAndIsAvailableTrue(ParkingArea parkingArea);
    
    @Query("SELECT COUNT(ps) FROM ParkingSlot ps WHERE ps.parkingArea = :parkingArea")
    long getTotalSlotCount(ParkingArea parkingArea);
}