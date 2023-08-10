package com.kiwobackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name="form_submission")
@Getter
@Setter
//@Data- known error
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="betreff")
    private String betreff;
    @Column(name="vorname")
    private String vorname;
    @Column(name="nachname")
    private String nachname;
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
    @Column(name="nachricht")
    private String nachricht;
    @Column(name = "montag")
    private boolean montag;
    @Column(name = "dienstag")
    private boolean dienstag;
    @Column(name = "mittwoch")
    private boolean mittwoch;
    @Column(name = "donnerstag")
    private boolean donnerstag;
    @Column(name = "freitag")
    private boolean freitag;
    @Column(name="fahrdienst")
    private String fahrdienst;
    @Column(name="zvieri")
    private String zvieri;
    @Column(name = "fotoserlaubnis")
    private String fotoserlaubnis;
    @Column(name = "verbindlich")
    private String verbindlich;
    @Transient
    private MultipartFile signatureImageFile;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "signatureImage", columnDefinition = "MEDIUMBLOB")
    private byte[] signatureImage;
}
