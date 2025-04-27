package com.parkingshistem.oopproject00.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("CUSTOMER")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends User{
    private String carNumber;
    private String carModel;
    private String licensePlate;
    private double walletBalance;

    // books slot
}
