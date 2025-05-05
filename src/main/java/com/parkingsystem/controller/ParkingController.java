package com.parkingsystem.controller;

import com.parkingsystem.entity.ParkingArea;
import com.parkingsystem.entity.User;
import com.parkingsystem.service.ParkingService;
import com.parkingsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/parking")
@RequiredArgsConstructor
public class ParkingController {
    private final ParkingService parkingService;
    private final UserService userService;

    @PostMapping("/areas")
    public ResponseEntity<?> createParkingArea(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal OAuth2User principal) {
        
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        String name = (String) request.get("name");
        String location = (String) request.get("location");
        Integer totalSlots = (Integer) request.get("totalSlots");

        if (name == null || location == null || totalSlots == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        ParkingArea parkingArea = parkingService.createParkingArea(name, location, totalSlots);
        return ResponseEntity.ok(parkingArea);
    }

    @GetMapping("/areas")
    public ResponseEntity<?> getAllParkingAreas() {
        return ResponseEntity.ok(parkingService.getAllActiveParkingAreas());
    }

    @DeleteMapping("/areas/{areaId}")
    public ResponseEntity<?> deactivateParkingArea(
            @PathVariable Long areaId,
            @AuthenticationPrincipal OAuth2User principal) {
        
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        parkingService.deactivateParkingArea(areaId);
        return ResponseEntity.ok(Map.of("message", "Parking area deactivated successfully"));
    }

    @PatchMapping("/slots/{slotId}")
    public ResponseEntity<?> updateSlotStatus(
            @PathVariable Long slotId,
            @RequestBody Map<String, Boolean> request,
            @AuthenticationPrincipal OAuth2User principal) {
        
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        Boolean isAvailable = request.get("isAvailable");
        if (isAvailable == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing isAvailable field"));
        }

        parkingService.updateSlotStatus(slotId, isAvailable);
        return ResponseEntity.ok(Map.of("message", "Slot status updated successfully"));
    }
}