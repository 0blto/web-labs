package com.example.lab2;

import com.example.lab2.util.Variables;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(
        name = "ControllerServlet",
        value = {"/control"}
)
public class ControllerServlet extends HttpServlet {
    public ControllerServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.initContext();
        this.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        this.getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
    }

    private void initContext() {
        if (this.getServletContext().getAttribute(Variables.TABLE_NAME) == null) {
            this.getServletContext().setAttribute(Variables.TABLE_NAME, "");
        }

        if (this.getServletContext().getAttribute(Variables.DOTS_NAME) == null) {
            this.getServletContext().setAttribute(Variables.DOTS_NAME, "");
        }

    }
}