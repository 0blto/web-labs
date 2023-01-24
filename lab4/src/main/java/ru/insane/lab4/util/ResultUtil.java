package ru.insane.lab4.util;

import org.springframework.stereotype.Component;

@Component
public class ResultUtil {
    private boolean checkRect(double x, double y, double r) {
        return x >= 0 && y >= 0 && y < r && x < r/2;
    }

    private boolean checkLinear(double x, double y, double r) {
        return x <= 0 && y >= 0 && y < (x + r) / 2;
    }

    private boolean checkCircle(double x, double y, double r) {
        return x >= 0 && y <= 0 && x * x + y * y < r * r / 4;
    }

    public String check(double x, double y, double r) {
        return checkCircle(x, y, r) || checkRect(x, y, r) || checkLinear(x, y, r) ? "Попадание" : "Промах";
    }
}
