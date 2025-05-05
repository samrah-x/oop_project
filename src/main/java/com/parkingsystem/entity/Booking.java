package com.parkingsystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "parking_slot_id")
    private ParkingSlot parkingSlot;

    private LocalDateTime bookingDateTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;    // 12 hours from start time
    private String status;            // PENDING, ACTIVE, COMPLETED, CANCELLED
    private BigDecimal amount;        // Fixed Rs.50 as per requirement
    private String qrCode;            // Generated QR code for parking access
    private Boolean isActive;
}