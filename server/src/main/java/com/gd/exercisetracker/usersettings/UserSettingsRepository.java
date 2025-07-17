package com.gd.exercisetracker.usersettings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    List<UserSettings> findByUser_UserId(Long userId);
}
