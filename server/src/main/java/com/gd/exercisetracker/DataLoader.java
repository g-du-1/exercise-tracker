package com.gd.exercisetracker;

import com.gd.exercisetracker.exercise.Exercise;
import com.gd.exercisetracker.exercise.ExerciseRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

// Temp Data Loader that will seed the DB on application start
// Comment out @Component to disable

@Component
public class DataLoader implements ApplicationRunner {

    private final ExerciseRepository exerciseRepository;

    public DataLoader(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        exerciseRepository.save(new Exercise("yuris-shoulder-band-warmup", "Yuri's Shoulder Band Warmup", "warmup", "warmup", 1, 5, 10, false, 0, 0, "https://www.youtube.com/watch?v=6y_AU-aGhVE", "<ul><li>Can also be done with a tee-shirt</li></ul>"));
        exerciseRepository.save(new Exercise("squat-sky-reaches", "Squat Sky Reaches", "warmup", "warmup", 1, 5, 10, false, 0, 0, "https://www.youtube.com/watch?v=lbozu0DPcYI&t=42s", null));
        exerciseRepository.save(new Exercise("gmb-wrist-prep", "GMB Wrist Prep", "warmup", "warmup", 1, 10, null, false, 0, 0, "https://www.youtube.com/watch?v=mSZWSQSSEjE", "<ul><li>Do as many reps as you want</li></ul>"));
    }
}
