package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.security.user.UserDetailsImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

// TODO: Tests

@RestController
@RequestMapping("/api/v1/user-settings")
public class UserSettingsController {
    private final UserSettingsService userSettingsService;

    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    @GetMapping
    public ResponseEntity<UserSettingsDTO> getUserSettings(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        UserSettings userSettings = userSettingsService.getUserSettings(userId);

        UserSettingsDTO response = new UserSettingsDTO();
        BeanUtils.copyProperties(userSettings, response);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/save")
    public ResponseEntity<UserSettingsDTO> saveUserSettings(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody UserSettingsDTO userSettingsDTO) {
        Long userId = userDetails.getId();

        UserSettings updatedSettings = userSettingsService.updateUserSettings(userId, userSettingsDTO);

        UserSettingsDTO response = new UserSettingsDTO();
        BeanUtils.copyProperties(updatedSettings, response);

        return ResponseEntity.ok(response);
    }
}
