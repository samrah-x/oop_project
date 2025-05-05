package com.parkingsystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingRequest {
    @NotNull(message = "Parking slot ID is required")
    private Long parkingSlotId;

    private LocalDateTime startTime = LocalDateTime.now();
}