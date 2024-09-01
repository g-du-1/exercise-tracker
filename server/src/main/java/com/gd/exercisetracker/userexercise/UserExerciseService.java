package com.gd.exercisetracker.userexercise;

import java.util.List;

public interface UserExerciseService {
    public UserExercise saveUserExercise(Long userId, Long exerciseId);

    List<UserExercise> getUserExercises(Long userId);
}
