package com.gd.exercisetracker.usersettings;

import lombok.Data;

@Data
public class UserSettingsDTO {
    private boolean showCompletedExercises;
    private boolean showComments;
    private boolean showMedia;
}
