package com.gd.exercisetracker.userexercise.dtos;

import com.gd.exercisetracker.userexercise.UserExercise;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserExerciseMapper {
    UserExerciseMapper INSTANCE = Mappers.getMapper(UserExerciseMapper.class);

    UserExerciseDto userExerciseToUserExerciseDto(UserExercise userExercise);
    List<UserExerciseDto> userExercisesToUserExerciseDtos(List<UserExercise> userExercises);
}
