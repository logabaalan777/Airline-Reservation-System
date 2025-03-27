package com.airlineProj.AirLineReservationsSystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "passenger")
@PrimaryKeyJoinColumn(name = "id", referencedColumnName = "id")
public class Passenger extends User {

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(nullable = false, length = 15)
    private String contact;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false, length = 10)
    private String pincode;

    public Passenger() {
        super.setRole("PASSENGER");
    }

    public Passenger(String name, String email, String password, String gender, String contact, int age, String location, String pincode) {
        super(name, email, password, "PASSENGER");
        this.gender = gender;
        this.contact = contact;
        this.age = age;
        this.location = location;
        this.pincode = pincode;
    }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
}
