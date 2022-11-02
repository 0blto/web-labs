package com.example.lab2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;


@WebServlet(
        name = "ControllerServlet",
        value = {"/control"}
)
public class ControllerServlet extends HttpServlet {
    public ControllerServlet() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Enumeration<String> enumeration = request.getHeaderNames();

        while (enumeration.hasMoreElements()) {
            if ((enumeration.nextElement()).equals("dots")) {
                if (request.getHeader("dots").equals("true")) {
                    this.getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
                } else {
                    return;
                }
            }

        }
        this.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        this.getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
    }


}