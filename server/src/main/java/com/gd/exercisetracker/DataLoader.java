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
        exerciseRepository.save(new Exercise("arch-hangs", "Arch Hangs", "firstPair", "pullUp", 3, 5, 8, false, 90, 90, "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s", "<ul><li>Do as many reps as you want</li></ul>"));
    }
}
