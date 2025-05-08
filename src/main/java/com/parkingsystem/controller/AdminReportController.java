package com.parkingsystem.controller;

import com.parkingsystem.entity.User;
import com.parkingsystem.service.ReportService;
import com.parkingsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class AdminReportController {
    private final ReportService reportService;
    private final UserService userService;

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueReport(@AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        Map<String, Object> report = reportService.getRevenueReport();
        return ResponseEntity.ok(report);
    }

    @GetMapping("/occupancy")
    public ResponseEntity<?> getOccupancyReport(@AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!userService.isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }

        Map<String, Object> report = reportService.getOccupancyReport();
        return ResponseEntity.ok(report);
    }
}