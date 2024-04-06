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
        // Warmups
        exerciseRepository.save(new Exercise("yuris-shoulder-band-warmup", "Yuri's Shoulder Band Warmup", "warmup", "warmup", 1, 5, 10, false, 0, 0, "https://www.youtube.com/watch?v=6y_AU-aGhVE", "<ul><li>Can also be done with a tee-shirt</li></ul>"));
        exerciseRepository.save(new Exercise("squat-sky-reaches", "Squat Sky Reaches", "warmup", "warmup", 1, 5, 10, false, 0, 0, "https://www.youtube.com/watch?v=lbozu0DPcYI&t=42s", null));
        exerciseRepository.save(new Exercise("gmb-wrist-prep", "GMB Wrist Prep", "warmup", "warmup", 1, 10, null, false, 0, 0, "https://www.youtube.com/watch?v=mSZWSQSSEjE", "<ul><li>Do as many reps as you want</li></ul>"));
        exerciseRepository.save(new Exercise("deadbugs-both-legs", "Deadbugs (Both Legs)", "warmup", "warmup", 1, 30, 30, true, 0, 0, "https://www.youtube.com/watch?v=HFv2WwgeVMk", null));

        // First Pair
        exerciseRepository.save(new Exercise("arch-hangs", "Arch Hangs", "firstPair", "pullUp", 3, 5, 8, false, 90, 90, "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s", "<ul><li>Elbows should stay straight</li><li>Hold it for time/reps</li><li>Start at this <a href=\"https://www.youtube.com/watch?v=HoE-C85ZlCE\">level</a></li><li>Progress towards a 90 degree in your shoulder. Like <a href=\"https://i.ytimg.com/vi/JusddCep6PA/hqdefault.jpg\">this</a></li></ul>"));
        exerciseRepository.save(new Exercise("bulgarian-split-squats", "Bulgarian Split Squat", "firstPair", "squat", 3, 5, 8, false, 90, 90, "https://www.youtube.com/watch?v=kkdmHTASZg8&t=75s", "<ul><li>Pretend the barbell doesn't exist.</li><li>You can progress this further by elevating both your legs</li></ul>"));
        
        // Second Pair
        exerciseRepository.save(new Exercise("parallel-bar-support-hold", "Parallel Bar Support Hold", "secondPair", "dip", 3, 60, 60, true, 90, 90, "https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg", "<ul><li>Work up to 3 sets of 1 minute holds for this progression</li><li>If you can't hold yourself up at all, consider using bands or your feet to assist you until you gain the necessary strength.</li></ul>"));
        exerciseRepository.save(new Exercise("negative-hamstring-slide", "Negative Hamstring Slide", "secondPair", "hinge", 3, 5, 8, false, 90, 90, "https://www.youtube.com/watch?v=OY8Jci5KJdM", "<ul><li>Start in the top position of a glute bridge, slide legs out under control until your butt touches the ground/knees are extended.</li><li>Return to starting position and repeat for desired reps.</li></ul>"));

        // Third Pair
        exerciseRepository.save(new Exercise("incline-rows", "Incline Rows", "thirdPair", "row", 3, 5, 8, false, 90, 90, "https://www.youtube.com/watch?v=LR2EnFWpVao", "<ul><li>Perform a row, but with the body position somewhere between vertical and horizontal. Go closer to horizontal to make it harder.</li></ul>"));
    }
}
