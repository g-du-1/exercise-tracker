type ExerciseCategory =
  | "warmup"
  | "firstPair"
  | "secondPair"
  | "thirdPair"
  | "coreTriplet";

type ExerciseType =
  | "warmup"
  | "pullUp"
  | "squat"
  | "dip"
  | "hinge"
  | "row"
  | "pushUp"
  | "antiExtension"
  | "antiRotation"
  | "extension";

export type Exercise = {
  id: number;
  name: string;
  type: ExerciseType;
  category: ExerciseCategory;
  comments?: string;
  thumbLink?: string;
  targetSets: number;
  targetRepsMin?: number;
  targetRepsMax?: number;
  isDuration?: boolean;
  targetRest: number;
};
