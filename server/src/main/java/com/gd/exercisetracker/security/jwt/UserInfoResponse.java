package com.gd.exercisetracker.security.jwt;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private boolean enabled;
    private List<String> roles;
}