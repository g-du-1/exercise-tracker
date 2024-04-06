import { Exercise } from "./types";

const warmUps: Exercise[] = [
  {
    key: "yuris-shoulder-band-warmup",
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    targetRest: 0,
    additionalRest: 0,
    name: "Yuri's Shoulder Band Warmup",
    mediaLink: "https://www.youtube.com/watch?v=6y_AU-aGhVE",
    comments: `
      <ul>
        <li>Can also be done with a tee-shirt</li>
      </ul>
    `,
  },
  {
    key: "squat-sky-reaches",
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    targetRest: 0,
    additionalRest: 0,
    name: "Squat Sky Reaches",
    mediaLink: "https://www.youtube.com/watch?v=lbozu0DPcYI&t=42s",
  },
  {
    key: "gmb-wrist-prep",
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 10,
    targetRest: 0,
    additionalRest: 0,
    name: "GMB Wrist Prep",
    mediaLink: "https://www.youtube.com/watch?v=mSZWSQSSEjE",
    comments: `
      <ul>
        <li>Do as many reps as you want</li>
      </ul>
    `,
  },
  {
    key: "deadbugs-alternating",
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 30,
    isDuration: true,
    targetRest: 0,
    additionalRest: 0,
    name: "Deadbugs (Alternating)",
    mediaLink: "https://www.youtube.com/watch?v=HFv2WwgeVMk",
  },
];

const firstPair: Exercise[] = [
  {
    key: "arch-hangs",
    category: "firstPair",
    type: "pullUp",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    targetRest: 90,
    additionalRest: 90,
    name: "Arch Hangs",
    mediaLink: "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s",
    comments: `
      <ul>
        <li>Elbows should stay straight</li>
        <li>Hold it for time/reps</li>
        <li>Start at this <a href="https://www.youtube.com/watch?v=HoE-C85ZlCE">level</a></li>
        <li>Progress towards a 90 degree in your shoulder. Like <a href="https://i.ytimg.com/vi/JusddCep6PA/hqdefault.jpg">this</a></li>
      </ul>
    `,
  },
  {
    key: "bulgarian-split-squat",
    category: "firstPair",
    type: "squat",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    targetRest: 90,
    additionalRest: 90,
    name: "Bulgarian Split Squat",
    mediaLink: "https://www.youtube.com/watch?v=kkdmHTASZg8&t=75s",
    comments: `
      <ul>
        <li>Pretend the barbell doesn't exist.</li>
        <li>You can progress this further by elevating both your legs</li>
      </ul>
    `,
  },
];

const secondPair: Exercise[] = [
  {
    key: "parallel-bar-support-hold",
    category: "secondPair",
    type: "dip",
    targetSets: 3,
    targetRepsMin: 60,
    targetRest: 90,
    additionalRest: 90,
    isDuration: true,
    name: "Parallel Bar Support Hold",
    mediaLink:
      "https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg",
    comments: `
      <ul>
        <li>Work up to 3 sets of 1 minute holds for this progression</li>
        <li>If you can't hold yourself up at all, consider using bands or your feet to assist you until you gain the necessary strength.</li>
      </ul>
    `,
  },
  {
    key: "negative-hamstring-slide",
    category: "secondPair",
    type: "hinge",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    targetRest: 90,
    additionalRest: 90,
    name: "Negative Hamstring Slide",
    mediaLink: "https://www.youtube.com/watch?v=OY8Jci5KJdM",
    comments: `
      <ul>
        <li>Start in the top position of a glute bridge, slide legs out under control until your butt touches the ground/knees are extended.</li>
        <li>Return to starting position and repeat for desired reps.</li>
      </ul>
    `,
  },
];

const thirdPair: Exercise[] = [
  {
    key: "incline-rows",
    category: "thirdPair",
    type: "row",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    targetRest: 90,
    additionalRest: 90,
    name: "Incline Rows",
    mediaLink: "https://www.youtube.com/watch?v=LR2EnFWpVao",
    comments: `
      <ul>
        <li>Perform a row, but with the body position somewhere between vertical and horizontal. Go closer to horizontal to make it harder.</li>
      </ul>
    `,
  },
  {
    key: "full-pushup",
    category: "thirdPair",
    type: "pushUp",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    targetRest: 90,
    additionalRest: 90,
    name: "Full Pushup",
    mediaLink: "https://www.youtube.com/watch?v=IODxDxX7oi4",
    comments: `
      <ul>
        <li>Body in a straight line from head to toe: don't let the hips sag!</li>
        <li>Lock out arms and protract the shoulderblades (<a href="https://reddit.com/r/bodyweightfitness/wiki/kb/positioning" rel="nofollow">what does that even mean?</a>) at the top</li>
        <li>Go down until chest nearly touches the ground</li>
        <li>Keep the elbows in, don't let them flare out</li>
        <li>Don't shrug up your shoulders to your ears, focus on depressing the shoulderblades (<a href="https://reddit.com/r/bodyweightfitness/wiki/kb/positioning" rel="nofollow">what does that even mean?</a>).</li>
      </ul>
    `,
  },
];

const coreTriplet: Exercise[] = [
  {
    key: "ring-ab-rollouts",
    category: "coreTriplet",
    type: "antiExtension",
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    targetRest: 60,
    additionalRest: 60,
    name: "Ring Ab Rollouts",
    mediaLink: "https://www.youtube.com/watch?v=LBUfnmugKLw",
    comments: `
      <ul>
        <li>Elbows should stay straight</li>
        <li>Remain in a hollow body position (ribs down, butt tucked)</li>
        <li>Keep your hands as close as your overhead mobility will allow.</li>
        <li>Higher ring position will make this easier. Elevating the feet will make it harder.</li>
      </ul>
    `,
  },
  {
    key: "assisted-knee-copenhagen-plank",
    category: "coreTriplet",
    type: "antiRotation",
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    targetRest: 60,
    additionalRest: 60,
    name: "Assisted Knee Copenhagen Plank",
    mediaLink: "https://i.imgur.com/6vOLzTC.jpg",
    comments: `
      <ul>
        <li>Lower leg should give the minimum assistance you need.</li>
        <li>Don't let the hips sag.</li>
        <li>Can be performed on your hand instead of elbow.</li>
      </ul>
    `,
  },
  {
    key: "reverse-hyperextension",
    category: "coreTriplet",
    type: "extension",
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    targetRest: 60,
    additionalRest: 60,
    name: "Reverse Hyperextension",
    mediaLink: "https://www.youtube.com/watch?v=ZeRsNzFcQLQ&",
    comments: `
      <ul>
        <li>Keep your butt tucked</li>
      </ul>
    `,
  },
];

export const exercises: Exercise[] = [
  ...warmUps,
  ...firstPair,
  ...secondPair,
  ...thirdPair,
  ...coreTriplet,
];
