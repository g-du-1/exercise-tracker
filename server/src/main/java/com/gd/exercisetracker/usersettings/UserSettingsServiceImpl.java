package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import com.gd.exercisetracker.usersettings.dto.UserSettingsDto;
import com.gd.exercisetracker.usersettings.dto.UserSettingsMapper;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsServiceImpl implements UserSettingsService {
    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;

    public UserSettingsServiceImpl(UserSettingsRepository userSettingsRepository, UserRepository userRepository) {
        this.userSettingsRepository = userSettingsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public UserSettingsDto getUserSettings(Long userId) {
        UserSettings settings = userSettingsRepository.findByUser_UserId(userId);

        if (settings == null) {
            UserSettings defaultSettings = new UserSettings();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            defaultSettings.setUser(user);

            return UserSettingsMapper.INSTANCE.userSettingsToUserSettingsDto(defaultSettings);
        }

        return UserSettingsMapper.INSTANCE.userSettingsToUserSettingsDto(settings);
    }

    @Override
    public UserSettingsDto saveUserSettings(Long userId, UserSettingsDto userSettingsDto) {
        UserSettings existingSettings = userSettingsRepository.findByUser_UserId(userId);
        
        if (existingSettings == null) {
            existingSettings = new UserSettings();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            existingSettings.setUser(user);
        }

        existingSettings.setShowCompletedExercises(userSettingsDto.isShowCompletedExercises());
        existingSettings.setShowComments(userSettingsDto.isShowComments());
        existingSettings.setShowMedia(userSettingsDto.isShowMedia());
        
        UserSettings savedSettings = userSettingsRepository.save(existingSettings);

        return UserSettingsMapper.INSTANCE.userSettingsToUserSettingsDto(savedSettings);
    }
}
