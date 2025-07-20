package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {
    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;

    public UserSettingsService(UserSettingsRepository userSettingsRepository, UserRepository userRepository) {
        this.userSettingsRepository = userSettingsRepository;
        this.userRepository = userRepository;
    }

    public UserSettings getUserSettings(Long userId) {
        UserSettings settings = userSettingsRepository.findByUser_UserId(userId);

        if (settings == null) {
            UserSettings defaultSettings = new UserSettings();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            defaultSettings.setUser(user);

            return userSettingsRepository.save(defaultSettings);
        }

        return settings;
    }

    public UserSettings saveUserSettings(Long userId, UserSettingsDTO userSettingsDTO) {
        UserSettings existingSettings = userSettingsRepository.findByUser_UserId(userId);

        existingSettings.setShowCompletedExercises(userSettingsDTO.isShowCompletedExercises());
        existingSettings.setShowComments(userSettingsDTO.isShowComments());
        existingSettings.setShowMedia(userSettingsDTO.isShowMedia());

        return userSettingsRepository.save(existingSettings);
    }
}
