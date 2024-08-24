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

        Exercise shoulderBand = new Exercise();

        shoulderBand.setKey("yuris-shoulder-band-warmup");
        shoulderBand.setName("Yuri's Shoulder Band Warmup");
        shoulderBand.setCategory("warmup");
        shoulderBand.setType("warmup");
        shoulderBand.setTargetSets(1);
        shoulderBand.setTargetRepsMin(5);
        shoulderBand.setTargetRepsMax(10);
        shoulderBand.setDuration(false);
        shoulderBand.setTargetRest(0);
        shoulderBand.setAdditionalRest(0);
        shoulderBand.setMediaLink("https://www.youtube.com/watch?v=6y_AU-aGhVE");
        shoulderBand.setComments("<ul><li>Can also be done with a tee-shirt</li></ul>");

        exerciseRepository.save(shoulderBand);

        Exercise skySquat = new Exercise();

        skySquat.setKey("squat-sky-reaches");
        skySquat.setName("Squat Sky Reaches");
        skySquat.setCategory("warmup");
        skySquat.setType("warmup");
        skySquat.setTargetSets(1);
        skySquat.setTargetRepsMin(5);
        skySquat.setTargetRepsMax(10);
        skySquat.setDuration(false);
        skySquat.setTargetRest(0);
        skySquat.setAdditionalRest(0);
        skySquat.setMediaLink("https://www.youtube.com/watch?v=lbozu0DPcYI&t=42s");
        skySquat.setComments(null);

        exerciseRepository.save(skySquat);

        Exercise wristPrep = new Exercise();

        wristPrep.setKey("gmb-wrist-prep");
        wristPrep.setName("GMB Wrist Prep");
        wristPrep.setCategory("warmup");
        wristPrep.setType("warmup");
        wristPrep.setTargetSets(1);
        wristPrep.setTargetRepsMin(10);
        wristPrep.setTargetRepsMax(null);
        wristPrep.setDuration(false);
        wristPrep.setTargetRest(0);
        wristPrep.setAdditionalRest(0);
        wristPrep.setMediaLink("https://www.youtube.com/watch?v=mSZWSQSSEjE");
        wristPrep.setComments("<ul><li>Do as many reps as you want</li></ul>");

        exerciseRepository.save(wristPrep);

        Exercise deadbugsBothLegs = new Exercise();

        deadbugsBothLegs.setKey("deadbugs-both-legs");
        deadbugsBothLegs.setName("Deadbugs (Both Legs)");
        deadbugsBothLegs.setCategory("warmup");
        deadbugsBothLegs.setType("warmup");
        deadbugsBothLegs.setTargetSets(1);
        deadbugsBothLegs.setTargetRepsMin(30);
        deadbugsBothLegs.setTargetRepsMax(30);
        deadbugsBothLegs.setDuration(true);
        deadbugsBothLegs.setTargetRest(0);
        deadbugsBothLegs.setAdditionalRest(0);
        deadbugsBothLegs.setMediaLink("https://www.youtube.com/watch?v=HFv2WwgeVMk");
        deadbugsBothLegs.setComments(null);

        exerciseRepository.save(deadbugsBothLegs);

        // First Pair

        Exercise archHangs = new Exercise();

        archHangs.setKey("arch-hangs");
        archHangs.setName("Arch Hangs");
        archHangs.setCategory("firstPair");
        archHangs.setType("pullUp");
        archHangs.setTargetSets(3);
        archHangs.setTargetRepsMin(5);
        archHangs.setTargetRepsMax(8);
        archHangs.setDuration(false);
        archHangs.setTargetRest(90);
        archHangs.setAdditionalRest(90);
        archHangs.setMediaLink("https://www.youtube.com/watch?v=C995b3KLXS4&t=7s");
        archHangs.setComments("<ul><li>Elbows should stay straight</li><li>Hold it for time/reps</li><li>Start at this <a href=\"https://www.youtube.com/watch?v=HoE-C85ZlCE\">level</a></li><li>Progress towards a 90 degree in your shoulder. Like <a href=\"https://i.ytimg.com/vi/JusddCep6PA/hqdefault.jpg\">this</a></li></ul>");

        exerciseRepository.save(archHangs);

        Exercise bulgarianSplitSquats = new Exercise();

        bulgarianSplitSquats.setKey("bulgarian-split-squats");
        bulgarianSplitSquats.setName("Bulgarian Split Squat");
        bulgarianSplitSquats.setCategory("firstPair");
        bulgarianSplitSquats.setType("squat");
        bulgarianSplitSquats.setTargetSets(3);
        bulgarianSplitSquats.setTargetRepsMin(5);
        bulgarianSplitSquats.setTargetRepsMax(8);
        bulgarianSplitSquats.setDuration(false);
        bulgarianSplitSquats.setTargetRest(90);
        bulgarianSplitSquats.setAdditionalRest(90);
        bulgarianSplitSquats.setMediaLink("https://www.youtube.com/watch?v=kkdmHTASZg8&t=75s");
        bulgarianSplitSquats.setComments("<ul><li>Pretend the barbell doesn't exist.</li><li>You can progress this further by elevating both your legs</li></ul>");

        exerciseRepository.save(bulgarianSplitSquats);

        // Second Pair

        Exercise parallelBarSupportHold = new Exercise();

        parallelBarSupportHold.setKey("parallel-bar-support-hold");
        parallelBarSupportHold.setName("Parallel Bar Support Hold");
        parallelBarSupportHold.setCategory("secondPair");
        parallelBarSupportHold.setType("dip");
        parallelBarSupportHold.setTargetSets(3);
        parallelBarSupportHold.setTargetRepsMin(60);
        parallelBarSupportHold.setTargetRepsMax(60);
        parallelBarSupportHold.setDuration(true);
        parallelBarSupportHold.setTargetRest(90);
        parallelBarSupportHold.setAdditionalRest(90);
        parallelBarSupportHold.setMediaLink("https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg");
        parallelBarSupportHold.setComments("<ul><li>Work up to 3 sets of 1 minute holds for this progression</li><li>If you can't hold yourself up at all, consider using bands or your feet to assist you until you gain the necessary strength.</li></ul>");

        exerciseRepository.save(parallelBarSupportHold);

        Exercise negativeHamstringSlide = new Exercise();

        negativeHamstringSlide.setKey("negative-hamstring-slide");
        negativeHamstringSlide.setName("Negative Hamstring Slide");
        negativeHamstringSlide.setCategory("secondPair");
        negativeHamstringSlide.setType("hinge");
        negativeHamstringSlide.setTargetSets(3);
        negativeHamstringSlide.setTargetRepsMin(5);
        negativeHamstringSlide.setTargetRepsMax(8);
        negativeHamstringSlide.setDuration(false);
        negativeHamstringSlide.setTargetRest(90);
        negativeHamstringSlide.setAdditionalRest(90);
        negativeHamstringSlide.setMediaLink("https://www.youtube.com/watch?v=OY8Jci5KJdM");
        negativeHamstringSlide.setComments("<ul><li>Start in the top position of a glute bridge, slide legs out under control until your butt touches the ground/knees are extended.</li><li>Return to starting position and repeat for desired reps.</li></ul>");

        exerciseRepository.save(negativeHamstringSlide);

        // Third Pair

        Exercise inclineRows = new Exercise();

        inclineRows.setKey("incline-rows");
        inclineRows.setName("Incline Rows");
        inclineRows.setCategory("thirdPair");
        inclineRows.setType("row");
        inclineRows.setTargetSets(3);
        inclineRows.setTargetRepsMin(5);
        inclineRows.setTargetRepsMax(8);
        inclineRows.setDuration(false);
        inclineRows.setTargetRest(90);
        inclineRows.setAdditionalRest(90);
        inclineRows.setMediaLink("https://www.youtube.com/watch?v=LR2EnFWpVao");
        inclineRows.setComments("<ul><li>Perform a row, but with the body position somewhere between vertical and horizontal. Go closer to horizontal to make it harder.</li></ul>");

        exerciseRepository.save(inclineRows);

        Exercise fullPushUp = new Exercise();

        fullPushUp.setKey("full-pushup");
        fullPushUp.setName("Full Pushup");
        fullPushUp.setCategory("thirdPair");
        fullPushUp.setType("pushUp");
        fullPushUp.setTargetSets(3);
        fullPushUp.setTargetRepsMin(5);
        fullPushUp.setTargetRepsMax(8);
        fullPushUp.setDuration(false);
        fullPushUp.setTargetRest(90);
        fullPushUp.setAdditionalRest(90);
        fullPushUp.setMediaLink("https://www.youtube.com/watch?v=IODxDxX7oi4");
        fullPushUp.setComments("<ul><li>Body in a straight line from head to toe: don't let the hips sag!</li><li>Lock out arms and protract the shoulderblades (<a href=\"https://reddit.com/r/bodyweightfitness/wiki/kb/positioning\" rel=\"nofollow\">what does that even mean?</a>) at the top</li><li>Go down until chest nearly touches the ground</li><li>Keep the elbows in, don't let them flare out</li><li>Don't shrug up your shoulders to your ears, focus on depressing the shoulderblades (<a href=\"https://reddit.com/r/bodyweightfitness/wiki/kb/positioning\" rel=\"nofollow\">what does that even mean?</a>).</li></ul>");

        exerciseRepository.save(fullPushUp);

        // Core Triplet

        Exercise ringAbRollouts = new Exercise();

        ringAbRollouts.setKey("ring-ab-rollouts");
        ringAbRollouts.setName("Ring Ab Rollouts");
        ringAbRollouts.setCategory("coreTriplet");
        ringAbRollouts.setType("antiExtension");
        ringAbRollouts.setTargetSets(3);
        ringAbRollouts.setTargetRepsMin(8);
        ringAbRollouts.setTargetRepsMax(12);
        ringAbRollouts.setDuration(false);
        ringAbRollouts.setTargetRest(60);
        ringAbRollouts.setAdditionalRest(60);
        ringAbRollouts.setMediaLink("https://www.youtube.com/watch?v=LBUfnmugKLw");
        ringAbRollouts.setComments("<ul><li>Elbows should stay straight</li><li>Remain in a hollow body position (ribs down, butt tucked)</li><li>Keep your hands as close as your overhead mobility will allow.</li><li>Higher ring position will make this easier. Elevating the feet will make it harder.</li></ul>");

        exerciseRepository.save(ringAbRollouts);

        Exercise assistedKneeCoppenhagenPlank = new Exercise();

        assistedKneeCoppenhagenPlank.setKey("assisted-knee-copenhagen-plank");
        assistedKneeCoppenhagenPlank.setName("Assisted Knee Copenhagen Plank");
        assistedKneeCoppenhagenPlank.setCategory("coreTriplet");
        assistedKneeCoppenhagenPlank.setType("antiRotation");
        assistedKneeCoppenhagenPlank.setTargetSets(3);
        assistedKneeCoppenhagenPlank.setTargetRepsMin(8);
        assistedKneeCoppenhagenPlank.setTargetRepsMax(12);
        assistedKneeCoppenhagenPlank.setDuration(false);
        assistedKneeCoppenhagenPlank.setTargetRest(60);
        assistedKneeCoppenhagenPlank.setAdditionalRest(60);
        assistedKneeCoppenhagenPlank.setMediaLink("https://i.imgur.com/6vOLzTC.jpg");
        assistedKneeCoppenhagenPlank.setComments("<ul><li>Lower leg should give the minimum assistance you need.</li><li>Don't let the hips sag.</li><li>Can be performed on your hand instead of elbow.</li></ul>");

        exerciseRepository.save(assistedKneeCoppenhagenPlank);

        Exercise reverseHyperExtension = new Exercise();

        reverseHyperExtension.setKey("reverse-hyperextension");
        reverseHyperExtension.setName("Reverse Hyperextension");
        reverseHyperExtension.setCategory("coreTriplet");
        reverseHyperExtension.setType("extension");
        reverseHyperExtension.setTargetSets(3);
        reverseHyperExtension.setTargetRepsMin(8);
        reverseHyperExtension.setTargetRepsMax(12);
        reverseHyperExtension.setDuration(false);
        reverseHyperExtension.setTargetRest(60);
        reverseHyperExtension.setAdditionalRest(60);
        reverseHyperExtension.setMediaLink("https://www.youtube.com/watch?v=ZeRsNzFcQLQ&");
        reverseHyperExtension.setComments("<ul><li>Keep your butt tucked</li></ul>");

        exerciseRepository.save(reverseHyperExtension);
    }
}
