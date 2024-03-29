import { ExerciseTracker } from "./components/ExerciseTracker";
import { exercises } from "./constants";

export default function Home() {
  return (
    <>
      <h1>Exercise Tracker</h1>

      <ExerciseTracker exercises={exercises} />
    </>
  );
}
