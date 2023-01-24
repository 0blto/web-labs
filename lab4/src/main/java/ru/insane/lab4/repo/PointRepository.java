package ru.insane.lab4.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.insane.lab4.domain.Point;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByOwner(String owner);
    Point findTopByOwnerOrderByIdDesc(String owner);

    @Transactional
    void deleteAllByOwner(String owner);
}
