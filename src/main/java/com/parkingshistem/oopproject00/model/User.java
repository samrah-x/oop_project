package com.parkingshistem.oopproject00.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // Specifies single table inheritance
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING) // Discriminator column
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String googleId;

}
