package com.parkingshistem.oopproject00.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "parking_slots")
@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String slotNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParkingSlotStatus status;

    @ManyToOne
    @JoinColumn(name = "parking_area_id", nullable = false)
    private ParkingArea parkingArea;

    @OneToMany(mappedBy = "parkingSlot", cascade = CascadeType.ALL)
    private Set<Booking> bookings = new HashSet<>();

    public enum ParkingSlotStatus {
        AVAILABLE, OCCUPIED, MAINTENANCE
    }

    // Helper method to check if the slot is available
    public boolean isAvailable() {
        return status == ParkingSlotStatus.AVAILABLE;
    }

    // no clue why lombok won't add some getters and setters so here they are:
    public void setParkingArea(ParkingArea pA) {
        this.parkingArea = pA;
    }
}