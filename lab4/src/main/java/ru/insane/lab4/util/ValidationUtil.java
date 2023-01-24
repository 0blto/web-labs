package ru.insane.lab4.util;

import org.springframework.stereotype.Component;

@Component
public class ValidationUtil {

    private boolean validateX(double x) {
        return x <= 3 && x >= -3;
    }

    private boolean validateY(double y) {
        return y <= 5 && y >= -5;
    }

    private boolean validateR(double r) {
        return r <= 3 && r >= -3;
    }

    public boolean validateData(double x, double y, double r) {
        return validateX(x) && validateY(y) && validateR(r);
    }
}
