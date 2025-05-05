package com.parkingsystem.dto;

import com.parkingsystem.entity.Transaction;
import com.parkingsystem.entity.Wallet;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class WalletResponse {
    private Long id;
    private BigDecimal balance;
    private List<TransactionDto> transactions;

    @Data
    public static class TransactionDto {
        private Long id;
        private String transactionType;
        private String paymentMethod;
        private BigDecimal amount;
        private LocalDateTime timestamp;
        private String status;
        private String reference;

        public static TransactionDto fromEntity(Transaction transaction) {
            TransactionDto dto = new TransactionDto();
            dto.setId(transaction.getId());
            dto.setTransactionType(transaction.getTransactionType());
            dto.setPaymentMethod(transaction.getPaymentMethod());
            dto.setAmount(transaction.getAmount());
            dto.setTimestamp(transaction.getTimestamp());
            dto.setStatus(transaction.getStatus());
            dto.setReference(transaction.getReference());
            return dto;
        }
    }

    public static WalletResponse fromEntity(Wallet wallet, List<Transaction> transactions) {
        WalletResponse response = new WalletResponse();
        response.setId(wallet.getId());
        response.setBalance(wallet.getBalance());
        response.setTransactions(
            transactions.stream()
                .map(TransactionDto::fromEntity)
                .collect(Collectors.toList())
        );
        return response;
    }
}