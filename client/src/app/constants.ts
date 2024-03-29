import { Exercise } from "./types";

const warmUps: Exercise[] = [
  {
    id: 1,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    name: "Yuri's Shoulder Band Warmup",
    thumbLink: "https://www.youtube.com/watch?v=Vwn5hSf3WEg",
    comments: "Can also be done with a tee-shirt",
  },
  {
    id: 2,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 5,
    targetRepsMax: 10,
    name: "Squat Sky Reaches",
    thumbLink: "https://www.youtube.com/watch?v=lbozu0DPcYI&t=42s",
  },
  {
    id: 3,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 10,
    targetRepsMax: Infinity,
    name: "GMB Wrist Prep",
    thumbLink: "https://www.youtube.com/watch?v=mSZWSQSSEjE",
    comments: "Do as many reps as you want",
  },
  {
    id: 4,
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 30,
    targetRepsMax: 30,
    isDuration: true,
    name: "Deadbugs (Alternating)",
    thumbLink: "https://www.youtube.com/watch?v=HFv2WwgeVMk",
  },
];

const firstPair: Exercise[] = [
  {
    id: 5,
    category: "firstPair",
    type: "pullUp",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    name: "Arch Hangs",
    thumbLink: "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s",
    comments: `
        - Elbows should stay straight
        - Hold it for time/reps
        - Start at this level https://www.youtube.com/watch?v=HoE-C85ZlCE
        - Progress towards a 90 degree in your shoulder. Like this https://i.ytimg.com/vi/JusddCep6PA/hqdefault.jpg
    `,
  },
  {
    id: 6,
    category: "firstPair",
    type: "squat",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    name: "Bulgarian Split Squat",
    thumbLink: "https://www.youtube.com/watch?v=kkdmHTASZg8&t=75s",
    comments: `
        - Pretend the barbell doesn't exist.
        - You can progress this further by elevating both your legs
    `,
  },
];

const secondPair: Exercise[] = [
  {
    id: 7,
    category: "secondPair",
    type: "dip",
    targetSets: 3,
    targetRepsMin: 30,
    targetRepsMax: 30,
    name: "Parallel Bar Support Hold",
    thumbLink:
      "https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg",
    comments: `
        - Work up to 3 sets of 1 minute holds for this progression
        - If you can't hold yourself up at all, consider using bands or your feet to assist you until you gain the necessary strength.
    `,
  },
  {
    id: 8,
    category: "secondPair",
    type: "hinge",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    name: "Negative Hamstring Slide",
    thumbLink: "https://www.youtube.com/watch?v=OY8Jci5KJdM",
    comments: `
        - Start in the top position of a glute bridge, slide legs out under control until your butt touches the ground/knees are extended.
        - Return to starting position and repeat for desired reps.
    `,
  },
];

const thirdPair: Exercise[] = [
  {
    id: 9,
    category: "thirdPair",
    type: "row",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    name: "Incline Rows",
    thumbLink: "https://www.youtube.com/watch?v=LR2EnFWpVao",
    comments: `Perform a row, but with the body position somewhere between vertical and horizontal. Go closer to horizontal to make it harder.`,
  },
  {
    id: 10,
    category: "thirdPair",
    type: "pushUp",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    name: "Full Pushup",
    thumbLink: "https://www.youtube.com/watch?v=IODxDxX7oi4",
    comments: `
        - Body in a straight line from head to toe: don't let the hips sag!
        - Lock out arms and protract the shoulderblades (https://www.reddit.com/r/bodyweightfitness/wiki/kb/positioning/) at the top
        - Go down until chest nearly touches the ground
        - Keep the elbows in, don't let them flare out
        - Don't shrug up your shoulders to your ears, focus on depressing the shoulderblades (https://www.reddit.com/r/bodyweightfitness/wiki/kb/positioning).
    `,
  },
];

const coreTriplet: Exercise[] = [
  {
    id: 11,
    category: "coreTriplet",
    type: "antiExtension",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 12,
    name: "Ring Ab Rollouts",
    thumbLink: "https://www.youtube.com/watch?v=LBUfnmugKLw",
    comments: `
        - Elbows should stay straight
        - Remain in a hollow body position (ribs down, butt tucked)
        - Keep your hands as close as your overhead mobility will allow.
        - Higher ring position will make this easier. Elevating the feet will make it harder.
    `,
  },
  {
    id: 12,
    category: "coreTriplet",
    type: "antiRotation",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 12,
    name: "Assisted Knee Copenhagen Plank",
    thumbLink: "https://i.imgur.com/6vOLzTC.jpg",
    comments: `
        - Lower leg should give the minimum assistance you need.
        - Don't let the hips sag.
        - Can be performed on your hand instead of elbow.
    `,
  },
  {
    id: 13,
    category: "coreTriplet",
    type: "extension",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 12,
    name: "Reverse Hyperextension",
    thumbLink: "https://www.youtube.com/watch?v=ZeRsNzFcQLQ&",
    comments: `Keep your butt tucked`,
  },
];

export const exercises: Exercise[] = [
  ...warmUps,
  ...firstPair,
  ...secondPair,
  ...thirdPair,
  ...coreTriplet,
];
