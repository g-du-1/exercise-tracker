package com.gd.exercisetracker.userexercise.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ExerciseDto {
    private Long id;
    private String key;
    private String name;
    private String category;
    private String type;
    private int targetSets;
    private int targetRepsMin;
    private Integer targetRepsMax;
    private boolean isDuration;
    private int targetRest;
    private int additionalRest;
    private String mediaLink;
    private String comments;
}
