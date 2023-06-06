package com.insane.lab3.bean;

import com.google.gson.GsonBuilder;
import com.insane.lab3.util.Point;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Named
public class ResultsBean implements Serializable {
    @Inject
    DBean dBean;

    @PostConstruct
    public void postInit() {
        results.addAll(dBean.getPoints());
    }

    private List<Point> results = new ArrayList<>();

    public void newPoint(Point point) {
        if (dBean.savePoint(point)) {
            results.add(point);
        }
    }

    public List<Point> getResults() {
        return results;
    }

    public void setResults(List<Point> results) {
        this.results = results;
    }

    public String jsonData() {
        return new GsonBuilder().create().toJson(results.toArray());
    }
}
