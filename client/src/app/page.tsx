import { ExerciseTracker } from "./components/ExerciseTracker";
import { Exercise } from "./types";

export default function Home() {
  const exercises: Exercise[] = [
    { id: 1, name: "Exercise 1" },
    { id: 2, name: "Exercise 2" },
  ];

  return (
    <>
      <h1>Exercise Tracker</h1>

      <ExerciseTracker exercises={exercises} />
    </>
  );
}
