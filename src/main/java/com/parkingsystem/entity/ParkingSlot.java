package com.parkingsystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "parking_slots")
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parking_area_id")
    private ParkingArea parkingArea;

    private String slotNumber;
    private Boolean isAvailable;
    private String vehicleType; // CARS_ONLY as per requirement

    @OneToMany(mappedBy = "parkingSlot")
    private List<Booking> bookings;
}