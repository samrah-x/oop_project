package com.parkingsystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    private String transactionType;  // TOP_UP, PAYMENT
    private String paymentMethod;    // EASYPAISA, JAZZCASH
    private BigDecimal amount;
    private LocalDateTime timestamp;
    private String status;           // SUCCESS, FAILED, PENDING
    private String reference;        // External payment reference
}