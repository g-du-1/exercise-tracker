package com.gd.exercisetracker.usersettings;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gd.exercisetracker.security.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    private boolean showCompletedExercises = true;
    private boolean showComments = false;
    private boolean showMedia = false;
}
