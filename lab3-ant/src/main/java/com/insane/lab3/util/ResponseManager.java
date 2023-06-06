package com.insane.lab3.util;

public class ResponseManager {
    private static boolean checkLinear(double x, double y, double r) {
        return x >= 0.0 && y <= 0.0 && y >= x - r / 2.0;
    }

    private static boolean checkCircle(double x, double y, double r) {
        return x >= 0.0 && y >= 0.0 && x * x + y * y <= r * r / 4.0;
    }

    private static boolean checkSquare(double x, double y, double r) {
        return x <= 0.0 && y <= 0.0 && x >= -r && y >= -r;
    }

    public static String answer(double x, double y, double r) {
        return (checkCircle(x, y, r) || checkLinear(x, y, r) || checkSquare(x, y, r)) ?
                "Success" : "Miss";
    }
}
