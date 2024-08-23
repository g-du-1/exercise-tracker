package com.gd.exercisetracker.exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }
}
