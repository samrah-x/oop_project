package com.parkingshistem.oopproject00.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ADMIN")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Admin extends User {
    private String role;
}
