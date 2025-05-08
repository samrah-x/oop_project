package com.parkingsystem.controller;

import com.parkingsystem.entity.Booking;
import com.parkingsystem.entity.User;
import com.parkingsystem.service.BookingService;
import com.parkingsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {
    private final BookingService bookingService;
    private final UserService userService;

    @GetMapping("/active")
    public ResponseEntity<?> getActiveBookings(@AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        List<Booking> activeBookings = bookingService.getAllActiveBookings();
        return ResponseEntity.ok(activeBookings);
    }

    @GetMapping("/past")
    public ResponseEntity<?> getPastBookings(@AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        List<Booking> pastBookings = bookingService.getAllPastBookings();
        return ResponseEntity.ok(pastBookings);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings(@AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        List<Booking> allBookings = bookingService.getAllBookings();
        return ResponseEntity.ok(allBookings);
    }
}