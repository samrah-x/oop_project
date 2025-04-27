package com.parkingshistem.oopproject00.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String role;

}
