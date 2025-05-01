package com.parkingshistem.oopproject00.Repositories;

import com.parkingshistem.oopproject00.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    List<Booking> findByUserAndStatus(User user, Booking.BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId AND (b.status = 'ACTIVE' OR b.status = 'CONFIRMED')")
    List<Booking> findActiveBookingsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.user.id = :userId AND (b.status = 'ACTIVE')")
    long countActiveBookingsByUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM Booking b WHERE b.startTime >= :startOfDay AND b.startTime < :endOfDay")
    List<Booking> findBookingsForDay(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT b FROM Booking b WHERE b.parkingSlot.id = :slotId AND :bookingTime BETWEEN b.startTime AND b.endTime")
    List<Booking> findOverlappingBookings(@Param("slotId") Long slotId, @Param("bookingTime") LocalDateTime bookingTime);
}