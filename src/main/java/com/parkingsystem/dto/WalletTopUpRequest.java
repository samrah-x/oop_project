package com.parkingsystem.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class WalletTopUpRequest {
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotNull(message = "Payment method is required")
    @Pattern(regexp = "^(EASYPAISA|JAZZCASH)$", message = "Payment method must be either EASYPAISA or JAZZCASH")
    private String paymentMethod;
}