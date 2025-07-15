package com.gd.exercisetracker;

import com.gd.exercisetracker.exercise.Exercise;
import com.gd.exercisetracker.exercise.ExerciseCategory;
import com.gd.exercisetracker.exercise.ExerciseRepository;
import com.gd.exercisetracker.exercise.ExerciseType;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

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
        addWarmups();
        addFirstPair();
        addSecondPair();
        addThirdPair();
        addCoreTriplet();
    }

    private void addCoreTriplet() {
        Exercise ringAbRollouts = new Exercise();

        ringAbRollouts.setKey("ring-ab-rollouts");
        ringAbRollouts.setName("Ring Ab Rollouts");
        ringAbRollouts.setCategory(ExerciseCategory.CORE_TRIPLET);
        ringAbRollouts.setType(ExerciseType.ANTI_EXTENSION);
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
        assistedKneeCoppenhagenPlank.setCategory(ExerciseCategory.CORE_TRIPLET);
        assistedKneeCoppenhagenPlank.setType(ExerciseType.ANTI_ROTATION);
        assistedKneeCoppenhagenPlank.setTargetSets(3);
        assistedKneeCoppenhagenPlank.setTargetRepsMin(8);
        assistedKneeCoppenhagenPlank.setTargetRepsMax(12);
        assistedKneeCoppenhagenPlank.setDuration(false);
        assistedKneeCoppenhagenPlank.setTargetRest(60);
        assistedKneeCoppenhagenPlank.setAdditionalRest(60);
        assistedKneeCoppenhagenPlank.setMediaLink("https://i.imgur.com/6vOLzTC.jpg");
        assistedKneeCoppenhagenPlank.setComments("<ul><li>Lower leg should give the minimum assistance you need.</li><li>Don't let the hips sag.</li><li>Can be performed on your hand instead of elbow.</li></ul>");

        exerciseRepository.save(assistedKneeCoppenhagenPlank);

        Exercise bandedPallofPress = new Exercise();

        bandedPallofPress.setKey("banded-pallof-press");
        bandedPallofPress.setName("Banded Pallof Press");
        bandedPallofPress.setCategory(ExerciseCategory.CORE_TRIPLET);
        bandedPallofPress.setType(ExerciseType.ANTI_ROTATION);
        bandedPallofPress.setTargetSets(3);
        bandedPallofPress.setTargetRepsMin(8);
        bandedPallofPress.setTargetRepsMax(12);
        bandedPallofPress.setDuration(false);
        bandedPallofPress.setTargetRest(60);
        bandedPallofPress.setAdditionalRest(60);
        bandedPallofPress.setMediaLink("https://www.youtube.com/watch?v=AH_QZLm_0-s");
        bandedPallofPress.setComments(buildComments(List.of(
                "These are performed under control with a short pause when your arms are fully extended"
        )));

        exerciseRepository.save(bandedPallofPress);

        Exercise reverseHyperExtension = new Exercise();

        reverseHyperExtension.setKey("reverse-hyperextension");
        reverseHyperExtension.setName("Reverse Hyperextension");
        reverseHyperExtension.setCategory(ExerciseCategory.CORE_TRIPLET);
        reverseHyperExtension.setType(ExerciseType.EXTENSION);
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

    private void addThirdPair() {
        Exercise inclineRows = new Exercise();

        inclineRows.setKey("incline-rows");
        inclineRows.setName("Incline Rows");
        inclineRows.setCategory(ExerciseCategory.THIRD_PAIR);
        inclineRows.setType(ExerciseType.ROW);
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
        fullPushUp.setCategory(ExerciseCategory.THIRD_PAIR);
        fullPushUp.setType(ExerciseType.PUSH_UP);
        fullPushUp.setTargetSets(3);
        fullPushUp.setTargetRepsMin(5);
        fullPushUp.setTargetRepsMax(8);
        fullPushUp.setDuration(false);
        fullPushUp.setTargetRest(90);
        fullPushUp.setAdditionalRest(90);
        fullPushUp.setMediaLink("https://www.youtube.com/watch?v=IODxDxX7oi4");
        fullPushUp.setComments("<ul><li>Body in a straight line from head to toe: don't let the hips sag!</li><li>Lock out arms and protract the shoulderblades (<a href=\"https://reddit.com/r/bodyweightfitness/wiki/kb/positioning\" rel=\"nofollow\">what does that even mean?</a>) at the top</li><li>Go down until chest nearly touches the ground</li><li>Keep the elbows in, don't let them flare out</li><li>Don't shrug up your shoulders to your ears, focus on depressing the shoulderblades (<a href=\"https://reddit.com/r/bodyweightfitness/wiki/kb/positioning\" rel=\"nofollow\">what does that even mean?</a>).</li></ul>");

        exerciseRepository.save(fullPushUp);

        Exercise diamondPushup = new Exercise();

        diamondPushup.setKey("diamond-pushup");
        diamondPushup.setName("Diamond Pushup");
        diamondPushup.setCategory(ExerciseCategory.THIRD_PAIR);
        diamondPushup.setType(ExerciseType.PUSH_UP);
        diamondPushup.setTargetSets(3);
        diamondPushup.setTargetRepsMin(5);
        diamondPushup.setTargetRepsMax(8);
        diamondPushup.setDuration(false);
        diamondPushup.setTargetRest(90);
        diamondPushup.setAdditionalRest(90);
        diamondPushup.setMediaLink("https://www.youtube.com/watch?v=J0DnG1_S92I");
        diamondPushup.setComments(buildComments(List.of(
                "Put your hands close together so the thumbs and index fingers touch, then perform a pushup",
                "If this is too difficult or feels uncomfortable, put your hands just a bit closer than in a normal pushup. Work on moving the hands closer together over time until you reach diamond pushups"
        )));

        exerciseRepository.save(diamondPushup);
    }

    private void addSecondPair() {
        Exercise parallelBarSupportHold = new Exercise();

        parallelBarSupportHold.setKey("parallel-bar-support-hold");
        parallelBarSupportHold.setName("Parallel Bar Support Hold");
        parallelBarSupportHold.setCategory(ExerciseCategory.SECOND_PAIR);
        parallelBarSupportHold.setType(ExerciseType.DIP);
        parallelBarSupportHold.setTargetSets(3);
        parallelBarSupportHold.setTargetRepsMin(60);
        parallelBarSupportHold.setTargetRepsMax(60);
        parallelBarSupportHold.setDuration(true);
        parallelBarSupportHold.setTargetRest(90);
        parallelBarSupportHold.setAdditionalRest(90);
        parallelBarSupportHold.setMediaLink("https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg");
        parallelBarSupportHold.setComments("<ul><li>Work up to 3 sets of 1 minute holds for this progression</li><li>If you can't hold yourself up at all, consider using bands or your feet to assist you until you gain the necessary strength.</li></ul>");

        exerciseRepository.save(parallelBarSupportHold);

        Exercise negativeDips = new Exercise();

        negativeDips.setKey("negative-dips");
        negativeDips.setName("Negative Dips");
        negativeDips.setCategory(ExerciseCategory.SECOND_PAIR);
        negativeDips.setType(ExerciseType.DIP);
        negativeDips.setTargetSets(3);
        negativeDips.setTargetRepsMin(5);
        negativeDips.setTargetRepsMax(8);
        negativeDips.setDuration(false);
        negativeDips.setTargetRest(90);
        negativeDips.setAdditionalRest(90);
        negativeDips.setMediaLink("https://www.youtube.com/watch?v=T3Scqw1BbCc");

        String comments = buildComments(List.of(
                "This exercise is only the descent. To get to the starting position you can jump or use a box or anything",
                "Lower yourself with control. Work up to 10 sec descents"
        ));

        negativeDips.setComments(comments);

        exerciseRepository.save(negativeDips);

        Exercise negativeHamstringSlide = new Exercise();

        negativeHamstringSlide.setKey("negative-hamstring-slide");
        negativeHamstringSlide.setName("Negative Hamstring Slide");
        negativeHamstringSlide.setCategory(ExerciseCategory.SECOND_PAIR);
        negativeHamstringSlide.setType(ExerciseType.HINGE);
        negativeHamstringSlide.setTargetSets(3);
        negativeHamstringSlide.setTargetRepsMin(5);
        negativeHamstringSlide.setTargetRepsMax(8);
        negativeHamstringSlide.setDuration(false);
        negativeHamstringSlide.setTargetRest(90);
        negativeHamstringSlide.setAdditionalRest(90);
        negativeHamstringSlide.setMediaLink("https://www.youtube.com/watch?v=OY8Jci5KJdM");
        negativeHamstringSlide.setComments("<ul><li>Start in the top position of a glute bridge, slide legs out under control until your butt touches the ground/knees are extended.</li><li>Return to starting position and repeat for desired reps.</li></ul>");

        exerciseRepository.save(negativeHamstringSlide);

        Exercise hamstringSlide = new Exercise();

        hamstringSlide.setKey("hamstring-slide");
        hamstringSlide.setName("Hamstring Slide");
        hamstringSlide.setCategory(ExerciseCategory.SECOND_PAIR);
        hamstringSlide.setType(ExerciseType.HINGE);
        hamstringSlide.setTargetSets(3);
        hamstringSlide.setTargetRepsMin(5);
        hamstringSlide.setTargetRepsMax(8);
        hamstringSlide.setDuration(false);
        hamstringSlide.setTargetRest(90);
        hamstringSlide.setAdditionalRest(90);
        hamstringSlide.setMediaLink("https://www.youtube.com/watch?v=Dlazt593cuA");
        hamstringSlide.setComments(buildComments(List.of(
                "This exercise can bridge the gap between SLDL and Nordic Curls",
                "You will need a towel, socks, sliders, carpet etc. material which allows you to perform this movement smoothly",
                "Keep PPT/Neutral Pelvis. Hands supporting at sides for support as needed",
                "Ascend by squeezing glutes, pulling your ankles to your glutes, contracting your hamstrings",
                "Descend by sliding ankles out under control",
                "As before, but pull ankles back to glutes after eccentric movement, contracting the hamstrings and glutes"
        )));

        exerciseRepository.save(hamstringSlide);
    }

    private void addFirstPair() {
        Exercise archHangs = new Exercise();

        archHangs.setKey("arch-hangs");
        archHangs.setName("Arch Hangs");
        archHangs.setCategory(ExerciseCategory.FIRST_PAIR);
        archHangs.setType(ExerciseType.PULL_UP);
        archHangs.setTargetSets(3);
        archHangs.setTargetRepsMin(5);
        archHangs.setTargetRepsMax(8);
        archHangs.setDuration(false);
        archHangs.setTargetRest(90);
        archHangs.setAdditionalRest(90);
        archHangs.setMediaLink("https://www.youtube.com/watch?v=C995b3KLXS4&t=7s");
        archHangs.setComments("<ul><li>Elbows should stay straight</li><li>Hold it for time/reps</li><li>Start at this <a href=\"https://www.youtube.com/watch?v=HoE-C85ZlCE\">level</a></li><li>Progress towards a 90 degree in your shoulder. Like <a href=\"https://i.ytimg.com/vi/JusddCep6PA/hqdefault.jpg\">this</a></li></ul>");

        exerciseRepository.save(archHangs);

        Exercise pullUpNegatives = new Exercise();

        pullUpNegatives.setKey("pull-up-negatives");
        pullUpNegatives.setName("Pull-up Negatives");
        pullUpNegatives.setCategory(ExerciseCategory.FIRST_PAIR);
        pullUpNegatives.setType(ExerciseType.PULL_UP);
        pullUpNegatives.setTargetSets(3);
        pullUpNegatives.setTargetRepsMin(5);
        pullUpNegatives.setTargetRepsMax(8);
        pullUpNegatives.setDuration(false);
        pullUpNegatives.setTargetRest(90);
        pullUpNegatives.setAdditionalRest(90);
        pullUpNegatives.setMediaLink("https://www.youtube.com/watch?v=EkpJkHpJXmM");

        String comments = buildComments(List.of(
                "Jump to the top of the pull-up position, then <b>slowly</b> (as slowly as you can), lower yourself until your arms are straight",
                "Build up to <b>10sec negatives!</b>"
        ));

        pullUpNegatives.setComments(comments);

        exerciseRepository.save(pullUpNegatives);

        Exercise bulgarianSplitSquats = new Exercise();

        bulgarianSplitSquats.setKey("bulgarian-split-squats");
        bulgarianSplitSquats.setName("Bulgarian Split Squat");
        bulgarianSplitSquats.setCategory(ExerciseCategory.FIRST_PAIR);
        bulgarianSplitSquats.setType(ExerciseType.SQUAT);
        bulgarianSplitSquats.setTargetSets(3);
        bulgarianSplitSquats.setTargetRepsMin(5);
        bulgarianSplitSquats.setTargetRepsMax(8);
        bulgarianSplitSquats.setDuration(false);
        bulgarianSplitSquats.setTargetRest(90);
        bulgarianSplitSquats.setAdditionalRest(90);
        bulgarianSplitSquats.setMediaLink("https://www.youtube.com/watch?v=kkdmHTASZg8&t=75s");
        bulgarianSplitSquats.setComments("<ul><li>Pretend the barbell doesn't exist.</li><li>You can progress this further by elevating both your legs</li></ul>");

        exerciseRepository.save(bulgarianSplitSquats);
    }

    private void addWarmups() {
        Exercise shoulderBand = new Exercise();

        shoulderBand.setKey("yuris-shoulder-band-warmup");
        shoulderBand.setName("Yuri's Shoulder Band Warmup");
        shoulderBand.setCategory(ExerciseCategory.WARM_UP);
        shoulderBand.setType(ExerciseType.WARM_UP);
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
        skySquat.setCategory(ExerciseCategory.WARM_UP);
        skySquat.setType(ExerciseType.WARM_UP);
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
        wristPrep.setCategory(ExerciseCategory.WARM_UP);
        wristPrep.setType(ExerciseType.WARM_UP);
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
        deadbugsBothLegs.setCategory(ExerciseCategory.WARM_UP);
        deadbugsBothLegs.setType(ExerciseType.WARM_UP);
        deadbugsBothLegs.setTargetSets(1);
        deadbugsBothLegs.setTargetRepsMin(30);
        deadbugsBothLegs.setTargetRepsMax(30);
        deadbugsBothLegs.setDuration(true);
        deadbugsBothLegs.setTargetRest(0);
        deadbugsBothLegs.setAdditionalRest(0);
        deadbugsBothLegs.setMediaLink("https://www.youtube.com/watch?v=HFv2WwgeVMk");
        deadbugsBothLegs.setComments(null);

        exerciseRepository.save(deadbugsBothLegs);

        addAdditionalWarmups();
    }

    private void addAdditionalWarmups() {
        Exercise archHangsWarmup = new Exercise();

        archHangsWarmup.setKey("arch-hangs-warmup");
        archHangsWarmup.setName("Arch Hangs (Warmup)");
        archHangsWarmup.setCategory(ExerciseCategory.WARM_UP);
        archHangsWarmup.setType(ExerciseType.WARM_UP);
        archHangsWarmup.setTargetSets(1);
        archHangsWarmup.setTargetRepsMin(10);
        archHangsWarmup.setTargetRepsMax(10);
        archHangsWarmup.setDuration(false);
        archHangsWarmup.setTargetRest(0);
        archHangsWarmup.setAdditionalRest(0);
        archHangsWarmup.setMediaLink("https://www.youtube.com/watch?v=C995b3KLXS4&t=7s");
        archHangsWarmup.setComments(buildComments(List.of(
                "Add these after you reach Negative Pullups",
                "Beginner attempts will look more like <a href=\"https://www.youtube.com/watch?v=HoE-C85ZlCE\">this</a>"))
        );

        exerciseRepository.save(archHangsWarmup);

        Exercise supportHoldWarmup = new Exercise();

        supportHoldWarmup.setKey("support-hold-warmup");
        supportHoldWarmup.setName("Parallel Bar Support Hold (Warmup)");
        supportHoldWarmup.setCategory(ExerciseCategory.WARM_UP);
        supportHoldWarmup.setType(ExerciseType.WARM_UP);
        supportHoldWarmup.setTargetSets(1);
        supportHoldWarmup.setTargetRepsMin(30);
        supportHoldWarmup.setTargetRepsMax(30);
        supportHoldWarmup.setDuration(true);
        supportHoldWarmup.setTargetRest(0);
        supportHoldWarmup.setAdditionalRest(0);
        supportHoldWarmup.setMediaLink("https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg");
        supportHoldWarmup.setComments(buildComments(List.of(
                "Arms straight",
                "Body straight or slightly hollow",
                "Depress the shoulderblades (<a href='https://www.reddit.com/r/bodyweightfitness/wiki/kb/positioning'>what does that even mean?</a>)",
                "The stability of the PB allows you to build some strength and perfect your form. Have a minimum 60sec hold before moving on to the rings"
        )));

        exerciseRepository.save(supportHoldWarmup);

        Exercise squatWarmup = new Exercise();

        squatWarmup.setKey("squat-warmup");
        squatWarmup.setName("Squat (Warmup)");
        squatWarmup.setCategory(ExerciseCategory.WARM_UP);
        squatWarmup.setType(ExerciseType.WARM_UP);
        squatWarmup.setTargetSets(1);
        squatWarmup.setTargetRepsMin(10);
        squatWarmup.setTargetRepsMax(10);
        squatWarmup.setDuration(false);
        squatWarmup.setTargetRest(0);
        squatWarmup.setAdditionalRest(0);
        squatWarmup.setMediaLink("https://www.youtube.com/watch?v=zJBLDJMJiDE");
        squatWarmup.setComments(buildComments(List.of(
                "Stand up straight at the top",
                "Go as low as you can, preferably until the hips are below the knees",
                "Dig your big toe and heel into the ground",
                "Keep your knee in-line with your toes",
                "Don't let the knees come inward on either the descend or the ascend; think about pushing the knees out"
        )));

        exerciseRepository.save(squatWarmup);
    }

    private String buildComments(List<String> lines) {
        StringBuilder comments = new StringBuilder("<ul>");

        for (String line : lines) {
            comments.append("<li>").append(line).append("</li>");
        }

        comments.append("</ul>");

        return comments.toString();
    }
}
