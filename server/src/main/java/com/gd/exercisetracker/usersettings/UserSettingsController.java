package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.security.user.UserDetailsImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
