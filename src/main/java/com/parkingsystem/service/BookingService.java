package com.parkingsystem.service;

import com.parkingsystem.entity.*;
import com.parkingsystem.repository.BookingRepository;
import com.parkingsystem.repository.ParkingSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final WalletService walletService;

    @Value("${parking.slot.rate}")
    private BigDecimal parkingRate;

    @Value("${parking.slot.duration.hours}")
    private int slotDurationHours;

    @Transactional
    public Booking createBooking(User user, ParkingSlot parkingSlot) {
        validateBooking(user, parkingSlot);

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endTime = now.plusHours(slotDurationHours);

        // Process payment
        walletService.processPayment(user.getWallet(), parkingRate);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setParkingSlot(parkingSlot);
        booking.setBookingDateTime(now);
        booking.setStartTime(now);
        booking.setEndTime(endTime);
        booking.setAmount(parkingRate);
        booking.setStatus("ACTIVE");
        booking.setQrCode(generateQRCode());
        booking.setIsActive(true);

        parkingSlot.setIsAvailable(false);
        parkingSlotRepository.save(parkingSlot);

        return bookingRepository.save(booking);
    }

    private void validateBooking(User user, ParkingSlot parkingSlot) {
        // Check if user already has active booking
        if (hasActiveBooking(user)) {
            throw new IllegalStateException("User already has an active booking");
        }

        // Check if slot is available
        if (!parkingSlot.getIsAvailable()) {
            throw new IllegalStateException("Parking slot is not available");
        }

        // Check for same day booking
        if (hasBookingForToday(user)) {
            throw new IllegalStateException("User already has a booking for today");
        }

        // Check wallet balance
        if (walletService.getBalance(user.getWallet()).compareTo(parkingRate) < 0) {
            throw new IllegalStateException("Insufficient wallet balance");
        }
    }

    public List<Booking> findByUserAndIsActiveTrue(User user) {
        return bookingRepository.findByUserAndIsActiveTrue(user);
    }

    private boolean hasActiveBooking(User user) {
        return !bookingRepository.findByUserAndIsActiveTrue(user).isEmpty();
    }

    private boolean hasBookingForToday(User user) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        return bookingRepository.countActiveSameDayBookings(user, startOfDay) > 0;
    }

    private String generateQRCode() {
        return UUID.randomUUID().toString();
    }

    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUserOrderByBookingDateTimeDesc(user);
    }

    @Transactional
    public void completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        
        booking.setStatus("COMPLETED");
        booking.setIsActive(false);
        
        // Make the slot available again
        ParkingSlot slot = booking.getParkingSlot();
        slot.setIsAvailable(true);
        parkingSlotRepository.save(slot);
        
        bookingRepository.save(booking);
    }
    public List<Booking> getAllActiveBookings() {
        return bookingRepository.findByIsActiveTrue();
    }

    public List<Booking> getAllPastBookings() {
        return bookingRepository.findByIsActiveFalse();
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}