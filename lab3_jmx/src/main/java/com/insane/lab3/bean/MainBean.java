package com.insane.lab3.bean;


import com.insane.lab3.bean.interfaces.SMXBean;
import com.insane.lab3.util.JMXUtil;
import com.insane.lab3.util.Point;
import com.insane.lab3.util.ResponseManager;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.Destroyed;
import jakarta.enterprise.context.Initialized;
import jakarta.enterprise.context.SessionScoped;
import jakarta.enterprise.event.Observes;
import jakarta.faces.context.FacesContext;
import jakarta.faces.event.ValueChangeEvent;
import jakarta.inject.Inject;
import jakarta.inject.Named;


import javax.management.NotificationBroadcasterSupport;
import java.io.Serializable;
import java.util.*;


import java.util.stream.DoubleStream;

@Named
@ApplicationScoped
public class MainBean implements Serializable, SMXBean {
    public MainBean() {

    }

    @Inject
    ResultsBean resultsBean;

    public void init(@Observes @Initialized(ApplicationScoped.class) Object unused) {
        JMXUtil.registerBean(this, "main");
    }

    public void destroy(@Observes @Destroyed(ApplicationScoped.class) Object unused) {
        JMXUtil.unregisterBean(this);
    }


    private double selectedYItem;
    private final List<Double> itemsR = new ArrayList<>();

    private final Map<Double, Boolean> itemsX = new HashMap<>();

    private Double selectedRItem;


    @PostConstruct
    public void postInit() {
        DoubleStream.of(1, 1.5, 2, 2.5, 3).forEach(itemsR::add);
        DoubleStream.of(-5, -4, -3, -2, -1, 0, 1).forEach(item -> itemsX.put(item, false));
        selectedRItem = 1.0;
    }

    public void xChange(ValueChangeEvent event) {
        double index = Double.parseDouble(String.valueOf(event.getComponent().getAttributes().get("name")).replace("x", ""));
        itemsX.replace(index, (Boolean) event.getNewValue());
    }
    public double getSelectedYItem() {
        return selectedYItem;
    }

    public void setSelectedYItem(double selectedItem) {
        this.selectedYItem = selectedItem;
    }
    public Double getSelectedRItem() {
        return selectedRItem;
    }

    public void setSelectedRItem(Double selectedItem) {
        this.selectedRItem = selectedItem;
    }

    public List<Double> getItemsR() {
        return itemsR;
    }

    public void newRequest() {

        for (Double i : itemsX.keySet()) {
            if (itemsX.get(i)) {
                Point point = new Point(i, selectedYItem, selectedRItem, ResponseManager.answer(i,
                        selectedYItem, selectedRItem));


                resultsBean.newPoint(point);
            }
        }


    }


    public void newCanvasRequest() {
        Map<String, String> values = FacesContext.getCurrentInstance()
                .getExternalContext().getRequestParameterMap();
        double x = Double.parseDouble(values.get("x")),
                y = Double.parseDouble(values.get("y")),
                r = Double.parseDouble(values.get("r"));
        Point point = new Point(x, y, r, ResponseManager.answer(x,
                y, r));

        resultsBean.newPoint(point);

    }













    //just to view in xhtml
    private boolean x1 = false;
    private boolean x2 = false;
    private boolean x3 = false;
    private boolean x4 = false;
    private boolean x5 = false;
    private boolean x6 = false;
    private boolean x7 = false;

    public boolean isX1() {
        return x1;
    }

    public void setX1(boolean x1) {
        this.x1 = x1;
    }

    public boolean isX2() {
        return x2;
    }

    public void setX2(boolean x2) {
        this.x2 = x2;
    }

    public boolean isX3() {
        return x3;
    }

    public void setX3(boolean x3) {
        this.x3 = x3;
    }

    public boolean isX4() {
        return x4;
    }

    public void setX4(boolean x4) {
        this.x4 = x4;
    }

    public boolean isX5() {
        return x5;
    }

    public void setX5(boolean x5) {
        this.x5 = x5;
    }

    public boolean isX6() {
        return x6;
    }

    public void setX6(boolean x6) {
        this.x6 = x6;
    }

    public boolean isX7() {
        return x7;
    }

    public void setX7(boolean x7) {
        this.x7 = x7;
    }

    @Override
    public double getCurrentSize() {
        return 1.5 * selectedRItem + (Math.pow(selectedRItem, 2) * Math.PI) / 4;
    }
}
