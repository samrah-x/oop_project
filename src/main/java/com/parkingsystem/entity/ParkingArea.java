package com.parkingsystem.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "parking_areas")
public class ParkingArea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private Integer totalSlots;
    private Boolean isActive;
    
    @OneToMany(mappedBy = "parkingArea", cascade = CascadeType.ALL)
    private List<ParkingSlot> parkingSlots;
}