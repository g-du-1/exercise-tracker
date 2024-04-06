import { Exercise } from "../../types";

export const mockExercises: Exercise[] = [
  {
    key: "gmb-wrist-prep",
    name: "GMB Wrist Prep",
    category: "warmup",
    type: "warmup",
    targetSets: 1,
    targetRepsMin: 10,
    targetRepsMax: null,
    isDuration: false,
    targetRest: 0,
    additionalRest: 0,
    mediaLink: "https://www.youtube.com/watch?v=mSZWSQSSEjE",
    comments: "<ul><li>Do as many reps as you want</li></ul>",
  },
  {
    key: "arch-hangs",
    name: "Arch Hangs",
    category: "firstPair",
    type: "pullUp",
    targetSets: 3,
    targetRepsMin: 5,
    targetRepsMax: 8,
    isDuration: false,
    targetRest: 90,
    additionalRest: 90,
    mediaLink: "https://www.youtube.com/watch?v=C995b3KLXS4&t=7s",
    comments:
      '<ul><li>Elbows should stay straight</li><li>Hold it for time/reps</li><li>Start at this <a href="https://www.youtube.com/watch?v=HoE-C85ZlCE">level</a></li><li>Progress towards a 90 degree in your shoulder. Like <a href="https://i.ytimg.com/vi/JusddCep6PA/hqdefault.jpg">this</a></li></ul>',
  },
  {
    key: "parallel-bar-support-hold",
    name: "Parallel Bar Support Hold",
    category: "secondPair",
    type: "dip",
    targetSets: 3,
    targetRepsMin: 60,
    targetRepsMax: 60,
    isDuration: true,
    targetRest: 90,
    additionalRest: 90,
    mediaLink:
      "https://antranik.org/wp-content/uploads/2014/01/antranik-holding-support-hold-on-parallel-bars.jpg",
    comments:
      "<ul><li>Work up to 3 sets of 1 minute holds for this progression</li><li>If you can't hold yourself up at all, consider using bands or your feet to assist you until you gain the necessary strength.</li></ul>",
  },
];
