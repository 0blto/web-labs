package ru.insane.lab4.controllers;


import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.insane.lab4.config.jwt.JwtUtils;
import ru.insane.lab4.conn.req.AuthRequest;
import ru.insane.lab4.conn.resp.JwtResponse;
import ru.insane.lab4.conn.resp.MessageResponse;
import ru.insane.lab4.domain.User;
import ru.insane.lab4.repo.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthController {

    final
    PasswordEncoder passwordEncoder;

    final
    UserRepository userRepository;

    final
    AuthenticationManager authenticationManager;

    final
    JwtUtils jwtUtils;

    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequest authRequest
    ) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                authRequest.getUsername(),
                                authRequest.getPassword()
                        )
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(
                jwt, user.getUsername()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody AuthRequest authRequest
    ) {
        Optional<User> found = userRepository.findByUsername(authRequest.getUsername());
        if (found.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Пользователь с таким именем уже существует"));
        }
        User user = User.builder()
                .username(authRequest.getUsername())
                .password(passwordEncoder.encode(authRequest.getPassword()))
                .build();
        userRepository.save(user);
        return ResponseEntity.ok(
                new MessageResponse("User created")
        );
    }

}
