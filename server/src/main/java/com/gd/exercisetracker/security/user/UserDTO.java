package com.gd.exercisetracker.security.user;

import com.gd.exercisetracker.security.role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String userName;
    private String email;
    private boolean enabled;
    private String signUpMethod;
    private Role role;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
