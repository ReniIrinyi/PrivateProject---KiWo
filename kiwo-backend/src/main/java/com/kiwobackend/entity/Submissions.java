package com.kiwobackend.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="form_submissions")
@Getter
@Setter
//@Data- known error
public class Submissions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="anmeldung")
    private String anmeldung;
    @Column(name="nameDesKindes")
    private String nameDesKindes;
    @Column(name="vorname")
    private String vorname;
    @Column(name="geburtsdatum")
    private String geburtsdatum;
    @Column(name="klasse")
    private String klasse;
    @Column(name="anschrift")
    private String anschrift;
    @Column(name="wohnort")
    private String wohnort;
    @Column(name="email")
    private String email;
    @Column(name="telefon")
    private String telefon;
    @Column(name="nachricht", length = 1000)
    private String nachricht;
    @Column(name="tag")
    private List<String> tag;
    @Column(name="fahrdienst")
    private String fahrdienst;
    @Column(name="zvieri")
    private String zvieri;
    @Column(name="veroeffentlichungFotos")
    private String veroeffentlichungFotos;
    @Column(name="verbindlichAngemeldet")
    private String verbindlichAngemeldet;
}
