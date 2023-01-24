package ru.insane.lab4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;
import ru.insane.lab4.conn.req.PointRequest;
import ru.insane.lab4.conn.resp.MessageResponse;
import ru.insane.lab4.conn.resp.PointResponse;
import ru.insane.lab4.domain.Point;
import ru.insane.lab4.repo.PointRepository;
import ru.insane.lab4.repo.UserRepository;
import ru.insane.lab4.util.ResultUtil;
import ru.insane.lab4.util.ValidationUtil;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequestMapping("/api/points")
public class MainController {

    private final PointRepository pointRepository;

    private final ResultUtil resultUtil;

    private final ValidationUtil validationUtil;

    @Autowired
    public MainController(PointRepository pointRepository, ResultUtil resultUtil, ValidationUtil validationUtil) {
        this.pointRepository = pointRepository;
        this.resultUtil = resultUtil;
        this.validationUtil = validationUtil;
    }

    @GetMapping
    public ResponseEntity<?> getAll(Principal principal) {
        List<Point> points = pointRepository.findByOwner(principal.getName());
        return ResponseEntity.ok(points);
    }

    @GetMapping("/last")
    public ResponseEntity<?> getLast(Principal principal) {

        Point point = pointRepository.findTopByOwnerOrderByIdDesc(principal.getName());

        return ResponseEntity.ok(point);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PointRequest point, Principal principal) {
        if (!validationUtil.validateData(point.getX(), point.getY(), point.getR())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Данные не прошли валидацию"));
        }
        return ResponseEntity.ok(formatPoint(point, principal));
    }

    @PostMapping("/click")
    public ResponseEntity<?> createFromClick(@RequestBody PointRequest point, Principal principal) {
        return ResponseEntity.ok(formatPoint(point, principal));
    }

    @DeleteMapping
    public ResponseEntity<?> clear(Principal principal) {
        try {
            pointRepository.deleteAllByOwner(principal.getName());
            return ResponseEntity.ok(new MessageResponse("Очищено"));
        } catch (Exception e) {
            return ResponseEntity.ok(new MessageResponse("Нечего удалять"));
        }


    }

    private PointResponse formatPoint(PointRequest point, Principal principal) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String time = formatter.format(LocalDateTime.now());
        Point result = Point.builder()
                .x(point.getX())
                .y(point.getY())
                .r(point.getR())
                .result(resultUtil.check(point.getX(), point.getY(), point.getR()))
                .time(time)
                .owner(principal.getName())
                .build();
        pointRepository.save(result);
        return new PointResponse(result.getX(), result.getY(), result.getR(), result.getResult(), result.getTime());
    }


}
