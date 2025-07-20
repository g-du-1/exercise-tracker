package com.gd.exercisetracker.exercise;

import com.gd.exercisetracker.exercise.enums.ExerciseCategory;
import com.gd.exercisetracker.exercise.enums.ExerciseType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String key;

    private String name;
    private ExerciseCategory category;
    private ExerciseType type;
    private int targetSets;
    private int targetRepsMin;
    private Integer targetRepsMax;
    private boolean isDuration;
    private int targetRest;
    private int additionalRest;
    private String mediaLink;

    @Column(columnDefinition = "TEXT")
    private String comments;
}
