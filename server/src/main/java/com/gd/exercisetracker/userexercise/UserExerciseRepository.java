package com.gd.exercisetracker.userexercise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserExerciseRepository extends JpaRepository<UserExercise, Long> {
    List<UserExercise> findByUser_UserId(Long userId);
    void deleteByUser_UserIdAndExerciseId(Long userId, Long exerciseId);
    void deleteByUser_UserId(Long userId);
}
