package com.parkingsystem.repository;

import com.parkingsystem.entity.Booking;
import com.parkingsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserAndIsActiveTrue(User user);
    
    @Query("SELECT b FROM Booking b WHERE b.parkingSlot.id = :slotId " +
           "AND b.startTime <= :endTime AND b.endTime >= :startTime")
    List<Booking> findOverlappingBookings(Long slotId, LocalDateTime startTime, LocalDateTime endTime);
    
    List<Booking> findByUserOrderByBookingDateTimeDesc(User user);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.user = :user " +
           "AND b.startTime >= :startDate AND b.isActive = true")
    long countActiveSameDayBookings(User user, LocalDateTime startDate);
}