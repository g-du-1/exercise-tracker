package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.security.user.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-exercises")
public class UserExerciseController {

    @Autowired
    private UserExerciseService userExerciseService;

    @PostMapping("/save")
    public ResponseEntity<UserExercise> saveUserExercise(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody SaveUserExerciseRequest saveUserExerciseRequest) {
        Long exerciseId = saveUserExerciseRequest.getExerciseId();
        Long userId = userDetails.getId();

        UserExercise savedExercise = userExerciseService.saveUserExercise(userId, exerciseId);

        return ResponseEntity.ok(savedExercise);
    }

    @GetMapping
    public ResponseEntity<List<UserExercise>> getUserExercises(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        return ResponseEntity.ok(userExerciseService.getUserExercises(userId));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUserExercise(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody DeleteUserExerciseRequest deleteUserExerciseRequest) {
        Long userId = userDetails.getId();
        Long exerciseId = deleteUserExerciseRequest.getExerciseId();

        userExerciseService.deleteUserExercise(userId, exerciseId);

        return ResponseEntity.ok("User exercise deleted.");
    }
}