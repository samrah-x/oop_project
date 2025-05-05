package com.parkingsystem.service;

import com.parkingsystem.entity.Transaction;
import com.parkingsystem.entity.Wallet;
import com.parkingsystem.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final TransactionRepository transactionRepository;

    @Transactional
    public void processPayment(Wallet wallet, BigDecimal amount) {
        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new IllegalStateException("Insufficient balance");
        }

        wallet.setBalance(wallet.getBalance().subtract(amount));
        
        Transaction transaction = new Transaction();
        transaction.setWallet(wallet);
        transaction.setTransactionType("PAYMENT");
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus("SUCCESS");
        transaction.setReference(generateTransactionReference());
        
        transactionRepository.save(transaction);
    }

    @Transactional
    public void topUp(Wallet wallet, BigDecimal amount, String paymentMethod) {
        wallet.setBalance(wallet.getBalance().add(amount));
        
        Transaction transaction = new Transaction();
        transaction.setWallet(wallet);
        transaction.setTransactionType("TOP_UP");
        transaction.setPaymentMethod(paymentMethod);
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus("SUCCESS");
        transaction.setReference(generateTransactionReference());
        
        transactionRepository.save(transaction);
    }

    public BigDecimal getBalance(Wallet wallet) {
        return wallet.getBalance();
    }

    public List<Transaction> getTransactionHistory(Wallet wallet) {
        return transactionRepository.findByWalletOrderByTimestampDesc(wallet);
    }

    private String generateTransactionReference() {
        return "TXN" + System.currentTimeMillis();
    }
}