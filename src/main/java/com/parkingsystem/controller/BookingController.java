package com.parkingsystem.controller;

import com.parkingsystem.dto.BookingRequest;
import com.parkingsystem.dto.BookingResponse;
import com.parkingsystem.entity.Booking;
import com.parkingsystem.entity.ParkingSlot;
import com.parkingsystem.entity.User;
import com.parkingsystem.service.BookingService;
import com.parkingsystem.service.ParkingService;
import com.parkingsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Tag(name = "Booking Operations", description = "Endpoints for managing parking slot bookings")
@SecurityRequirement(name = "bearerAuth")
public class BookingController {
    private final BookingService bookingService;
    private final ParkingService parkingService;
    private final UserService userService;

    @PostMapping
    @Operation(
        summary = "Create a new booking",
        description = "Creates a new booking for a parking slot. User must have sufficient wallet balance."
    )
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = BookingResponse.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request or business rule violation")
    @ApiResponse(responseCode = "404", description = "Parking slot not found")
    public ResponseEntity<?> createBooking(
            @Valid @RequestBody BookingRequest request,
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        ParkingSlot slot = parkingService.findSlotById(request.getParkingSlotId())
                .orElseThrow(() -> new IllegalArgumentException("Parking slot not found"));

        try {
            Booking booking = bookingService.createBooking(user, slot);
            return ResponseEntity.ok(BookingResponse.fromEntity(booking));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user")
    @Operation(
        summary = "Get user's bookings",
        description = "Retrieves all bookings made by the authenticated user"
    )
    public ResponseEntity<?> getUserBookings(
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<BookingResponse> bookings = bookingService.getUserBookings(user)
                .stream()
                .map(BookingResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/active")
    @Operation(
        summary = "Get user's active booking",
        description = "Retrieves the currently active booking for the authenticated user"
    )
    public ResponseEntity<?> getActiveBooking(
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Booking> activeBookings = bookingService.findByUserAndIsActiveTrue(user);
        return ResponseEntity.ok(activeBookings.isEmpty() ? 
                null : BookingResponse.fromEntity(activeBookings.get(0)));
    }

    @PostMapping("/{bookingId}/complete")
    @Operation(
        summary = "Complete a booking",
        description = "Marks a booking as completed and makes the parking slot available again"
    )
    public ResponseEntity<?> completeBooking(
            @PathVariable Long bookingId,
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        try {
            bookingService.completeBooking(bookingId);
            return ResponseEntity.ok(Map.of("message", "Booking completed successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}