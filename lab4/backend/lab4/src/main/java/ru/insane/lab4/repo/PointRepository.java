package ru.insane.lab4.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.insane.lab4.domain.Point;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByOwner(String owner);
}
