package com.parkingsystem.dto;

import com.parkingsystem.entity.Booking;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingResponse {
    private Long id;
    private LocalDateTime bookingDateTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private BigDecimal amount;
    private String qrCode;
    private boolean isActive;
    
    // Parking slot details
    private String slotNumber;
    private String parkingAreaName;
    private String parkingAreaLocation;

    public static BookingResponse fromEntity(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setBookingDateTime(booking.getBookingDateTime());
        response.setStartTime(booking.getStartTime());
        response.setEndTime(booking.getEndTime());
        response.setStatus(booking.getStatus());
        response.setAmount(booking.getAmount());
        response.setQrCode(booking.getQrCode());
        response.setActive(booking.getIsActive());
        
        // Set parking slot details
        response.setSlotNumber(booking.getParkingSlot().getSlotNumber());
        response.setParkingAreaName(booking.getParkingSlot().getParkingArea().getName());
        response.setParkingAreaLocation(booking.getParkingSlot().getParkingArea().getLocation());
        
        return response;
    }
}