package com.gd.exercisetracker.exercise;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ExerciseMapper {
    ExerciseMapper INSTANCE = Mappers.getMapper(ExerciseMapper.class);

    ExerciseDto exerciseToExerciseDto(Exercise exercise);
    List<ExerciseDto> exercisesToExerciseDtos(List<Exercise> exercises);
}