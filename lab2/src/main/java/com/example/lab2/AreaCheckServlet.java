package com.example.lab2;

import com.example.lab2.util.Result;
import com.example.lab2.util.SentData;
import com.example.lab2.util.Variables;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Reader;
import java.time.LocalDateTime;

@WebServlet(
        name = "AreaCheckServlet",
        value = {"/AreaCheckServlet"}
)
public class AreaCheckServlet extends HttpServlet {
    public AreaCheckServlet() {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long time = System.nanoTime();
        SentData sentData = this.getData(request.getReader());
        if (sentData == null) {
            response.getWriter().println("Данные некоректны");
        } else if (sentData.isClear()) {
            this.getServletContext().setAttribute(Variables.TABLE_NAME, "");
            this.getServletContext().setAttribute(Variables.DOTS_NAME, "");
        } else {
            if (sentData.isDots()) {
                response.getWriter().println(this.getServletContext().getAttribute(Variables.DOTS_NAME));
            }

            if (this.validateData(sentData)) {
                Result result = new Result(LocalDateTime.now(), (int)(System.nanoTime() - time), sentData.getX(), sentData.getY(), sentData.getR(), this.isHit(sentData.getX(), sentData.getY(), sentData.getR()) ? "Попадание" : "Промах", sentData.isByClick());
                this.getServletContext().setAttribute(Variables.TABLE_NAME, this.getServletContext().getAttribute(Variables.TABLE_NAME) + result.toHTML());
                this.getServletContext().setAttribute(Variables.DOTS_NAME, sentData.getCanvas());
                response.getWriter().println(this.getServletContext().getAttribute(Variables.TABLE_NAME));
            }
        }
    }

    private SentData getData(Reader reader) {
        try {
            return (SentData)(new Gson()).fromJson(reader, SentData.class);
        } catch (Exception var3) {
            return null;
        }
    }

    private boolean checkX(double x) {
        return Variables.X_VALUES.contains(x);
    }

    private boolean checkY(double y) {
        return y > Variables.MIN_Y && y < Variables.MAX_Y;
    }

    private boolean checkR(double r) {
        return Variables.R_VALUES.contains(r);
    }

    private boolean validateData(SentData sentData) {
        if (sentData == null) {
            return false;
        } else {
            return this.checkX(sentData.getX()) && this.checkY(sentData.getY()) && this.checkR(sentData.getR()) || sentData.isByClick();
        }
    }

    boolean isHit(double x, double y, double r) {
        return this.checkCircle(x, y, r) || this.checkLinear(x, y, r) || this.checkSquare(x, y, r);
    }

    boolean checkLinear(double x, double y, double r) {
        return x >= 0.0 && y >= 0.0 && y <= -x / 2.0 + r / 2.0;
    }

    boolean checkCircle(double x, double y, double r) {
        return x >= 0.0 && y <= 0.0 && x * x + y * y <= r * r / 4.0;
    }

    boolean checkSquare(double x, double y, double r) {
        return x <= 0.0 && y <= 0.0 && x >= -r && y >= -r;
    }
}