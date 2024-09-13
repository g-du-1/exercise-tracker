package com.gd.exercisetracker.userexercise;

import java.util.List;

public interface UserExerciseService {
    UserExercise saveUserExercise(Long userId, Long exerciseId);
    List<UserExercise> getUserExercises(Long userId);
    void deleteUserExercise(Long userId, Long exerciseId);
    void deleteAllExercisesForUser(Long userId);
}
