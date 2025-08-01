package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.exercise.Exercise;
import com.gd.exercisetracker.exercise.ExerciseRepository;
import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import com.gd.exercisetracker.userexercise.dtos.UserExerciseDto;
import com.gd.exercisetracker.userexercise.dtos.UserExerciseMapper;
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
    public UserExerciseDto saveUserExercise(Long userId, Long exerciseId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new RuntimeException("Exercise not found"));

        UserExercise userExercise = new UserExercise();
        
        userExercise.setUser(user);
        userExercise.setExercise(exercise);

        UserExercise savedUserExercise = userExerciseRepository.save(userExercise);

        return UserExerciseMapper.INSTANCE.userExerciseToUserExerciseDto(savedUserExercise);
    }

    @Override
    public List<UserExerciseDto> getUserExercises(Long userId) {
        List<UserExercise> byUserUserId = userExerciseRepository.findByUser_UserId(userId);
        return UserExerciseMapper.INSTANCE.userExercisesToUserExerciseDtos(byUserUserId);
    }

    @Override
    @Transactional
    public void deleteUserExercise(Long userId, Long exerciseId) {
        userExerciseRepository.deleteByUser_UserIdAndExerciseId(userId, exerciseId);
    }

    @Override
    @Transactional
    public void deleteAllExercisesForUser(Long userId) {
        userExerciseRepository.deleteByUser_UserId(userId);
    }
}