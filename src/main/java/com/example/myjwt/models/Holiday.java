package com.example.myjwt.models;

import com.example.myjwt.models.enm.ECalenderMonth;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "Holidays")
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer year;

    @Enumerated
    private ECalenderMonth month;

    private Integer day;

    private String city;
}
