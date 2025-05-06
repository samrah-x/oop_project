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
    
    @Column(unique = true)
    private String email;
    
    private String name;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<ParkingArea> managedParkingAreas;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> userBookings;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Wallet wallet;
    
    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;
}
