package com.parkingsystem.repository;

import com.parkingsystem.entity.Transaction;
import com.parkingsystem.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByWalletOrderByTimestampDesc(Wallet wallet);
    List<Transaction> findByWalletAndTransactionType(Wallet wallet, String transactionType);
    List<Transaction> findByWalletAndStatus(Wallet wallet, String status);
}