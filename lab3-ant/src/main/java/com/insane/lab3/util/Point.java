package com.insane.lab3.util;



import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.util.Date;
@Entity
@Table(name = "points")
public class Point {
    private double x;
    private double y;
    private double r;
    private String isHit;
    private String now;

    @Id
    @SequenceGenerator(name = "sequence_generator", sequenceName = "id_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_generator")
    private int id;

    public Point() {
    }

    public Point(double x, double y, double r, String isHit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.now = new SimpleDateFormat("dd.MM.yy HH:mm:ss")
                .format(new Date(System.currentTimeMillis()));
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setIsHit(String isHit) {
        this.isHit = isHit;
    }

    public void setNow(String now) {
        this.now = now;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
    public String getNow() {return now;}

    public String getIsHit() {return isHit;}

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }
}
