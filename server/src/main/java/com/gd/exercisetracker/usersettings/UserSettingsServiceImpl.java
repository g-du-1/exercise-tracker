package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserRepository;
import com.gd.exercisetracker.usersettings.dto.UserSettingsDTO;
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
    public UserSettingsDTO getUserSettings(Long userId) {
        UserSettings settings = userSettingsRepository.findByUser_UserId(userId);

        if (settings == null) {
            UserSettings defaultSettings = new UserSettings();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            defaultSettings.setUser(user);

            return UserSettingsMapper.INSTANCE.userSettingsToUserSettingsDTO(defaultSettings);
        }

        return UserSettingsMapper.INSTANCE.userSettingsToUserSettingsDTO(settings);
    }

    @Override
    public UserSettingsDTO saveUserSettings(Long userId, UserSettingsDTO userSettingsDTO) {
        UserSettings existingSettings = userSettingsRepository.findByUser_UserId(userId);

        existingSettings.setShowCompletedExercises(userSettingsDTO.isShowCompletedExercises());
        existingSettings.setShowComments(userSettingsDTO.isShowComments());
        existingSettings.setShowMedia(userSettingsDTO.isShowMedia());

        return UserSettingsMapper.INSTANCE.userSettingsToUserSettingsDTO(existingSettings);
    }
}
