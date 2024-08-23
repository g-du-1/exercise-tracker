package com.gd.exercisetracker.userexercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-exercises")
public class UserExerciseController {

    @Autowired
    private UserExerciseService userExerciseService;

    @PostMapping("/{userId}/save")
    public ResponseEntity<UserExercise> saveUserExercise(@PathVariable Long userId, @RequestParam Long exerciseId) {
        UserExercise savedExercise = userExerciseService.saveUserExercise(userId, exerciseId);

        return ResponseEntity.ok(savedExercise);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserExercise>> getUserExercises(@PathVariable Long userId) {
        return ResponseEntity.ok(userExerciseService.getUserExercises(userId));
    }
}