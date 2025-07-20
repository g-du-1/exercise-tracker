package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.usersettings.dto.UserSettingsDTO;

public interface UserSettingsService {
    UserSettingsDTO getUserSettings(Long userId);
    UserSettingsDTO saveUserSettings(Long userId, UserSettingsDTO userSettingsDTO);
}
