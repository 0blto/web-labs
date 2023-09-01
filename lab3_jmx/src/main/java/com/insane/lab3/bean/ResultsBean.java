package com.insane.lab3.bean;

import com.google.gson.GsonBuilder;
import com.insane.lab3.bean.interfaces.ResultsMXBean;
import com.insane.lab3.util.JMXUtil;
import com.insane.lab3.util.Point;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.Destroyed;
import jakarta.enterprise.context.Initialized;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import javax.management.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@ApplicationScoped
@Named
public class ResultsBean extends NotificationBroadcasterSupport implements Serializable, ResultsMXBean {
    long sequenceNumber = 1;
    @Inject
    DBean dBean;

    public void init(@Observes @Initialized(ApplicationScoped.class) Object unused) {
        results.addAll(dBean.getPoints());
        JMXUtil.registerBean(this, "main");
    }

    public void destroy(@Observes @Destroyed(ApplicationScoped.class) Object unused) {
        JMXUtil.unregisterBean(this);
    }

    private List<Point> results = new CopyOnWriteArrayList<>();

    public void newPoint(Point point) {
        if (dBean.savePoint(point)) {
            results.add(point);

            if (results.size() % 10 == 0) {
                Notification notification = new Notification(
                        "Number mods 10",
                        getClass().getSimpleName(),
                        sequenceNumber++,
                        String.format("Number of points - %s", results.size())
                );
                sendNotification(notification);
            }
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

    @Override
    public long getAllPoints() {
        return results.size();
    }

    @Override
    public long getMissedPoints() {
        return results.stream().filter(point -> point.getIsHit().equals("Промах")).count();
    }

    @Override
    public MBeanNotificationInfo[] getNotificationInfo() {
        String[] types = new String[] { AttributeChangeNotification.ATTRIBUTE_CHANGE };
        String name = AttributeChangeNotification.class.getName();
        String description = "The points number mods 10.";
        MBeanNotificationInfo info = new MBeanNotificationInfo(types, name, description);
        return new MBeanNotificationInfo[] { info };
    }


}
