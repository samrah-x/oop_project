package com.parkingsystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String googleId;
    private String email;
    private String name;
    private String role;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Wallet wallet;
    
    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;
}