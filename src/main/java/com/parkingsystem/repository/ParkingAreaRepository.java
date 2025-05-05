package com.parkingsystem.repository;

import com.parkingsystem.entity.ParkingArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ParkingAreaRepository extends JpaRepository<ParkingArea, Long> {
    List<ParkingArea> findByIsActiveTrue();
    
    @Query("SELECT pa FROM ParkingArea pa WHERE pa.isActive = true " +
           "AND EXISTS (SELECT ps FROM ParkingSlot ps WHERE ps.parkingArea = pa AND ps.isAvailable = true)")
    List<ParkingArea> findAreasWithAvailableSlots();
    
    boolean existsByNameAndLocation(String name, String location);
}