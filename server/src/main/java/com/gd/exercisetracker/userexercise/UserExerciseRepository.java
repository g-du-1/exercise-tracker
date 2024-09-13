package com.gd.exercisetracker.userexercise;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserExerciseRepository extends JpaRepository<UserExercise, Long> {
    List<UserExercise> findByUser_UserId(Long userId);
    void deleteByUser_UserIdAndExerciseId(Long userId, Long exerciseId);
    void deleteByUser_UserId(Long userId);
}
