package com.gd.exercisetracker.usersettings.dto;

import lombok.Data;

@Data
public class UserSettingsDTO {
    private boolean showCompletedExercises;
    private boolean showComments;
    private boolean showMedia;
}
