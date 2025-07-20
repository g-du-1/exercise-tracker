package com.gd.exercisetracker.exercise;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<ExerciseDto> getAllExercises() {
        List<Exercise> exercises = exerciseRepository.findAll();

        return ExerciseMapper.INSTANCE.exercisesToExerciseDtos(exercises);
    }
}
