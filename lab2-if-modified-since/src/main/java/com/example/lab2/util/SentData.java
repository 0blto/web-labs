package com.example.lab2.util;

public class SentData {
    double x;
    double y;
    double r;
    double realX;
    double realY;
    boolean byClick;
    boolean clear;
    boolean dots;
    String canvas;

    public SentData() {
    }

    public String getCanvas() {
        return canvas;
    }

    public boolean isDots() {
        return this.dots;
    }

    public boolean isClear() {
        return this.clear;
    }

    public double getX() {
        return this.x;
    }

    public double getRealX() {
        return this.realX;
    }

    public double getRealY() {
        return this.realY;
    }

    public double getY() {
        return this.y;
    }

    public double getR() {
        return this.r;
    }

    public boolean isByClick() {
        return this.byClick;
    }
}