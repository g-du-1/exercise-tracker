package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.usersettings.dto.UserSettingsDto;

public interface UserSettingsService {
    UserSettingsDto getUserSettings(Long userId);
    UserSettingsDto saveUserSettings(Long userId, UserSettingsDto userSettingsDto);
}
