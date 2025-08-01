package com.gd.exercisetracker.userexercise.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserExerciseDto {
    private Long id;
    private ExerciseDto exercise;
}
