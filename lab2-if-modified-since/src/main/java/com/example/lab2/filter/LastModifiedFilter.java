package com.example.lab2.filter;

import com.example.lab2.util.Variables;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;

public class LastModifiedFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        initContext((HttpServletRequest) request);
        HttpServletResponse resp = (HttpServletResponse) response;
        Enumeration<String> enumeration = ((HttpServletRequest) request).getHeaderNames();



        while (enumeration.hasMoreElements()) {
            if ((enumeration.nextElement()).equals("If-Modified-Since")) {
                ZonedDateTime zdt = ZonedDateTime.parse(((HttpServletRequest) request).getHeader("If-Modified-Since"), DateTimeFormatter.RFC_1123_DATE_TIME);
                if (zdt.compareTo(ZonedDateTime.parse(request.getServletContext().getAttribute(Variables.LAST_MODIFIED).toString())) > 0) {
                    resp.setStatus(304);
                    resp.getWriter().println("Not Modified");
                    return;
                }
            }

        }

        chain.doFilter(request, resp);

    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }

    private void initContext(HttpServletRequest request) {
        if (request.getServletContext().getAttribute(Variables.TABLE_NAME) == null) {
            request.getServletContext().setAttribute(Variables.TABLE_NAME, "");
        }

        if (request.getServletContext().getAttribute(Variables.DOTS_NAME) == null) {
            request.getServletContext().setAttribute(Variables.DOTS_NAME, new ArrayList<>());
        }

        if (request.getServletContext().getAttribute(Variables.LAST_MODIFIED) == null) {
            request.getServletContext().setAttribute(Variables.LAST_MODIFIED, ZonedDateTime.now());
        }
    }
}
