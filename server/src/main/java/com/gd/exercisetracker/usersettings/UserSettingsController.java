package com.gd.exercisetracker.usersettings;

import com.gd.exercisetracker.security.user.UserDetailsImpl;
import com.gd.exercisetracker.usersettings.dto.UserSettingsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user-settings")
public class UserSettingsController {
    private final UserSettingsService userSettingsService;

    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    @GetMapping
    public ResponseEntity<UserSettingsDto> getUserSettings(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();

        return ResponseEntity.ok(userSettingsService.getUserSettings(userId));
    }


    @PostMapping("/save")
    public ResponseEntity<UserSettingsDto> saveUserSettings(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody UserSettingsDto userSettingsDto) {
        Long userId = userDetails.getId();

        return ResponseEntity.ok(userSettingsService.saveUserSettings(userId, userSettingsDto));
    }
}
