package com.gd.exercisetracker.usersettings.dto;

import com.gd.exercisetracker.usersettings.UserSettings;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserSettingsMapper {
    UserSettingsMapper INSTANCE = Mappers.getMapper(UserSettingsMapper.class);

    UserSettingsDTO userSettingsToUserSettingsDTO(UserSettings userSettings);
}
