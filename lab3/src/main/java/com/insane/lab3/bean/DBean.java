package com.insane.lab3.bean;

import com.insane.lab3.util.Point;
import jakarta.enterprise.context.SessionScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@SessionScoped
public class DBean implements Serializable {



    static final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("database");


    public List<Point> getPoints() {
        List<Point> results = new ArrayList<>();
        initTransaction(manager -> results.addAll(manager
                .createQuery("SELECT point FROM Point point", Point.class)
                .getResultList()
        ));
        return results;
    }

    public boolean savePoint(Point point) {
        try {
            initTransaction(em -> em.persist(point));
        } catch (Exception e) {
            return false;
        }
        return true;
    }


    private void initTransaction(Consumer<EntityManager> transaction) {
        EntityManager manager = entityManagerFactory.createEntityManager();
        try {
            manager.getTransaction().begin();
            transaction.accept(manager);
            manager.getTransaction().commit();
        } catch (Exception ex) {
            if (manager.getTransaction().isActive()) {
                manager.getTransaction().rollback();
            }
            ex.printStackTrace();
        } finally {
            manager.close();
        }
    }
}
