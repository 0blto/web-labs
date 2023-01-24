package ru.insane.lab4.domain;


import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Builder
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    double x, y, r;

    String owner, time, result;

    public Point() {

    }
}
