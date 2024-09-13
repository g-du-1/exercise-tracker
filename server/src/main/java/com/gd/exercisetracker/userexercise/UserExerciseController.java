package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.security.user.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-exercises")
public class UserExerciseController {
    private final UserExerciseService userExerciseService;

    public UserExerciseController(UserExerciseService userExerciseService) {
        this.userExerciseService = userExerciseService;
    }

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

    @DeleteMapping("/{exerciseId}")
    public ResponseEntity<DeleteUserExerciseResponse> deleteUserExercise(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long exerciseId) {
        Long userId = userDetails.getId();

        userExerciseService.deleteUserExercise(userId, exerciseId);

        return ResponseEntity.ok(new DeleteUserExerciseResponse("User exercise deleted."));
    }

    @DeleteMapping("/all")
    public ResponseEntity<DeleteAllExercisesForUserResponse> deleteAllExercisesForUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        userExerciseService.deleteAllExercisesForUser(userId);

        return ResponseEntity.ok(new DeleteAllExercisesForUserResponse("All exercises deleted for user."));
    }
}