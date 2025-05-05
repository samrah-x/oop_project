package com.parkingsystem.controller;

import com.parkingsystem.dto.WalletTopUpRequest;
import com.parkingsystem.dto.WalletResponse;
import com.parkingsystem.entity.User;
import com.parkingsystem.service.UserService;
import com.parkingsystem.service.WalletService;
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

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User Operations", description = "Endpoints for user management and wallet operations")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    private final UserService userService;
    private final WalletService walletService;

    @GetMapping("/me")
    @Operation(
        summary = "Get current user",
        description = "Retrieves the currently authenticated user's information"
    )
    public ResponseEntity<?> getCurrentUser(
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");

        User user = userService.createOrUpdateUser(googleId, email, name);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/wallet")
    @Operation(
        summary = "Get wallet details",
        description = "Retrieves the user's wallet balance and transaction history"
    )
    public ResponseEntity<?> getWalletDetails(
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        WalletResponse response = WalletResponse.fromEntity(
            user.getWallet(),
            walletService.getTransactionHistory(user.getWallet())
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/wallet/topup")
    @Operation(
        summary = "Top up wallet",
        description = "Adds funds to the user's wallet using specified payment method"
    )
    @ApiResponse(responseCode = "200", description = "Wallet topped up successfully")
    @ApiResponse(responseCode = "400", description = "Invalid request or payment method")
    public ResponseEntity<?> topUpWallet(
            @Valid @RequestBody WalletTopUpRequest request,
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        try {
            walletService.topUp(user.getWallet(), request.getAmount(), request.getPaymentMethod());
            BigDecimal newBalance = walletService.getBalance(user.getWallet());
            
            return ResponseEntity.ok(Map.of(
                "message", "Wallet topped up successfully",
                "balance", newBalance
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/transactions")
    @Operation(
        summary = "Get transaction history",
        description = "Retrieves all wallet transactions for the user"
    )
    public ResponseEntity<?> getTransactionHistory(
            @Parameter(hidden = true) @AuthenticationPrincipal OAuth2User principal) {
        String googleId = principal.getAttribute("sub");
        User user = userService.findByGoogleId(googleId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return ResponseEntity.ok(walletService.getTransactionHistory(user.getWallet()));
    }
}