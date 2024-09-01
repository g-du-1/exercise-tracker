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
  key: string;
  name: string;
  type: ExerciseType;
  category: ExerciseCategory;
  comments: string | null;
  mediaLink: string;
  targetSets: number;
  targetRepsMin: number;
  targetRepsMax: number | null;
  isDuration: boolean;
  targetRest: number;
  additionalRest: number;
};

export type SavedReps = {
  name: string;
  reps: number[];
};

export enum Role {
  ROLE_ADMIN,
  ROLE_USER,
}

export type User = {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  roles: Role[];
};
