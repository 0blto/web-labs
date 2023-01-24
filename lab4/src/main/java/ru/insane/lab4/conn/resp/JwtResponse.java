package ru.insane.lab4.conn.resp;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
public class JwtResponse {
    String token;

    final String type = "Bearer";
    String username;

    public JwtResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }
}
