import { Exercise } from "../types";

export const ExerciseTracker = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>{exercise.name}</div>
      ))}
    </div>
  );
};
