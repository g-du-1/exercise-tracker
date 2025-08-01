package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.userexercise.dtos.UserExerciseDto;

import java.util.List;

public interface UserExerciseService {
    UserExerciseDto saveUserExercise(Long userId, Long exerciseId);
    List<UserExerciseDto> getUserExercises(Long userId);
    void deleteUserExercise(Long userId, Long exerciseId);
    void deleteAllExercisesForUser(Long userId);
}
