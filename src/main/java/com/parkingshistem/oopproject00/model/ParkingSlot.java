package com.parkingshistem.oopproject00.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSlot {
    private Long slotId;    // for a primary key
    private char slotBlock; // for the 'H' in H15
    private int slotNumber; // for the slot number 15 in H15
    private boolean isAvailable;
    private int duration; // in minutes

    // book slot
    // check availability
}
