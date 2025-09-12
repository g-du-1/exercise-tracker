package com.gd.exercisetracker.exercise.dto;

import com.gd.exercisetracker.exercise.Exercise;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ExerciseMapper {
    ExerciseMapper INSTANCE = Mappers.getMapper(ExerciseMapper.class);

    ExerciseDto exerciseToExerciseDto(Exercise exercise);
    List<ExerciseDto> exercisesToExerciseDtos(List<Exercise> exercises);
}