package com.gd.exercisetracker.usersettings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    UserSettings findByUser_UserId(Long userId);
}
