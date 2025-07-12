package com.gd.exercisetracker.userexercise;

import com.gd.exercisetracker.KafkaProducer;
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
    private final KafkaProducer kafkaProducer;

    public UserExerciseServiceImpl(UserRepository userRepository, ExerciseRepository exerciseRepository, UserExerciseRepository userExerciseRepository, KafkaProducer kafkaProducer) {
        this.userRepository = userRepository;
        this.exerciseRepository = exerciseRepository;
        this.userExerciseRepository = userExerciseRepository;
        this.kafkaProducer = kafkaProducer;
    }

    @Override
    public UserExercise saveUserExercise(Long userId, Long exerciseId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new RuntimeException("Exercise not found"));

        UserExercise userExercise = new UserExercise();
        
        userExercise.setUser(user);
        userExercise.setExercise(exercise);

        kafkaProducer.send("my-topic", "User Exercise Added!");

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

    @Override
    @Transactional
    public void deleteAllExercisesForUser(Long userId) {
        userExerciseRepository.deleteByUser_UserId(userId);
    }
}