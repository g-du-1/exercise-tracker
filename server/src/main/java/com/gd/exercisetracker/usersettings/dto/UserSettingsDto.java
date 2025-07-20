package com.gd.exercisetracker.usersettings.dto;

import lombok.Data;

@Data
public class UserSettingsDto {
    private boolean showCompletedExercises;
    private boolean showComments;
    private boolean showMedia;
}
