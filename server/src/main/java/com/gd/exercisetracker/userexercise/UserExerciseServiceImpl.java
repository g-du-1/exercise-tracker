package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.exercise.Exercise;
import com.gd.exercisetracker.exercise.ExerciseRepository;
import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserExerciseServiceImpl implements UserExerciseService {
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserExerciseRepository userExerciseRepository;

    public UserExerciseServiceImpl(UserRepository userRepository, ExerciseRepository exerciseRepository, UserExerciseRepository userExerciseRepository) {
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
        this.userExerciseRepository = userExerciseRepository;
    }

    @Override
    public UserExercise saveUserExercise(Long userId, Long exerciseId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new RuntimeException("Exercise not found"));

        UserExercise userExercise = new UserExercise();
        
        userExercise.setUser(user);
        userExercise.setExercise(exercise);

        return userExerciseRepository.save(userExercise);
    }

    @Override
    public List<UserExercise> getUserExercises(Long userId) {
        return userExerciseRepository.findByUser_UserId(userId);
    }

    @Override
    @Transactional
    public void deleteUserExercise(Long userId, Long exerciseId) {
        userExerciseRepository.deleteByUser_UserIdAndExerciseId(userId, exerciseId);
    }
}