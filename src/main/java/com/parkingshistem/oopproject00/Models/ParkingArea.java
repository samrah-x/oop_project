package com.parkingshistem.oopproject00.Models;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "parking_areas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParkingArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String description;

    @Column(name = "total_slots")
    private Integer totalSlots;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToMany(mappedBy = "parkingArea", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParkingSlot> parkingSlots = new HashSet<>();

    // Helper method to add a parking slot
    public void addParkingSlot(ParkingSlot parkingSlot) {
        parkingSlots.add(parkingSlot);
        parkingSlot.setParkingArea(this);
    }

    // Helper method to remove a parking slot
    public void removeParkingSlot(ParkingSlot parkingSlot) {
        parkingSlots.remove(parkingSlot);
        parkingSlot.setParkingArea(null);
    }
}