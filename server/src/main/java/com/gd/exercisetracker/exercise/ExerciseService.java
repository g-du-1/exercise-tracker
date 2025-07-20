package com.gd.exercisetracker.exercise;

import com.gd.exercisetracker.exercise.dto.ExerciseDto;

import java.util.List;

public interface ExerciseService {
    List<ExerciseDto> getAllExercises();
}
